import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const MAX_BYTES = 5 * 1024 * 1024;
const TYPES: Record<string, string[]> = {
  pdf: ['application/pdf'],
  doc: ['application/msword'],
  docx: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const json = (b: unknown, status = 200) =>
    new Response(JSON.stringify(b), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  try {
    const form = await req.formData();
    const file = form.get('file');
    if (!(file instanceof File)) return json({ error: 'Please attach a file.' }, 400);
    if (file.size === 0 || file.size > MAX_BYTES) return json({ error: 'File must be under 5MB.' }, 400);
    const ext = (file.name.split('.').pop() || '').toLowerCase();
    if (!TYPES[ext]) return json({ error: 'Only PDF, DOC or DOCX files are allowed.' }, 400);
    const type = TYPES[ext].includes(file.type) ? file.type : TYPES[ext][0];

    const name = `${Date.now()}_${crypto.randomUUID().replace(/-/g, '').slice(0, 16)}.${ext}`;
    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    const { error } = await supabase.storage.from('career-cvs').upload(name, file, { contentType: type, upsert: false });
    if (error) {
      console.error('cv upload failed', error);
      return json({ error: 'Upload failed. Please try again.' }, 500);
    }
    return json({ path: name });
  } catch (e) {
    console.error('upload-career-cv error', e);
    return json({ error: 'Upload failed. Please try again.' }, 500);
  }
});
