/*
  CMS content and public media storage

  The CMS stores editable page sections as JSONB so the existing dashboard can
  evolve without a migration for every individual text field. Public visitors
  can read content, while only authenticated CMS users can write it.
*/

CREATE TABLE IF NOT EXISTS public.cms_sections (
  key text PRIMARY KEY CHECK (char_length(key) BETWEEN 1 AND 120),
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

ALTER TABLE public.cms_sections ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.cms_sections TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.cms_sections TO authenticated;

DROP POLICY IF EXISTS "public_can_read_cms_sections" ON public.cms_sections;
CREATE POLICY "public_can_read_cms_sections"
  ON public.cms_sections FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "authenticated_can_insert_cms_sections" ON public.cms_sections;
CREATE POLICY "authenticated_can_insert_cms_sections"
  ON public.cms_sections FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "authenticated_can_update_cms_sections" ON public.cms_sections;
CREATE POLICY "authenticated_can_update_cms_sections"
  ON public.cms_sections FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "authenticated_can_delete_cms_sections" ON public.cms_sections;
CREATE POLICY "authenticated_can_delete_cms_sections"
  ON public.cms_sections FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'site-media',
  'site-media',
  true,
  20971520,
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "public_can_read_site_media" ON storage.objects;
CREATE POLICY "public_can_read_site_media"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'site-media');

DROP POLICY IF EXISTS "authenticated_can_upload_site_media" ON storage.objects;
CREATE POLICY "authenticated_can_upload_site_media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'site-media');

DROP POLICY IF EXISTS "authenticated_can_update_site_media" ON storage.objects;
CREATE POLICY "authenticated_can_update_site_media"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'site-media')
  WITH CHECK (bucket_id = 'site-media');

DROP POLICY IF EXISTS "authenticated_can_delete_site_media" ON storage.objects;
CREATE POLICY "authenticated_can_delete_site_media"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'site-media');
