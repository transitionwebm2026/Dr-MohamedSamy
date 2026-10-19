# Static export + deploy (Hostinger)

The site builds as a static export (`output: 'export'` in `next.config.mjs`) — `npm run build` produces a plain `/out` folder of HTML/CSS/JS with no Node server required at runtime. It's live on Hostinger's static hosting at `https://dr-mohamedsamy.com`.

## What changed, in one paragraph

Every public page is prerendered **at build time** from Supabase, not on each request — so a dashboard edit needs a rebuild+redeploy to appear live (automated below, not instant). The admin dashboard itself (`/admin/*`) is a client-side app: it talks to Supabase directly from the browser (same as the image uploader already did), gated by a client-side session check instead of server middleware. Security still comes from Supabase Row Level Security — writes go through the authenticated user's own Supabase session, never the service-role key.

## How a deploy happens

`.github/workflows/deploy.yml` builds the site and FTPs `/out` to Hostinger's `public_html`. It runs on:
1. Every push to `main`.
2. Manually: GitHub → Actions tab → "Build and deploy static export to Hostinger" → Run workflow.
3. **Every 10 minutes, on a schedule** — this is what makes dashboard edits show up automatically. A Supabase Database Webhook calling GitHub's `repository_dispatch` API was tried for a near-instant rebuild instead, but Supabase's webhook builder doesn't reliably send the JSON body GitHub's API needs, so it never fired a run in testing. The 10-minute schedule is the dependable fallback — any content edit goes live within 10 minutes, no webhook required. (If someone wants to revisit the webhook path later: the GitHub endpoint is `https://api.github.com/repos/transitionwebm2026/Dr-MohamedSamy/dispatches`, method POST, needs an `Authorization: Bearer <fine-grained PAT with Contents: Read and write>` header and a body of `{"event_type": "cms-content-updated"}` — the likely fix is routing through a small Supabase Edge Function that constructs that exact request, rather than Supabase's webhook UI directly.)

## Required GitHub repository secrets

Settings → Secrets and variables → Actions:

| Secret | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | same as in `.env.local` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | same as in `.env.local` |
| `NEXT_PUBLIC_SITE_URL` | `https://dr-mohamedsamy.com` |
| `HOSTINGER_FTP_SERVER` | IP only, no `ftp://` prefix — from hPanel → Files → FTP Accounts |
| `HOSTINGER_FTP_USERNAME` | from the same page |
| `HOSTINGER_FTP_PASSWORD` | from the same page |

The Supabase service-role key is **not** needed — nothing in the static build or the browser-side admin uses it.

## Known deploy gotchas (already handled in the workflow, documented for reference)

- **FTPS data-channel resets**: the Hostinger FTP server accepted FTPS logins but reset the data connection on every file transfer from a GitHub-hosted runner. Fixed by using plain `ftp` instead of `ftps` in the deploy step.
- **`dangerous-clean-slate: true`**: Next.js names every build's `_next/static/<hash>/` folder randomly. The deploy action's incremental sync tracks server state in a file it writes itself; if a run is ever interrupted mid-upload, that tracking can drift from reality and later fail with "550 No such file" trying to delete something already gone. Wiping the server before every upload avoids that whole class of drift — the site is a few MB, so re-uploading everything each time costs a little deploy time, not correctness.
- **Build cache staleness**: `npm run build` clears `.next/cache` first (see the `clean-build-cache` script in `package.json`). Without this, a second build in the same environment can silently reuse a previous build's Supabase response via Next's fetch Data Cache — exactly the failure mode the whole auto-rebuild setup depends on NOT happening.

## Testing locally before trusting a deploy

```bash
npm run build        # writes ./out
npx serve out         # or any static file server
```

Open the printed localhost URL and check `/ar/`, `/en/`, and `/admin/login` — the admin dashboard needs you to actually sign in with a real Supabase user to get past the login screen, since there's no server session to fake locally.
