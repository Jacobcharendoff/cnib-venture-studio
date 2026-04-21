# The Venture Collective

A free entrepreneurship course platform by CNIB for aspiring entrepreneurs living with sight loss.

**Course:** Turn Your Idea Into Your First Dollar — 24 lessons, 6 modules, one real business.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Auth & Database:** Supabase
- **Styling:** Tailwind CSS
- **Deploy:** Vercel

## Setup

1. Clone the repo
2. `cp .env.example .env.local` and add your Supabase credentials
3. Run `the-venture-collective-schema.sql` against your Supabase project
4. `npm install && npm run dev`

## Accessibility

WCAG 2.1 AA: skip links, ARIA labels, focus-visible, 44px touch targets, reduced motion support.