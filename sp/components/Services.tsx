'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ImageIcon } from 'lucide-react';
import { useApp } from './Providers';
import { ui } from '@/lib/ui';
import type { Service } from '@/content/clinic';
import { optimizeImageUrl } from '@/sanity/lib/image';

/** Accessible accordion: headings only by default, one panel open at a time. */
/** Image slot: shows the service photo, or a neutral placeholder until one is added. */
function Photo({ src, alt, label, className }: { src?: string; alt: string; label?: string; className: string }) {
  return (
    <div className={`relative overflow-hidden bg-brand-mist dark:bg-ink-soft ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width:768px) 40vw, 90vw"
          className="object-cover"
          loading="lazy"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-brand/60 dark:text-brand-mist/60">
          <ImageIcon size={label ? 32 : 20} aria-hidden />
          {label && <span className="text-xs">{label}</span>}
        </div>
      )}
    </div>
  );
}

export default function Services({ services }: { services: Service[] }) {
  const { t } = useApp();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="services" className="bg-brand-mist/50 py-16 dark:bg-ink-soft/40">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-brand-dark dark:text-white">{t(ui.services)}</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{t(ui.servicesSub)}</p>
        <ul className="mt-8 grid items-start gap-3 md:grid-cols-2">
          {services.map((s, i) => {
            const isOpen = open === s.id;
            // Generates a tiny ~3KB thumbnail for the button icon
            const thumbUrl = optimizeImageUrl(s.thumb ?? s.image, 96, 96);
            // Generates an optimized ~35KB banner for when opened
            const expandedUrl = optimizeImageUrl(s.image, 800, 450);

            return (
              <li key={s.id} className="rounded-xl border border-brand/15 bg-white shadow-sm dark:border-white/10 dark:bg-ink">
                <h3>
                  <button
                    id={`h-${s.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`p-${s.id}`}
                    onClick={() => setOpen(isOpen ? null : s.id)}
                    className="flex w-full items-center justify-between gap-3 px-4 py-4 text-start font-semibold text-brand-dark dark:text-white"
                  >
                    <span className="flex items-center gap-3">
                      <Photo src={thumbUrl} alt="" className="h-12 w-12 shrink-0 rounded-lg" />
                      <span>
                        <span className="me-2 text-brand-sky">{i + 1}.</span>
                        {t(s.name)}
                      </span>
                    </span>
                    <ChevronDown className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} size={20} />
                  </button>
                </h3>
                <div
                  id={`p-${s.id}`}
                  role="region"
                  aria-labelledby={`h-${s.id}`}
                  className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-4">
                      {/* CRITICAL FIX: Only mount image in DOM when open, preventing 17 unneeded downloads */}
                      {isOpen && (
                        <Photo
                          src={expandedUrl}
                          alt={t(s.name)}
                          label={t(ui.imgSoon)}
                          className="mb-3 aspect-[16/9] w-full rounded-lg"
                        />
                      )}
                      <p className="text-slate-700 dark:text-slate-300">{t(s.desc)}</p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}