import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { apiVersion, dataset, projectId } from './sanity/env';
import { schemaTypes } from './sanity/schemas';
import { structure } from './sanity/structure';

export default defineConfig({
  name: 'default',
  title: 'South Punjab Ortho Care – Admin',
  // Studio is served by the website itself at /admin (see app/(admin)/admin/[[...tool]]/page.tsx).
  basePath: '/admin',
  // Filled from .env.local: NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET (see .env.local.example).
  projectId: projectId || 'missing-project-id',
  dataset,
  schema: {
    types: schemaTypes,
    // Hide "Clinic settings" from the "create new" menu: it already exists as a single document.
    templates: (templates) => templates.filter(({ schemaType }) => schemaType !== 'clinicSettings'),
  },
  plugins: [structureTool({ structure })],
  document: {
    newDocumentOptions: (prev) => prev.filter((item) => item.templateId !== 'clinicSettings'),
  },
});
