DROP POLICY IF EXISTS "Allow anonymous inserts on career_applications" ON public.career_applications;
CREATE POLICY "Validated career applications" ON public.career_applications FOR INSERT TO anon, authenticated
WITH CHECK (
  length(btrim(full_name)) BETWEEN 1 AND 200
  AND length(email) <= 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (phone IS NULL OR length(phone) <= 40)
  AND (position IS NULL OR length(position) <= 200)
  AND (message IS NULL OR length(message) <= 5000)
  AND (cv_url IS NULL OR cv_url ~ '^[0-9]+_[a-z0-9]+\.(pdf|doc|docx)$')
);

DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.contact_submissions;
CREATE POLICY "Validated contact submissions" ON public.contact_submissions FOR INSERT TO anon, authenticated
WITH CHECK (
  length(btrim(name)) BETWEEN 1 AND 200
  AND length(email) <= 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(btrim(message)) BETWEEN 1 AND 5000
);

DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.customer_leads;
CREATE POLICY "Validated lead submissions" ON public.customer_leads FOR INSERT TO anon, authenticated
WITH CHECK (
  length(btrim(full_name)) BETWEEN 1 AND 200
  AND length(email) <= 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (message IS NULL OR length(message) <= 5000)
  AND pipeline_stage IN ('New','Booked')
  AND internal_notes IS NULL
  AND welcome_email_status = 'pending' AND welcome_email_attempts = 0 AND welcome_email_sent_at IS NULL
  AND booking_email_status = 'pending' AND booking_email_attempts = 0 AND booking_email_sent_at IS NULL
);

DROP POLICY IF EXISTS "Allow anonymous uploads to career-cvs" ON storage.objects;
CREATE POLICY "Validated resume uploads to career-cvs" ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (
  bucket_id = 'career-cvs'
  AND name ~ '^[0-9]+_[a-z0-9]+\.(pdf|doc|docx)$'
);

DROP POLICY IF EXISTS "Public read consultant photos" ON storage.objects;