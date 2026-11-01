import type { Metadata } from 'next';
import { Inter, Noto_Sans_Arabic } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import { getClinic } from '@/lib/content';

const latin = Inter({ subsets: ['latin'], variable: '--font-latin', display: 'swap' });
const urdu = Noto_Sans_Arabic({ subsets: ['arabic'], variable: '--font-urdu', display: 'swap' }); // covers Urdu glyphs

export const metadata: Metadata = {
  title: 'South Punjab Ortho Care Center | Braces, Prosthetics & Orthotics',
  description: 'Custom braces, prosthetic limbs, splints and orthotic insoles in South Punjab. Call or WhatsApp to book.',
  icons: { icon: '/logo-sm.png' },
};

// Runs before paint: restores saved theme/language so there is no flash or layout jump.
const boot = `try{var d=document.documentElement,t=localStorage.theme,l=localStorage.lang;
if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))d.classList.add('dark');
if(l==='ur'){d.lang='ur';d.dir='rtl'}}catch(e){}`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const c = await getClinic();
  // JSON-LD for local SEO (MedicalClinic extends LocalBusiness)
  // Set NEXT_PUBLIC_SITE_URL (e.g. https://yourdomain.com) once the domain is bought.
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'MedicalClinic', name: c.name,
    ...(site ? { url: site, image: `${site}/logo.png` } : {}),
    telephone: c.contacts[0].phone, medicalSpecialty: 'Orthopedic',
  ...(c.social ? { sameAs: Object.values(c.social).filter(Boolean) } : {}),
    address: { '@type': 'PostalAddress', streetAddress: c.street, addressLocality: c.city, addressRegion: 'Punjab', postalCode: c.postalCode, addressCountry: 'PK' },
    contactPoint: c.contacts.map((p) => ({ '@type': 'ContactPoint', telephone: p.phone, contactType: p.role.en })),
    openingHoursSpecification: c.schemaHours.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes })),
  };
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning className={`${latin.variable} ${urdu.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-sans"><Providers>{children}</Providers></body>
    </html>
  );
}
