import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/resend';
const FROM = 'Simplify Business Consultancy <info@simplifybusinessconsultancy.com>';
const SITE = 'https://www.simplifybusinessconsultancy.com';
const LOGO = `${SITE}/logo.png`;

const NAVY = '#1e3350';
const AMBER = '#efa62a';
const CREAM = '#f8f6f1';
const TEXT = '#1c212b';

const escapeHtml = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function buildHtml(firstName: string | null, pkg: string | null) {
  const greeting = firstName ? `Hi ${escapeHtml(firstName)},` : 'Hi there,';
  const pkgLine = pkg
    ? `<p style="margin:0 0 16px;font-size:16px;line-height:26px;color:${TEXT};">We see that you're interested in our <strong>${escapeHtml(pkg)}</strong> package. We'll discuss the package and how it may fit your business when we reach out.</p>`
    : '';
  return `<!doctype html><html><body style="margin:0;padding:0;background:#ffffff;font-family:Helvetica,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;">Thanks for reaching out to Simplify Business Consultancy.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${CREAM};border-radius:12px;overflow:hidden;border:1px solid #e5e1d8;">
        <tr><td align="center" style="background:${CREAM};padding:36px 24px;border-bottom:4px solid ${AMBER};">
          <img src="${LOGO}" alt="Simplify Business Consultancy" width="220" style="display:block;border:0;max-width:220px;height:auto;" />
        </td></tr>
        <tr><td style="padding:32px 28px;">
          <h1 style="margin:0 0 16px;font-size:24px;line-height:32px;color:${NAVY};">Thanks for getting in touch</h1>
          <p style="margin:0 0 16px;font-size:16px;line-height:26px;color:${TEXT};">${greeting}</p>
          <p style="margin:0 0 16px;font-size:16px;line-height:26px;color:${TEXT};">Thank you for contacting Simplify Business Consultancy. We received your message, and one of our consultants will get back to you shortly.</p>
          ${pkgLine}
          <p style="margin:0 0 24px;font-size:16px;line-height:26px;color:${TEXT};">In the meantime, feel free to explore how we help businesses save time, improve their processes, and work more efficiently.</p>
          <a href="${SITE}" style="display:inline-block;background:${AMBER};color:${TEXT};text-decoration:none;font-weight:bold;padding:13px 26px;border-radius:8px;font-size:16px;">Visit our website</a>
          <p style="margin:28px 0 0;font-size:15px;line-height:24px;color:${TEXT};">Warm regards,<br/>The Simplify Business Consultancy Team</p>
        </td></tr>
        <tr><td style="padding:18px 28px;background:${NAVY};color:#e9e5db;font-size:12px;line-height:20px;">
          Simplify Business Consultancy &middot; info@simplifybusinessconsultancy.com
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

async function sendWithRetry(payload: Record<string, unknown>, lovableKey: string, resendKey: string) {
  let lastError = '';
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(`${GATEWAY_URL}/emails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${lovableKey}`,
          'X-Connection-Api-Key': resendKey,
        },
        body: JSON.stringify(payload),
      });
      const body = await res.text();
      if (res.ok) return { ok: true as const, attempts: attempt, body };
      lastError = `[${res.status}] ${body}`;
      console.error(`Resend attempt ${attempt} failed: ${lastError}`);
      // Permanent failures: do not retry
      if (res.status !== 429 && res.status < 500) return { ok: false as const, attempts: attempt, error: lastError };
    } catch (e) {
      lastError = String(e);
      console.error(`Resend attempt ${attempt} threw: ${lastError}`);
    }
    if (attempt < 3) await new Promise((r) => setTimeout(r, attempt * 1000));
  }
  return { ok: false as const, attempts: 3, error: lastError };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const json = (b: unknown, status = 200) =>
    new Response(JSON.stringify(b), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  try {
    const { leadId } = await req.json().catch(() => ({ leadId: null }));
    if (typeof leadId !== 'string' || !/^[0-9a-f-]{36}$/i.test(leadId)) {
      return json({ error: 'A valid leadId is required' }, 400);
    }

    const lovableKey = Deno.env.get('LOVABLE_API_KEY');
    const resendKey = Deno.env.get('RESEND_API_KEY');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: lead, error: leadError } = await supabase
      .from('customer_leads')
      .select('id, full_name, email, preferred_package, welcome_email_status')
      .eq('id', leadId)
      .maybeSingle();

    if (leadError) return json({ error: leadError.message }, 500);
    if (!lead) return json({ error: 'Lead not found' }, 404);

    // Duplicate protection: only send once per lead.
    if (lead.welcome_email_status === 'sent' || lead.welcome_email_status === 'sending') {
      return json({ skipped: true, reason: 'already_' + lead.welcome_email_status });
    }

    const { data: claimed } = await supabase
      .from('customer_leads')
      .update({ welcome_email_status: 'sending' })
      .eq('id', leadId)
      .in('welcome_email_status', ['pending', 'failed'])
      .select('id');
    if (!claimed || claimed.length === 0) return json({ skipped: true, reason: 'already_claimed' });

    if (!lovableKey || !resendKey) {
      const msg = 'Resend is not connected (missing API key)';
      await supabase.from('customer_leads').update({
        welcome_email_status: 'failed', welcome_email_error: msg,
      }).eq('id', leadId);
      return json({ error: msg }, 503);
    }

    const firstName = (lead.full_name ?? '').trim().split(/\s+/)[0] || null;
    const result = await sendWithRetry(
      {
        from: FROM,
        to: [lead.email],
        subject: firstName ? `Thanks for reaching out, ${firstName}` : 'Thanks for reaching out',
        html: buildHtml(firstName, lead.preferred_package ?? null),
      },
      lovableKey,
      resendKey,
    );

    await supabase
      .from('customer_leads')
      .update({
        welcome_email_status: result.ok ? 'sent' : 'failed',
        welcome_email_attempts: result.attempts,
        welcome_email_sent_at: result.ok ? new Date().toISOString() : null,
        welcome_email_error: result.ok ? null : result.error?.slice(0, 1000),
      })
      .eq('id', leadId);

    return result.ok ? json({ sent: true, attempts: result.attempts }) : json({ sent: false, error: result.error }, 502);
  } catch (e) {
    console.error('send-lead-welcome error', e);
    return json({ error: String(e) }, 500);
  }
});
