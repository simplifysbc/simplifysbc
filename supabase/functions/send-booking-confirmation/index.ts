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

function formatDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function formatTime(t: string) {
  return t.slice(0, 5);
}

function buildHtml(opts: { firstName: string | null; date: string; time: string; consultant: string; pkg: string | null }) {
  const greeting = opts.firstName ? `Hi ${escapeHtml(opts.firstName)},` : 'Hi there,';
  const pkgLine = opts.pkg
    ? `<p style="margin:0 0 16px;font-size:16px;line-height:26px;color:${TEXT};">Package: <strong>${escapeHtml(opts.pkg)}</strong></p>`
    : '';
  return `<!doctype html><html><body style="margin:0;padding:0;background:#ffffff;font-family:Helvetica,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;">Your Simplify Business Consultancy session is confirmed.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${CREAM};border-radius:12px;overflow:hidden;border:1px solid #e5e1d8;">
        <tr><td align="center" style="background:${CREAM};padding:36px 24px;border-bottom:4px solid ${AMBER};">
          <img src="${LOGO}" alt="Simplify Business Consultancy" width="220" style="display:block;border:0;max-width:220px;height:auto;" />
        </td></tr>
        <tr><td style="padding:32px 28px;">
          <h1 style="margin:0 0 16px;font-size:24px;line-height:32px;color:${NAVY};">Your booking is confirmed</h1>
          <p style="margin:0 0 16px;font-size:16px;line-height:26px;color:${TEXT};">${greeting}</p>
          <p style="margin:0 0 20px;font-size:16px;line-height:26px;color:${TEXT};">Great news — your consultation with Simplify Business Consultancy is booked. Here are your details:</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e5e1d8;border-radius:8px;margin:0 0 20px;">
            <tr><td style="padding:20px 22px;">
              <p style="margin:0 0 10px;font-size:16px;line-height:24px;color:${TEXT};">Date: <strong>${escapeHtml(formatDate(opts.date))}</strong></p>
              <p style="margin:0 0 10px;font-size:16px;line-height:24px;color:${TEXT};">Time: <strong>${escapeHtml(formatTime(opts.time))}</strong></p>
              <p style="margin:0;font-size:16px;line-height:24px;color:${TEXT};">Consultant: <strong>${escapeHtml(opts.consultant)}</strong></p>
            </td></tr>
          </table>
          ${pkgLine}
          <p style="margin:0 0 24px;font-size:16px;line-height:26px;color:${TEXT};">If anything changes or you need to move your session, just reply to this email and we will take care of it.</p>
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
      .select('id, full_name, email, preferred_package, booking_date, booking_time, consultant, booking_email_status')
      .eq('id', leadId)
      .maybeSingle();

    if (leadError) return json({ error: leadError.message }, 500);
    if (!lead) return json({ error: 'Lead not found' }, 404);

    // Duplicate protection: only send once per lead.
    if (lead.booking_email_status === 'sent' || lead.booking_email_status === 'sending') {
      return json({ skipped: true, reason: 'already_' + lead.booking_email_status });
    }

    if (!lead.booking_date || !lead.booking_time || !lead.consultant) {
      return json({ skipped: true, reason: 'missing_booking_details' });
    }

    const { data: claimed } = await supabase
      .from('customer_leads')
      .update({ booking_email_status: 'sending' })
      .eq('id', leadId)
      .in('booking_email_status', ['pending', 'failed'])
      .select('id');
    if (!claimed || claimed.length === 0) return json({ skipped: true, reason: 'already_claimed' });

    if (!lovableKey || !resendKey) {
      const msg = 'Resend is not connected (missing API key)';
      await supabase.from('customer_leads').update({
        booking_email_status: 'failed', booking_email_error: msg,
      }).eq('id', leadId);
      return json({ error: msg }, 503);
    }

    const firstName = (lead.full_name ?? '').trim().split(/\s+/)[0] || null;
    const dateLabel = formatDate(lead.booking_date);
    const timeLabel = formatTime(lead.booking_time);
    const result = await sendWithRetry(
      {
        from: FROM,
        to: [lead.email],
        subject: `Your consultation is confirmed for ${dateLabel} at ${timeLabel}`,
        html: buildHtml({
          firstName,
          date: lead.booking_date,
          time: lead.booking_time,
          consultant: lead.consultant,
          pkg: lead.preferred_package ?? null,
        }),
      },
      lovableKey,
      resendKey,
    );

    await supabase
      .from('customer_leads')
      .update({
        booking_email_status: result.ok ? 'sent' : 'failed',
        booking_email_attempts: result.attempts,
        booking_email_sent_at: result.ok ? new Date().toISOString() : null,
        booking_email_error: result.ok ? null : result.error?.slice(0, 1000),
      })
      .eq('id', leadId);

    return result.ok ? json({ sent: true, attempts: result.attempts }) : json({ sent: false, error: result.error }, 502);
  } catch (e) {
    console.error('send-booking-confirmation error', e);
    return json({ error: String(e) }, 500);
  }
});
