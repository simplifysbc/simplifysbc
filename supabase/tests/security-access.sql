-- Catalog integration assertions: each query returns true only when its access rule holds.
SELECT NOT has_table_privilege('anon', 'public.rls_test', 'INSERT')
  AND NOT has_table_privilege('authenticated', 'public.rls_test', 'INSERT')
  AND NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'rls_test')
  AS unused_test_table_closed;

SELECT EXISTS (
  SELECT 1 FROM pg_policies
  WHERE schemaname = 'storage' AND tablename = 'objects' AND cmd = 'SELECT'
    AND policyname = 'Staff can read career resumes'
    AND roles = ARRAY['authenticated']::name[]
    AND qual LIKE '%has_role%admin%'
    AND qual LIKE '%has_role%consultant%'
) AND NOT EXISTS (
  SELECT 1 FROM pg_policies
  WHERE schemaname = 'storage' AND tablename = 'objects' AND cmd IN ('SELECT', 'ALL')
    AND qual LIKE '%career-cvs%' AND qual NOT LIKE '%has_role%'
) AS resumes_require_staff_role;