import { defineField, defineType } from 'sanity';

// One document per service shown in the website's "Services" accordion.
export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title (English)', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'titleUr', title: 'Title (Urdu)', type: 'string', description: 'Shown when the visitor switches to Urdu.' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (r) => r.required() }),
    defineField({
      name: 'image', title: 'Photo', type: 'image', options: { hotspot: true },
      description: 'Landscape (16:9) works best. Use the hotspot to choose the important part of the photo.',
    }),
    defineField({ name: 'descriptionEn', title: 'Description (English)', type: 'text', rows: 3, description: '2–3 short lines.', validation: (r) => r.required().max(400) }),
    defineField({ name: 'descriptionUr', title: 'Description (Urdu)', type: 'text', rows: 3, validation: (r) => r.max(500) }),
    defineField({ name: 'order', title: 'Display order', type: 'number', description: '1 appears first.', validation: (r) => r.required().integer().min(1) }),
  ],
  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'descriptionEn', media: 'image' } },
});
