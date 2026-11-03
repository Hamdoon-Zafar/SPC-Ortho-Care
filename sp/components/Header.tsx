'use client';
import { Moon, Sun } from 'lucide-react';
import { useApp } from './Providers';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { ui } from '@/lib/ui';

const NAV = [['home', ui.home], ['services', ui.services], ['team', ui.team], ['contact', ui.contact]] as const;
const IDS = NAV.map(([id]) => id);

export default function Header({ name }: { name: string }) {
  const { t, lang, toggleLang, dark, toggleDark } = useApp();
  const active = useScrollSpy(IDS);
  const btn = 'inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-brand/30 px-3 text-sm font-semibold text-brand hover:bg-brand-mist dark:border-brand-mist/30 dark:text-brand-mist dark:hover:bg-ink-soft';

  return (
    <header className="sticky top-0 z-50 border-b border-brand/10 bg-white dark:border-white/10 dark:bg-ink">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 px-4 py-2">
        {/* Brand logo & title */}
        <a href="#home" className="flex max-w-[65%] items-center gap-2.5 sm:max-w-none">
          <img
            src="/logo-80.webp"
            srcSet="/logo-80.webp 80w, /logo-120.webp 120w"
            sizes="40px"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 shrink-0"
          />
          <span className="text-base font-extrabold leading-tight tracking-tight text-brand-dark dark:text-white sm:text-lg md:text-xl">
            {name}
          </span>
        </a>

        {/* Nav: centre on desktop, second row on mobile */}
        <nav aria-label="Primary" className="order-3 flex w-full justify-center gap-1 pt-2 md:order-none md:w-auto md:pt-0">
          {NAV.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? 'true' : undefined}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                active === id
                  ? 'bg-brand text-white dark:bg-brand-sun dark:text-ink'
                  : 'text-slate-700 hover:bg-brand-mist dark:text-slate-300 dark:hover:bg-ink-soft'
              }`}
            >
              {t(label)}
            </a>
          ))}
        </nav>

        {/* Action toggles (Lang & Dark/Light mode) */}
        <div className="flex shrink-0 items-center gap-2">
          <button onClick={toggleLang} className={btn} lang={lang === 'en' ? 'ur' : 'en'}>
            {t(ui.switchTo)}
          </button>
          <button onClick={toggleDark} className={btn} aria-label={t(ui.theme)} aria-pressed={dark}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}