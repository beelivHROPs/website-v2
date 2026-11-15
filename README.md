# Beeliv Hospitality — website

The public website for **beeliv.co** / **www.beeliv.co**: Home, About, For Businesses, Training, Contact and Request (Hire Talent / Book a Service Audit).

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4.

## Run locally

```bash
npm ci
npm run dev
```

## Where other pages live

This site serves only the marketing pages. Links to app pages are redirected to the app that owns them (same path):

| Path | Goes to |
|---|---|
| `/login`, `/signup`, `/jobs`, `/privacy`, `/terms`, `/staff`, `/applicant` | https://talent.beeliv.co |
| `/admin` | https://admin.beeliv.co |
| `/client` | https://client.beeliv.co |

## Environment (Vercel)

| Name | Value |
|---|---|
| `SUPABASE_URL` | the Beeliv Supabase project URL |
| `SUPABASE_SECRET_KEY` | secret, set in Vercel only |
| `PUBLIC_ENQUIRY_RATE_LIMIT_SECRET` | secret, set in Vercel only |
| `PUBLIC_ENQUIRIES_ENABLED` | `true` |
| `PUBLIC_ENQUIRY_ORIGINS` | `https://beeliv.co,https://www.beeliv.co` |
| `BEELIV_ENV` | `production` |

Without these, the Contact and Request forms show "temporarily unavailable"; every page still works.
