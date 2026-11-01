import { defineArrayMember, defineField, defineType } from 'sanity';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIME = (r: any) => r.required().regex(/^([01]\d|2[0-3]):[0-5]\d$/, { name: '24-hour time' }).error('Use 24-hour time like 11:00 or 22:00');

// SINGLETON: only one of these exists. Controls opening hours, phone numbers, WhatsApp, social links.
export default defineType({
  name: 'clinicSettings',
  title: 'Clinic settings',
  type: 'document',
  fields: [
    defineField({
      name: 'hours', title: 'Opening hours', type: 'array',
      description: 'One row per day. Use 24-hour time (e.g. 22:00 = 10 PM). Add two time ranges for a break (e.g. Friday Jummah).',
      validation: (r) => r.required().length(7).error('Please keep exactly 7 rows, one per day'),
      of: [defineArrayMember({
        type: 'object', name: 'dayHours',
        fields: [
          defineField({ name: 'day', type: 'string', options: { list: DAYS }, validation: (r) => r.required() }),
          defineField({ name: 'closed', title: 'Closed all day', type: 'boolean', initialValue: false }),
          defineField({
            name: 'slots', title: 'Open from – to', type: 'array',
            hidden: ({ parent }) => parent?.closed,
            of: [defineArrayMember({ type: 'object', fields: [
              defineField({ name: 'opens', title: 'Opens', type: 'string', validation: TIME }),
              defineField({ name: 'closes', title: 'Closes', type: 'string', validation: TIME }),
            ], preview: { select: { a: 'opens', b: 'closes' }, prepare: ({ a, b }) => ({ title: `${a} – ${b}` }) } })],
          }),
        ],
        preview: { select: { title: 'day', closed: 'closed', slots: 'slots' }, prepare: ({ title, closed, slots }) => ({ title, subtitle: closed ? 'Closed' : (slots || []).map((s: any) => `${s.opens}–${s.closes}`).join(', ') }) },
      })],
    }),
    defineField({ name: 'homeServiceEn', title: 'Home service note (English)', type: 'string' }),
    defineField({ name: 'homeServiceUr', title: 'Home service note (Urdu)', type: 'string' }),
    defineField({
      name: 'contacts', title: 'Phone numbers (tap-to-call)', type: 'array', validation: (r) => r.max(3),
      description: 'Shown in the Contact section. The first number is also used for search-engine data.',
      of: [defineArrayMember({ type: 'object', fields: [
        defineField({ name: 'label', title: 'Label (English)', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'labelUr', title: 'Label (Urdu)', type: 'string' }),
        defineField({ name: 'role', title: 'Purpose (English)', type: 'string' }),
        defineField({ name: 'roleUr', title: 'Purpose (Urdu)', type: 'string' }),
        defineField({ name: 'phone', title: 'Phone number', type: 'string', description: 'International format, e.g. +923110015200', validation: (r) => r.required().regex(/^\+\d{10,15}$/).error('Format: +923110015200 (no spaces)') }),
      ], preview: { select: { title: 'label', subtitle: 'phone' } } })],
    }),
    defineField({ name: 'whatsapp', title: 'WhatsApp number', type: 'string', description: 'Digits only, with country code, e.g. 923110015200', validation: (r) => r.regex(/^\d{10,15}$/).error('Digits only, e.g. 923110015200') }),
    defineField({ name: 'facebook', title: 'Facebook page URL', type: 'url' }),
    defineField({ name: 'instagram', title: 'Instagram profile URL', type: 'url' }),
    defineField({ name: 'mapsUrl', title: 'Google Maps link', type: 'url', description: 'The "Share > Copy link" address of the clinic listing.' }),
  ],
  preview: { prepare: () => ({ title: 'Clinic settings' }) },
});
