
-- Add new columns
ALTER TABLE public.customer_leads
  ADD COLUMN IF NOT EXISTS city text,
  ADD COLUMN IF NOT EXISTS internal_notes text;

-- Convert lead_source from enum to text with CHECK
ALTER TABLE public.customer_leads
  ALTER COLUMN lead_source DROP DEFAULT;

ALTER TABLE public.customer_leads
  ALTER COLUMN lead_source TYPE text USING (
    CASE lead_source::text
      WHEN 'homepage' THEN 'Homepage'
      WHEN 'contact' THEN 'Contact Page'
      WHEN 'packages' THEN 'Packages Page'
      ELSE 'Homepage'
    END
  );

ALTER TABLE public.customer_leads
  ALTER COLUMN lead_source SET DEFAULT 'Homepage';

ALTER TABLE public.customer_leads
  ADD CONSTRAINT customer_leads_lead_source_check
  CHECK (lead_source IN ('Homepage','Contact Page','Packages Page','WhatsApp Campaign','Social Media'));

-- Convert preferred_package from enum to text (keep same allowed values + Others)
ALTER TABLE public.customer_leads
  ALTER COLUMN preferred_package TYPE text USING preferred_package::text;

ALTER TABLE public.customer_leads
  ADD CONSTRAINT customer_leads_preferred_package_check
  CHECK (preferred_package IS NULL OR preferred_package IN ('Digital Starter','Growth Accelerator','Enterprise Pro','Others'));

-- Update status default and add CHECK
ALTER TABLE public.customer_leads
  ALTER COLUMN status SET DEFAULT 'New Inquiry';

UPDATE public.customer_leads SET status = 'New Inquiry' WHERE status = 'New';

ALTER TABLE public.customer_leads
  ADD CONSTRAINT customer_leads_status_check
  CHECK (status IN ('New Inquiry','Contacted','Package Shared','Follow Up','Confirmed','Payment Received','Under Process','Completed','Lost'));

-- Drop unused enums
DROP TYPE IF EXISTS public.lead_source_type;
DROP TYPE IF EXISTS public.preferred_package_type;

-- Keep notes column in sync with internal_notes (notes was the original name)
-- Just leave notes as-is; internal_notes is the new canonical field.
