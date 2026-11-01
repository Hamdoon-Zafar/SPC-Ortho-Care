import { defineField, defineType } from 'sanity';

// Announcements / patient updates. The newest posts appear in an "Updates" section on the site
// (the section is hidden automatically while there are no posts).
export default defineType({
  name: 'post',
  title: 'Announcement / Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'publishedAt', title: 'Published at', type: 'datetime', initialValue: () => new Date().toISOString(), validation: (r) => r.required() }),
    defineField({ name: 'mainImage', title: 'Main image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'content', title: 'Content', type: 'blockContent' }),
  ],
  orderings: [{ title: 'Newest first', name: 'publishedDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'publishedAt', media: 'mainImage' } },
});
