CREATE TABLE public.consultants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  role text NOT NULL DEFAULT '',
  photo_url text,
  bio text NOT NULL DEFAULT '',
  specialties text[] NOT NULL DEFAULT '{}',
  availability jsonb NOT NULL DEFAULT '[]'::jsonb,
  projects jsonb NOT NULL DEFAULT '[]'::jsonb,
  active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.consultants TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.consultants TO authenticated;
GRANT ALL ON public.consultants TO service_role;
ALTER TABLE public.consultants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active consultants" ON public.consultants FOR SELECT TO anon, authenticated USING (active OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert consultants" ON public.consultants FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update consultants" ON public.consultants FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete consultants" ON public.consultants FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER consultants_updated_at BEFORE UPDATE ON public.consultants FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "Public read consultant photos" ON storage.objects FOR SELECT USING (bucket_id = 'consultant-photos');
CREATE POLICY "Admins upload consultant photos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'consultant-photos' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update consultant photos" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'consultant-photos' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete consultant photos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'consultant-photos' AND public.has_role(auth.uid(), 'admin'));