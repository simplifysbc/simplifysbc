ALTER TABLE public.customer_leads ADD COLUMN IF NOT EXISTS email_token text;
COMMENT ON COLUMN public.customer_leads.email_token IS 'One-time secret created by the submitting browser; lets only that visitor trigger the automatic emails shortly after submitting.';

DROP POLICY IF EXISTS "Validated lead submissions" ON public.customer_leads;
CREATE POLICY "Validated lead submissions" ON public.customer_leads FOR INSERT TO anon, authenticated
WITH CHECK (
  length(btrim(full_name)) BETWEEN 1 AND 200
  AND length(email) <= 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (message IS NULL OR length(message) <= 5000)
  AND pipeline_stage = ANY (ARRAY['New','Booked'])
  AND internal_notes IS NULL
  AND welcome_email_status = 'pending' AND welcome_email_attempts = 0 AND welcome_email_sent_at IS NULL
  AND booking_email_status = 'pending' AND booking_email_attempts = 0 AND booking_email_sent_at IS NULL
  AND (email_token IS NULL OR length(email_token) BETWEEN 32 AND 128)
);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
 RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$
  SELECT _user_id IS NOT NULL AND _user_id = auth.uid()
    AND EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

DROP POLICY IF EXISTS "Validated resume uploads to career-cvs" ON storage.objects;