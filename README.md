# Thrippayya Thrimoorthi Temple

Vite + React + TypeScript site for Thrippayya Thrimoorthi Temple.

## Run locally

```bash
npm install
copy .env.example .env
npm run dev
```

Set the Supabase values in `.env` before using the contact form or CMS features.

## Supabase CMS setup

The project uses Supabase Auth for the CMS login, PostgreSQL for editable CMS
content, and a public `site-media` Storage bucket for public temple images.

1. In Supabase, open **SQL Editor** and run the migration in
   `supabase/migrations/20261118090000_create_cms_content_and_media.sql`.
2. In **Authentication → Users**, create the CMS user's email and password.
3. Open `/#/cms` and sign in with that Supabase Auth email and password.

The browser only uses the publishable/anon key from `.env`. Never put a
`service_role` or secret key in a `VITE_` variable or in frontend code.

Uploaded CMS images are stored in Supabase Storage and their public URLs are
stored in the `cms_sections` table. Existing default content remains available
as a fallback until a CMS section is saved.

## Deploy to Vercel

Import this repository into Vercel with these settings:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

Add these Production environment variables in Vercel:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

The included `vercel.json` rewrites direct page URLs back to the SPA entry point, so routes such as `/history`, `/gallery`, `/contact`, and `/cms` work after refresh.

## Verification

```bash
npm run typecheck
npm run lint
npm run build
```
