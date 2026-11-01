// Hidden admin dashboard: Sanity Studio embedded at /admin. Not linked anywhere on the site and marked noindex.
// Editors sign in with their Sanity account (Google / GitHub / email) and must be invited to the project at
// https://www.sanity.io/manage -> your project -> Members.
import Studio from './Studio';

export const dynamic = 'force-static';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = { title: 'Admin', robots: { index: false, follow: false } }; // keep the dashboard out of search engines
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };

// Required for the static export: pre-render only /admin; the Studio handles deeper URLs in the browser.
export function generateStaticParams() {
  return [{ tool: [] as string[] }];
}

export default function AdminPage() {
  return <Studio />;
}
