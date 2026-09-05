ALTER TABLE public.customer_leads
  ADD COLUMN IF NOT EXISTS welcome_email_status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS welcome_email_attempts integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS welcome_email_sent_at timestamptz,
  ADD COLUMN IF NOT EXISTS welcome_email_error text;

DO $$ BEGIN
  ALTER TABLE public.customer_leads
    ADD CONSTRAINT customer_leads_welcome_email_status_check
    CHECK (welcome_email_status IN ('pending','sending','sent','failed'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

GRANT ALL ON public.customer_leads TO service_role;