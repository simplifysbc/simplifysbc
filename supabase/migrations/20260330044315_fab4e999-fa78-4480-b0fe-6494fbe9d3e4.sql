-- Create career_applications table
CREATE TABLE public.career_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  position text,
  message text,
  cv_url text
);

ALTER TABLE public.career_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts on career_applications"
ON public.career_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Create storage bucket for CVs
INSERT INTO storage.buckets (id, name, public)
VALUES ('career-cvs', 'career-cvs', false);

-- Allow anonymous uploads to career-cvs bucket
CREATE POLICY "Allow anonymous uploads to career-cvs"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'career-cvs');

-- Allow authenticated reads on career-cvs
CREATE POLICY "Allow authenticated reads on career-cvs"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'career-cvs');