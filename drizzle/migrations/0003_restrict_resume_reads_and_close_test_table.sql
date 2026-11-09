DROP POLICY IF EXISTS "Allow authenticated reads on career-cvs" ON storage.objects;
CREATE POLICY "Staff can read career resumes" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'career-cvs' AND (public.has_role(auth.uid(), 'admin'::public.app_role) OR public.has_role(auth.uid(), 'consultant'::public.app_role)));
DROP POLICY IF EXISTS "test insert" ON public.rls_test;
REVOKE ALL ON TABLE public.rls_test FROM anon, authenticated;
ALTER TABLE public.rls_test ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.rls_test IS 'DEPRECATED: unused test table, no client access';