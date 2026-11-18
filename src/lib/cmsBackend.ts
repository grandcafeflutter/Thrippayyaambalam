import { supabase } from '@/lib/supabase';

const CMS_KEYS = [
  'temple-cms-home-hero-images',
  'temple-cms-home-quick-links',
  'temple-cms-darshan-timings',
  'temple-cms-home-festivals',
  'temple-cms-home-festivals-title',
  'temple-cms-pooja-rates',
  'temple-cms-festival-cards',
  'temple-cms-festival-table',
  'temple-cms-festival-table-title',
  'temple-cms-gallery-images',
  'temple-cms-administration-content',
] as const;

type CmsRow = {
  key: string;
  content: unknown;
};

function isDataUrl(value: unknown): value is string {
  return typeof value === 'string' && value.startsWith('data:image/');
}

async function uploadDataUrl(dataUrl: string, key: string): Promise<string> {
  if (!supabase) throw new Error('Supabase is not configured.');
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  const extension = blob.type.split('/')[1] || 'webp';
  const path = `cms/${key}/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from('site-media').upload(path, blob, {
    contentType: blob.type,
    cacheControl: '31536000',
    upsert: false,
  });
  if (error) throw error;
  return supabase.storage.from('site-media').getPublicUrl(path).data.publicUrl;
}

async function replaceDataUrls(value: unknown, key: string): Promise<unknown> {
  if (isDataUrl(value)) return uploadDataUrl(value, key);
  if (Array.isArray(value)) return Promise.all(value.map((item) => replaceDataUrls(item, key)));
  if (value && typeof value === 'object') {
    const entries = await Promise.all(Object.entries(value).map(async ([entryKey, entryValue]) => [
      entryKey,
      await replaceDataUrls(entryValue, key),
    ] as const));
    return Object.fromEntries(entries);
  }
  return value;
}

export async function hydrateCmsContent(): Promise<void> {
  if (!supabase || typeof window === 'undefined') return;
  const { data, error } = await supabase.from('cms_sections').select('key, content').in('key', CMS_KEYS);
  if (error) {
    console.warn('Could not load CMS content from Supabase.', error.message);
    return;
  }
  for (const row of (data ?? []) as CmsRow[]) {
    const storageValue = typeof row.content === 'string' ? row.content : JSON.stringify(row.content);
    window.localStorage.setItem(row.key, storageValue);
  }
}

export async function saveCmsContent(key: string, value: unknown): Promise<void> {
  if (!supabase) throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  const content = await replaceDataUrls(value, key);
  const { error } = await supabase.from('cms_sections').upsert({
    key,
    content,
    updated_at: new Date().toISOString(),
    updated_by: (await supabase.auth.getUser()).data.user?.id ?? null,
  });
  if (error) throw error;
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, typeof content === 'string' ? content : JSON.stringify(content));
  }
}
