'use client';
import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react';
import type { Lang } from '@/lib/ui';
import type { Bi } from '@/content/clinic';

type Ctx = { lang: Lang; toggleLang: () => void; dark: boolean; toggleDark: () => void; t: (b: Bi) => string };
const AppCtx = createContext<Ctx>(null as unknown as Ctx);
export const useApp = () => useContext(AppCtx);

/** Holds language + theme. The inline script in layout.tsx applies them before paint (no flash). */
export default function Providers({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setLang(document.documentElement.lang === 'ur' ? 'ur' : 'en');
    setDark(document.documentElement.classList.contains('dark'));
  }, []);
  const toggleLang = useCallback(() => {
    const next: Lang = lang === 'en' ? 'ur' : 'en';
    setLang(next);
    document.documentElement.lang = next;
    document.documentElement.dir = next === 'ur' ? 'rtl' : 'ltr'; // flips the entire layout
    localStorage.setItem('lang', next);
  }, [lang]);
  const toggleDark = useCallback(() => {
    const next = !dark; setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }, [dark]);
  return <AppCtx.Provider value={{ lang, toggleLang, dark, toggleDark, t: (b) => b[lang] }}>{children}</AppCtx.Provider>;
}
