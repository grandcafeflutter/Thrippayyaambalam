# Thrippayya Thrimoorthi Temple

Vite + React + TypeScript site for Thrippayya Thrimoorthi Temple.

## Run locally

```bash
npm install
copy .env.example .env
npm run dev
```

Set the Supabase values in `.env` before using the contact form or CMS features.

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
