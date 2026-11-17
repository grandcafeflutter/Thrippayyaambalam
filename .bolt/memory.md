# Project memory

## Product intent & audience

- Website for **Thrippayya Thrimoorthi Temple**, located in Thrippayya, Kerala
- Audience: devotees and visitors seeking temple info, contact, location, Darshan hours
- Goal: polished, production-ready temple web presence

## Brand personality & voice

- Warm, welcoming, reverent tone suited to a Hindu temple
- Temple-themed styling; emphasis on clarity and approachability

## Visual design & UX direction

- Vite + React (JSX), Tailwind CSS, Lucide React icons; no extra UI/icon packages
- `@/` path alias maps to `src/` for imports
- Card-based layouts with rounded corners, hover states, temple-themed palette
- Responsive spacing and breakpoints throughout
- Contact page pattern: contact action cards (visit, call, email, Darshan hours) + message form + embedded map section with overlay label and “Get directions” CTA linking to Google Maps
- Map is responsive; location pinned for Thrippayya, Kerala

## Decisions, constraints & rationale

- All pages must be beautiful and production-worthy, not generic
- Prefer existing stack (Tailwind, Lucide, React hooks) over new packages
- Google Maps used for directions via external link rather than custom map integration
- Contact page restructured from two plain panels into hierarchy-rich, action-oriented sections for better usability

## Open questions & assumptions

- Temple address, phone, email, and Darshan timings are assumed/placeholder; verify with real values
- No CMS or backend confirmed; contact form may need submission handler wiring
- Exact brand colors and typography not yet locked; current temple theme is inferred