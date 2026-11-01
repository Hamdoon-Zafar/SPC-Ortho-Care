import { clinic as localClinic, services as localServices, team as localTeam } from '@/content/clinic';
import type { Bi, Clinic, Doctor, Hours, Img, Service } from '@/content/clinic';
import { hasSanity } from '@/sanity/env';
import { client } from '@/sanity/lib/client';
import { imgSet, thumbUrl } from '@/sanity/lib/image';

/**
 * Data layer. Everything is fetched from Sanity at BUILD time (the site is a static export).
 * If Sanity isn't configured (no NEXT_PUBLIC_SANITY_PROJECT_ID) or a request fails, we fall back to the
 * local content in content/clinic.ts so the site always builds and never shows empty sections.
 */
async function query<T>(groq: string): Promise<T | null> {
  if (!hasSanity) {
    console.warn('[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is not set: building with local fallback content.');
    return null;
  }
  try {
    return await client.fetch<T>(groq);
  } catch (e) {
    console.warn('[sanity] fetch failed, using local content:', (e as Error).message);
    return null;
  }
}

// ---------- Services ----------
type ServiceRow = { _id: string; title: string; titleUr?: string; slug?: string; descriptionEn: string; descriptionUr?: string; image?: any };

export async function getServices(): Promise<Service[]> {
  const rows = await query<ServiceRow[]>(`*[_type == "service"] | order(order asc) {
    _id, title, titleUr, "slug": slug.current, descriptionEn, descriptionUr, image
  }`);
  if (!rows?.length) {
    if (hasSanity) console.warn('[sanity] no services found in the dataset: run `npm run migrate`. Using local fallback content.');
    return localServices;
  }
  return rows.map((r) => {
    const id = r.slug ?? r._id;
    const local = localServices.find((s) => s.id === id); // old local photo is kept until one is uploaded to Sanity
    return {
      id,
      name: { en: r.title, ur: r.titleUr || r.title },
      desc: { en: r.descriptionEn, ur: r.descriptionUr || r.descriptionEn },
      image: imgSet(r.image, [480, 800, 1120], 9 / 16) ?? local?.image, // 16:9 panel photo
      thumb: thumbUrl(r.image) ?? local?.thumb,                          // square list thumbnail
    };
  });
}

// ---------- Team ----------
type DoctorRow = {
  _id: string; name: string; nameUr?: string; badge?: string; badgeUr?: string; title: string; titleUr?: string;
  qualifications?: string; qualificationsUr?: string; bio?: string; bioUr?: string;
  specialties?: string[]; specialtiesUr?: string[]; image?: any;
};
const bi = (en?: string, ur?: string): Bi => ({ en: en ?? '', ur: ur || en || '' });

export async function getTeam(): Promise<Doctor[]> {
  const rows = await query<DoctorRow[]>(`*[_type == "doctor"] | order(order asc) {
    _id, name, nameUr, badge, badgeUr, title, titleUr, qualifications, qualificationsUr, bio, bioUr, specialties, specialtiesUr, image
  }`);
  if (!rows?.length) return localTeam;
  return rows.map((r, i) => ({
    id: r._id,
    name: bi(r.name, r.nameUr),
    title: bi(r.badge, r.badgeUr),
    role: bi(r.title, r.titleUr),
    qualifications: r.qualifications ? bi(r.qualifications, r.qualificationsUr) : undefined,
    bio: bi(r.bio, r.bioUr),
    tags: (r.specialties ?? []).map((s, j) => bi(s, r.specialtiesUr?.[j])),
    photo: imgSet(r.image, [400, 640, 800], 5 / 4) ?? (i === 0 ? localTeam[0]?.photo : undefined), // 4:5 portrait
  }));
}

// ---------- Announcements ----------
export type Post = { id: string; title: string; date: string; image?: Img; content: any[] };

export async function getPosts(): Promise<Post[]> {
  const rows = await query<any[]>(`*[_type == "post" && defined(publishedAt)] | order(publishedAt desc)[0...3] {
    _id, title, publishedAt, mainImage, content
  }`);
  return (rows ?? []).map((r) => ({
    id: r._id, title: r.title, date: r.publishedAt, content: r.content ?? [],
    image: imgSet(r.mainImage, [480, 800, 1120], 9 / 16),
  }));
}

// ---------- Clinic settings (hours, phones, social) ----------
type SettingsRow = {
  hours?: { day: string; closed?: boolean; slots?: { opens: string; closes: string }[] }[];
  homeServiceEn?: string; homeServiceUr?: string; whatsapp?: string; facebook?: string; instagram?: string; mapsUrl?: string;
  contacts?: { label: string; labelUr?: string; role?: string; roleUr?: string; phone: string }[];
};

const DAY_UR: Record<string, string> = { Monday: 'پیر', Tuesday: 'منگل', Wednesday: 'بدھ', Thursday: 'جمعرات', Friday: 'جمعہ', Saturday: 'ہفتہ', Sunday: 'اتوار' };
const DAY_ORDER = Object.keys(DAY_UR);

/** "22:00" -> "10:00 PM" */
const fmt = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`;
};
/** "+923110015200" -> "+92 311 0015200" */
const pretty = (p: string) => p.replace(/^\+92(\d{3})(\d{7})$/, '+92 $1 $2');

export async function getClinic(): Promise<Clinic> {
  const s = await query<SettingsRow | null>(`*[_type == "clinicSettings"][0] {
    hours, homeServiceEn, homeServiceUr, whatsapp, facebook, instagram, mapsUrl, contacts
  }`);
  if (!s) return localClinic;

  const days = [...(s.hours ?? [])].sort((a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day));
  const hours: Hours[] = days.map((d) => {
    const slots = d.closed ? [] : d.slots ?? [];
    const text = slots.map((x) => `${fmt(x.opens)} – ${fmt(x.closes)}`).join('\n');
    return { day: { en: d.day, ur: DAY_UR[d.day] }, open: slots.length ? { en: text, ur: text } : { en: 'Closed', ur: 'بند' } };
  });

  // Search-engine opening hours are derived from the same data, grouped by identical time ranges.
  const groups = new Map<string, { days: string[]; opens: string; closes: string }>();
  days.forEach((d) => (d.closed ? [] : d.slots ?? []).forEach((x) => {
    const k = `${x.opens}-${x.closes}`;
    groups.set(k, groups.get(k) ?? { days: [], opens: x.opens, closes: x.closes });
    groups.get(k)!.days.push(d.day);
  }));

  return {
    ...localClinic,
    hours: hours.length ? hours : localClinic.hours,
    schemaHours: groups.size ? [...groups.values()] : localClinic.schemaHours,
    homeService: s.homeServiceEn ? bi(s.homeServiceEn, s.homeServiceUr) : localClinic.homeService,
    whatsapp: s.whatsapp || localClinic.whatsapp,
    mapsUrl: s.mapsUrl || localClinic.mapsUrl,
    social: { facebook: s.facebook || undefined, instagram: s.instagram || undefined },
    contacts: s.contacts?.length
      ? s.contacts.map((c) => ({ name: bi(c.label, c.labelUr), role: bi(c.role, c.roleUr), phone: c.phone, display: pretty(c.phone) }))
      : localClinic.contacts,
  };
}
