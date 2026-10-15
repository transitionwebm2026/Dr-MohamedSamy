# Static export + Hostinger deploy

The site now builds as a static export (`output: 'export'` in `next.config.mjs`) — `npm run build` produces a plain `/out` folder of HTML/CSS/JS with no Node server required at runtime, which is what lets it run on a Hostinger **Static Website** plan instead of a webapp slot.

## What changed, in one paragraph

Every public page is prerendered **at build time** from Supabase, not on each request — so a dashboard edit needs a rebuild+redeploy to appear live (automated below, not instant). The admin dashboard itself (`/admin/*`) is now a client-side app: it talks to Supabase directly from the browser (same as the image uploader already did), gated by a client-side session check instead of server middleware. Security still comes from Supabase Row Level Security, exactly as it did before — writes were already going through the authenticated user's own Supabase session, never the service-role key, so no RLS policies needed to change.

## 1. GitHub repository secrets

Settings → Secrets and variables → Actions → New repository secret:

| Secret | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | same as in `.env.local` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | same as in `.env.local` |
| `NEXT_PUBLIC_SITE_URL` | the real production domain, e.g. `https://dr-mohamedsami.com` |
| `HOSTINGER_FTP_SERVER` | from hPanel → Files → FTP Accounts |
| `HOSTINGER_FTP_USERNAME` | from the same page |
| `HOSTINGER_FTP_PASSWORD` | from the same page |

The Supabase service-role key is **not** needed here — nothing in the static build or the browser-side admin uses it anymore.

`server-dir` in `.github/workflows/deploy.yml` assumes `public_html` is the site's document root, which is the default for Hostinger shared/static plans; check hPanel if yours differs.

## 2. First deploy

Push this branch's work to `main` (or run the workflow manually: Actions tab → "Build and deploy static export to Hostinger" → Run workflow). It builds and FTPs `/out` to Hostinger. Check the site loads at the real domain afterward.

## 3. Auto-rebuild when the admin edits content

Since pages are frozen at build time, an edit in the dashboard needs to trigger this same workflow. Wire a Supabase Database Webhook to do that automatically:

1. **Create a GitHub token** the webhook can use to trigger the workflow: Settings (top-right avatar) → Developer settings → Fine-grained tokens → generate one scoped to just this repo, with **Contents: Read and write** permission (that's what `repository_dispatch` needs). Copy it once — it won't be shown again.
2. **Supabase Dashboard → Database → Webhooks → Create a new webhook**, once for each of these tables: `page_sections`, `dynamic_items_collections`, `global_settings`. For each:
   - Events: `INSERT`, `UPDATE`, `DELETE`
   - Type: HTTP Request
   - Method: `POST`
   - URL: `https://api.github.com/repos/<your-github-owner>/<repo-name>/dispatches`
   - Headers:
     - `Authorization: Bearer <the token from step 1>`
     - `Accept: application/vnd.github+json`
     - `Content-Type: application/json`
   - Body: `{"event_type": "cms-content-updated"}`

From then on, saving anything in the dashboard fires the webhook → GitHub runs the build → Hostinger gets the new `/out`. Expect roughly 1–3 minutes between saving and the change going live, not instant — that delay is the actual cost of moving to static hosting, same tradeoff a CMS-driven static site always has.

## 4. Testing locally before trusting a deploy

```bash
npm run build        # writes ./out
npx serve out         # or any static file server
```

Open the printed localhost URL and check `/ar/`, `/en/`, and `/admin/login` — the admin dashboard needs you to actually sign in with a real Supabase user to get past the login screen, since there's no server session to fake locally.
