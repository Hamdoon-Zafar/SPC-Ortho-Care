import { defineField, defineType } from 'sanity';

// Team member card. The website currently shows the first doctor (by "order") as the featured team lead.
export default defineType({
  name: 'doctor',
  title: 'Doctor / Team member',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name (English)', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'nameUr', title: 'Name (Urdu)', type: 'string' }),
    defineField({ name: 'badge', title: 'Small label above the name (English)', type: 'string', description: 'e.g. "Our Team Lead"' }),
    defineField({ name: 'badgeUr', title: 'Small label (Urdu)', type: 'string' }),
    defineField({ name: 'title', title: 'Title / role (English)', type: 'string', description: 'e.g. "Consultant Orthopedic Surgeon"', validation: (r) => r.required() }),
    defineField({ name: 'titleUr', title: 'Title / role (Urdu)', type: 'string' }),
    defineField({ name: 'qualifications', title: 'Qualifications (English)', type: 'string', description: 'Optional, e.g. "BSc Prosthetics & Orthotics"' }),
    defineField({ name: 'qualificationsUr', title: 'Qualifications (Urdu)', type: 'string' }),
    defineField({ name: 'image', title: 'Photo', type: 'image', options: { hotspot: true }, description: 'Portrait (4:5) works best.' }),
    defineField({ name: 'bio', title: 'Introduction (English)', type: 'text', rows: 5 }),
    defineField({ name: 'bioUr', title: 'Introduction (Urdu)', type: 'text', rows: 5 }),
    defineField({ name: 'specialties', title: 'Specialties (English)', type: 'array', of: [{ type: 'string' }], description: 'Small tags shown under the introduction.' }),
    defineField({ name: 'specialtiesUr', title: 'Specialties (Urdu)', type: 'array', of: [{ type: 'string' }], description: 'Same order as the English list.' }),
    defineField({ name: 'order', title: 'Display order', type: 'number', initialValue: 1, validation: (r) => r.integer().min(1) }),
  ],
  preview: { select: { title: 'name', subtitle: 'title', media: 'image' } },
});
