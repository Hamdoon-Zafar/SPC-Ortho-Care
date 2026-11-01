import type { StructureResolver } from 'sanity/structure';

// Sidebar layout of the admin dashboard. "Clinic settings" is a singleton (one document only).
export const structure: StructureResolver = (S) =>
  S.list().title('Content').items([
    S.listItem().title('Clinic settings (hours, phones, social)').id('clinicSettings')
      .child(S.document().schemaType('clinicSettings').documentId('clinicSettings')),
    S.divider(),
    S.documentTypeListItem('service').title('Services'),
    S.documentTypeListItem('doctor').title('Doctors / Team'),
    S.documentTypeListItem('post').title('Announcements'),
  ]);
