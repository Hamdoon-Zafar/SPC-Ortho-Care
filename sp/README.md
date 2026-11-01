# South Punjab Ortho Care Center – website + Sanity admin

## First-time setup
1. `npm install`
2. Create a Sanity project (free): https://www.sanity.io/get-started  → note the **Project ID** (sanity.io/manage).
3. `cp .env.local.example .env.local` and fill in `NEXT_PUBLIC_SANITY_PROJECT_ID` and `SANITY_API_WRITE_TOKEN`
   (token: sanity.io/manage → your project → API → Tokens → Add API token → "Editor").
4. Allow the site to talk to Sanity: sanity.io/manage → API → CORS origins → add `http://localhost:3000`
   and your live site address (e.g. https://yourdomain.com and https://your-project.pages.dev), tick "Allow credentials".
5. Preview the migration, then run it once (needs Node 20.6+):
   `npm run migrate:dry`  →  `npm run migrate`
6. `npm run dev` → site at http://localhost:3000, admin at http://localhost:3000/admin (sign in with your Sanity account).
   Invite staff under sanity.io/manage → Members.

## Going live (Cloudflare Pages)
- Build command `npm run build`, output directory `out`.
- Environment variables: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, NEXT_PUBLIC_SANITY_API_VERSION (+ NEXT_PUBLIC_SITE_URL). Do NOT add SANITY_API_WRITE_TOKEN.
- The site is a static export: Sanity content is baked in at build time. To publish edits automatically:
  Cloudflare Pages → Settings → Builds → Deploy hooks → create one → copy URL; then sanity.io/manage → API → Webhooks →
  Create: URL = that deploy hook, Dataset = production, Trigger on = Create, Update, Delete, HTTP method = POST.
- If Sanity is unreachable or not configured, the build falls back to content/clinic.ts + public/ images.
