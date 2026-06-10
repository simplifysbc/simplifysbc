
-- Sequence for human-readable lead IDs
CREATE SEQUENCE IF NOT EXISTS public.customer_leads_seq START 1;

-- Enum for package selection
DO $$ BEGIN
  CREATE TYPE public.preferred_package_type AS ENUM ('Digital Starter', 'Growth Accelerator', 'Enterprise Pro', 'Others');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE public.lead_source_type AS ENUM ('homepage', 'contact', 'packages');
EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE public.customer_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id text UNIQUE NOT NULL DEFAULT ('SBC-C-' || lpad(nextval('public.customer_leads_seq')::text, 4, '0')),
  created_date timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  email text NOT NULL,
  whatsapp_number text,
  country text,
  preferred_package public.preferred_package_type,
  message text,
  lead_source public.lead_source_type NOT NULL DEFAULT 'contact',
  status text NOT NULL DEFAULT 'New',
  notes text
);

ALTER SEQUENCE public.customer_leads_seq OWNED BY public.customer_leads.lead_id;

-- Grants: allow public inserts (forms), restrict reads to service_role only
GRANT INSERT ON public.customer_leads TO anon, authenticated;
GRANT USAGE ON SEQUENCE public.customer_leads_seq TO anon, authenticated;
GRANT ALL ON public.customer_leads TO service_role;

ALTER TABLE public.customer_leads ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a lead via the website
CREATE POLICY "Anyone can submit a lead"
  ON public.customer_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- No public SELECT/UPDATE/DELETE policies — only service_role can manage leads
CREATE INDEX idx_customer_leads_created_date ON public.customer_leads(created_date DESC);
CREATE INDEX idx_customer_leads_status ON public.customer_leads(status);
CREATE INDEX idx_customer_leads_source ON public.customer_leads(lead_source);
