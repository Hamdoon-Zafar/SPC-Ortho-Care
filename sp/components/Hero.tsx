'use client';
import Image from 'next/image';
import { useApp } from './Providers';
import { ui } from '@/lib/ui';

export default function Hero() {
  const { t } = useApp();
  return (
    <section id="home" className="bg-gradient-to-br from-brand-dark to-brand text-white dark:from-ink dark:to-brand-dark">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 md:grid-cols-2 md:py-24">
        <div>
          <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">{t(ui.heroTitle)}</h1>
          <p className="mt-4 max-w-xl text-lg text-white/90">{t(ui.heroSub)}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="rounded-full bg-brand-sun px-6 py-3 font-semibold text-ink shadow hover:brightness-95">{t(ui.heroCta)}</a>
            <a href="#services" className="rounded-full border border-white/60 px-6 py-3 font-semibold hover:bg-white/10">{t(ui.heroCta2)}</a>
          </div>
        </div>
        <Image src="/logo.png" alt="South Punjab Ortho Care Center logo" width={320} height={320}
          className="mx-auto h-52 w-52 drop-shadow-2xl md:h-80 md:w-80" priority />
      </div>
    </section>
  );
}
