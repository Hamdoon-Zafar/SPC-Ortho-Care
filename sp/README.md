# South Punjab Ortho Care Center

Next.js 14 (static export) + Tailwind + Sanity Studio at `/admin`.

## Run
1. `npm install`
2. `cp .env.local.example .env.local` and fill it in (comments explain each value).
3. First time only: `npm run migrate:dry`, then `npm run migrate` (uploads photos + content to Sanity; Node 20.6+).
4. `npm run dev` → site `localhost:3000`, admin `localhost:3000/admin`.

## Deploy (Cloudflare Pages)
Build command `npm run build`, output directory `out`. Add `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`,
`NEXT_PUBLIC_SANITY_API_VERSION`, `NEXT_PUBLIC_SITE_URL` as environment variables. Never add `SANITY_API_WRITE_TOKEN` there.
Auto-rebuild on publish: Pages > Settings > Builds > Deploy hooks, then Sanity manage > API > Webhooks (POST to that URL).

## Where things live
- `lib/content.ts` loads everything from Sanity at build time (falls back to `content/clinic.ts` + `public/` if Sanity is empty/unreachable; the build log says so).
- `sanity/` schemas, client, image helper. `scripts/` one-time migration. `components/` the page sections.

## After Sanity is verified (build log shows no "[sanity]" warnings and the live site shows your CMS content)
Delete `scripts/`, `public/services/`, `public/team/`, and the `migrate*` lines in `package.json`.
