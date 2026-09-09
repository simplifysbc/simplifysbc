ALTER TABLE public.customer_leads
  ADD COLUMN IF NOT EXISTS booking_email_status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS booking_email_attempts integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS booking_email_sent_at timestamptz,
  ADD COLUMN IF NOT EXISTS booking_email_error text;