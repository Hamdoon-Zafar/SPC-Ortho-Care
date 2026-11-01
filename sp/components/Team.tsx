 'use client';

import Image from 'next/image';

import { User } from 'lucide-react';

import { useApp } from './Providers';

import { ui } from '@/lib/ui';

import type { Doctor } from '@/content/clinic';

import { optimizeImageUrl } from '@/sanity/lib/image';


/** Featured profile: photo on the start side, introduction on the other (mirrors in RTL, stacks on mobile). */

export default function Team({ team }: { team: Doctor[] }) {

  const { t } = useApp();


  return (

    <section id="team" className="py-16">

      <div className="mx-auto max-w-6xl px-4">

        <h2 className="text-3xl font-bold text-brand-dark dark:text-white">{t(ui.team)}</h2>

        <p className="mt-2 text-slate-600 dark:text-slate-300">{t(ui.teamSub)}</p>

        <div className="mt-8 space-y-6">

          {team.map((m) => {

            // Optimizes the 2MB portrait down to ~40KB WebP

            const doctorPhoto = optimizeImageUrl(m.photo, 640, 800) ?? m.photo;


            return (

              <article key={m.id} className="flex flex-col overflow-hidden rounded-2xl border border-brand/15 shadow-sm dark:border-white/10 dark:bg-ink-soft/40 md:flex-row">

                <div className="relative aspect-[4/5] w-full shrink-0 bg-brand-mist dark:bg-ink-soft md:w-80">

                  {doctorPhoto ? (

                    <Image

                      src={doctorPhoto}

                      alt={t(m.name)}

                      fill

                      sizes="(min-width:768px) 320px, 100vw"

                      className="object-cover"

                      priority

                    />

                  ) : (

                    <div className="flex h-full w-full items-center justify-center text-brand/50 dark:text-brand-mist/50">

                      <User size={96} aria-hidden />

                    </div>

                  )}

                </div>

                <div className="flex flex-col justify-center p-6 md:p-10">

                  <p className="text-sm font-semibold uppercase tracking-wide text-brand-sky">{t(m.title)}</p>

                  <h3 className="mt-1 text-2xl font-bold text-brand-dark dark:text-white md:text-3xl">{t(m.name)}</h3>

                  <p className="mt-1 text-lg font-medium text-brand dark:text-brand-mist">{t(m.role)}</p>

                  {m.qualifications && <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{t(m.qualifications)}</p>}

                  <p className="mt-4 text-slate-700 dark:text-slate-300">{t(m.bio)}</p>

                  <ul className="mt-5 flex flex-wrap gap-2">

                    {m.tags.map((g) => (

                      <li key={g.en} className="rounded-full bg-brand-mist px-3 py-1 text-sm font-medium text-brand-dark dark:bg-ink dark:text-brand-mist">

                        {t(g)}

                      </li>

                    ))}

                  </ul>

                </div>

              </article>

            );

          })}

        </div>

      </div>

    </section>

  );

} 