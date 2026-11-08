ALTER TABLE public.customer_leads ADD COLUMN consultant_id uuid REFERENCES public.consultants(id);
UPDATE public.customer_leads l SET consultant_id = c.id FROM public.consultants c WHERE l.consultant IN (c.name, c.role, c.slug);
CREATE UNIQUE INDEX customer_leads_consultant_slot_unique ON public.customer_leads (consultant_id, booking_date, booking_time) WHERE pipeline_stage IN ('Scheduled', 'Booked') AND consultant_id IS NOT NULL AND booking_date IS NOT NULL AND booking_time IS NOT NULL;
CREATE OR REPLACE FUNCTION public.resolve_booking_consultant() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE selected_id uuid; selected_name text;
BEGIN
  IF TG_OP = 'UPDATE' THEN
    IF NEW.consultant IS DISTINCT FROM OLD.consultant THEN NEW.consultant_id := NULL; END IF;
  END IF;
  IF NEW.consultant = 'Any available consultant' AND NEW.pipeline_stage IN ('Scheduled', 'Booked') AND NEW.booking_date IS NOT NULL AND NEW.booking_time IS NOT NULL THEN
    SELECT c.id, c.name INTO selected_id, selected_name FROM public.consultants c WHERE c.active AND NOT EXISTS (SELECT 1 FROM public.customer_leads l WHERE l.consultant_id = c.id AND l.booking_date = NEW.booking_date AND l.booking_time = NEW.booking_time AND l.pipeline_stage IN ('Scheduled','Booked') AND l.id <> NEW.id) ORDER BY c.sort_order, c.name LIMIT 1;
    IF selected_id IS NULL THEN RAISE EXCEPTION 'This consultant time slot is already booked' USING ERRCODE = '23505'; END IF;
    NEW.consultant_id := selected_id; NEW.consultant := selected_name;
  ELSIF NEW.consultant_id IS NULL AND NEW.consultant IS NOT NULL THEN
    SELECT c.id INTO selected_id FROM public.consultants c WHERE NEW.consultant IN (c.name,c.role,c.slug) ORDER BY c.name LIMIT 1;
    NEW.consultant_id := selected_id;
  END IF;
  IF NEW.pipeline_stage IN ('Scheduled','Booked') AND NEW.booking_date IS NOT NULL AND NEW.booking_time IS NOT NULL AND NEW.consultant_id IS NULL THEN
    RAISE EXCEPTION 'Please choose a valid consultant' USING ERRCODE = '23514';
  END IF;
  IF NEW.consultant_id IS NOT NULL THEN
    SELECT c.name INTO selected_name FROM public.consultants c WHERE c.id = NEW.consultant_id;
    NEW.consultant := selected_name;
  END IF;
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.resolve_booking_consultant() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER resolve_booking_consultant BEFORE INSERT OR UPDATE ON public.customer_leads FOR EACH ROW EXECUTE FUNCTION public.resolve_booking_consultant();
CREATE OR REPLACE FUNCTION public.get_booked_slots(p_date date) RETURNS TABLE (consultant_id uuid, booking_time time) LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT l.consultant_id, l.booking_time FROM public.customer_leads l WHERE l.booking_date = p_date AND l.pipeline_stage IN ('Scheduled','Booked') AND l.consultant_id IS NOT NULL AND l.booking_time IS NOT NULL;
$$;
REVOKE ALL ON FUNCTION public.get_booked_slots(date) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_booked_slots(date) TO anon, authenticated, service_role;