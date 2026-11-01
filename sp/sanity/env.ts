// Central place for Sanity settings. Values come from .env.local (see .env.local.example).
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01';
/** True once a project ID has been filled in. The site falls back to local content when false. */
export const hasSanity = Boolean(projectId);
