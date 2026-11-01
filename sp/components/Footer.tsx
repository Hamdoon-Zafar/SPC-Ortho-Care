'use client';
import { MapPin, Navigation, Facebook } from 'lucide-react';
import { useApp } from './Providers';
import { ui } from '@/lib/ui';
import type { Clinic } from '@/content/clinic';

export default function Footer({ clinic }: { clinic: Clinic }) {
  const { t } = useApp();
  const q = encodeURIComponent(clinic.mapQuery);
  const openUrl = clinic.mapsUrl ?? `https://www.google.com/maps/search/?api=1&query=${q}`;
  const dirUrl = `https://www.google.com/maps/dir/?api=1&destination=${q}`;
  const embed = clinic.mapEmbedSrc ?? `https://www.google.com/maps?q=${q}&output=embed`;
  const btn = 'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold';
  return (
    <footer className="bg-brand-dark text-white dark:bg-ink-soft">
      <div className="relative">
        <iframe title="Clinic location" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={embed} className="h-64 w-full border-0 md:h-80" />
        <a href={openUrl} target="_blank" rel="noopener noreferrer" aria-label={t(ui.openMap)} className="absolute inset-0 z-10" />
      </div>
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 pb-32 text-sm md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <address className="not-italic">{t(clinic.address)}</address>
          <p className="text-white/80">© {new Date().getFullYear()} {clinic.name}. {t(ui.rights)}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={openUrl} target="_blank" rel="noopener noreferrer" className={`${btn} bg-white text-brand-dark`}><MapPin size={16} aria-hidden />{t(ui.openMap)}</a>
          <a href={dirUrl} target="_blank" rel="noopener noreferrer" className={`${btn} border border-white/60 hover:bg-white/10`}><Navigation size={16} aria-hidden />{t(ui.directions)}</a>
                    {clinic.social?.facebook && (
            <a href={clinic.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/60 hover:bg-white/10">
              <Facebook size={18} aria-hidden />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}