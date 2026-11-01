// NOTE: imported from @sanity/client (not 'next-sanity') so the static export doesn't pull in Next.js server actions.
import { createClient } from '@sanity/client';
import { apiVersion, dataset, projectId } from '../env';

// Read-only client used at build time (the site is a static export, so this runs during `npm run build`).
// useCdn:false => always fresh data right after an editor publishes (the rebuild webhook relies on this).
// If you later make the dataset PRIVATE, add:  token: process.env.SANITY_API_READ_TOKEN
//   (Sanity manage -> API -> Tokens -> "Viewer"), and keep it server-side only.
export const client = createClient({
  projectId: projectId || 'missing-project-id', // placeholder so the app still builds before setup
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'published', // never show unpublished drafts on the live site
});
