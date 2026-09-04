-- Roles
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin','consultant','user');
EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Booking pipeline fields
ALTER TABLE public.customer_leads
  ADD COLUMN IF NOT EXISTS pipeline_stage text NOT NULL DEFAULT 'New',
  ADD COLUMN IF NOT EXISTS booking_date date,
  ADD COLUMN IF NOT EXISTS booking_time time,
  ADD COLUMN IF NOT EXISTS consultant text,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

ALTER TABLE public.customer_leads DROP CONSTRAINT IF EXISTS customer_leads_pipeline_stage_check;
ALTER TABLE public.customer_leads
  ADD CONSTRAINT customer_leads_pipeline_stage_check
  CHECK (pipeline_stage IN ('New','Contacted','Qualified','Scheduled','Booked','Lost'));

CREATE INDEX IF NOT EXISTS idx_customer_leads_pipeline_stage ON public.customer_leads(pipeline_stage);
CREATE INDEX IF NOT EXISTS idx_customer_leads_booking_date ON public.customer_leads(booking_date);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

DROP TRIGGER IF EXISTS customer_leads_set_updated_at ON public.customer_leads;
CREATE TRIGGER customer_leads_set_updated_at BEFORE UPDATE ON public.customer_leads
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Admin/consultant access to the pipeline
GRANT SELECT, UPDATE ON public.customer_leads TO authenticated;

DROP POLICY IF EXISTS "Staff can view leads" ON public.customer_leads;
CREATE POLICY "Staff can view leads" ON public.customer_leads
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'consultant'));

DROP POLICY IF EXISTS "Staff can update leads" ON public.customer_leads;
CREATE POLICY "Staff can update leads" ON public.customer_leads
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'consultant'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'consultant'));