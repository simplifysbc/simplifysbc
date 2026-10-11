DROP POLICY "Anyone can view active consultants" ON public.consultants;
CREATE POLICY "Public can view active consultants" ON public.consultants FOR SELECT TO anon USING (active);
CREATE POLICY "Signed in can view consultants" ON public.consultants FOR SELECT TO authenticated USING (active OR public.has_role(auth.uid(), 'admin'));