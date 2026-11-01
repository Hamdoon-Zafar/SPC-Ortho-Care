'use client';
import { useState } from 'react';
import { ChevronDown, ImageIcon } from 'lucide-react';
import { useApp } from './Providers';
import { ui } from '@/lib/ui';
import type { Img, Service } from '@/content/clinic';

/** Photo slot: shows the image, or a neutral placeholder until one is added in the admin. */
function Photo({ img, alt, label, className, sizes }: { img?: Img; alt: string; label?: string; className: string; sizes?: string }) {
  return (
    <div className={`relative overflow-hidden bg-brand-mist dark:bg-ink-soft ${className}`}>
      {img ? (
        <img src={img.src} srcSet={img.srcSet} sizes={sizes} alt={alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-brand/60 dark:text-brand-mist/60">
          <ImageIcon size={label ? 32 : 20} aria-hidden />{label && <span className="text-xs">{label}</span>}
        </div>
      )}
    </div>
  );
}

/** Accessible accordion: headings only by default, one panel open at a time. Big photos load only once a panel is opened. */
export default function Services({ services }: { services: Service[] }) {
  const { t } = useApp();
  const [open, setOpen] = useState<string | null>(null);
  const [seen, setSeen] = useState<Record<string, true>>({});
  return (
    <section id="services" className="bg-brand-mist/50 py-16 dark:bg-ink-soft/40">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-brand-dark dark:text-white">{t(ui.services)}</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{t(ui.servicesSub)}</p>
        <ul className="mt-8 grid items-start gap-3 md:grid-cols-2">
          {services.map((s, i) => {
            const isOpen = open === s.id;
            return (
              <li key={s.id} className="rounded-xl border border-brand/15 bg-white shadow-sm dark:border-white/10 dark:bg-ink">
                <h3>
                  <button id={`h-${s.id}`} aria-expanded={isOpen} aria-controls={`p-${s.id}`}
                    onClick={() => { setSeen((p) => ({ ...p, [s.id]: true })); setOpen(isOpen ? null : s.id); }}
                    className="flex w-full items-center justify-between gap-3 px-4 py-4 text-start font-semibold text-brand-dark dark:text-white">
                    <span className="flex items-center gap-3">
                      <Photo img={s.thumb ? { src: s.thumb } : undefined} alt="" className="h-12 w-12 shrink-0 rounded-lg" />
                      <span><span className="me-2 text-brand-sky">{i + 1}.</span>{t(s.name)}</span>
                    </span>
                    <ChevronDown className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} size={20} />
                  </button>
                </h3>
                <div id={`p-${s.id}`} role="region" aria-labelledby={`h-${s.id}`}
                  className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <div className="px-4 pb-4">
                      {seen[s.id] && (
                        <Photo img={s.image} alt={t(s.name)} label={t(ui.imgSoon)} sizes="(min-width:768px) 560px, calc(100vw - 64px)" className="mb-3 aspect-[16/9] w-full rounded-lg" />
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
