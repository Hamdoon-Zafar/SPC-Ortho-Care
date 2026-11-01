'use client';
import { useEffect, useState } from 'react';
import { ArrowUp, Phone } from 'lucide-react';
import { useApp } from './Providers';
import { ui } from '@/lib/ui';

export default function FloatingActions() {
  const { t } = useApp();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 400);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <div className="fixed bottom-4 end-4 z-40 flex flex-col items-end gap-3">
      {show && (
        <button aria-label={t(ui.top)} onClick={() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand shadow-lg ring-1 ring-brand/20 dark:bg-ink-soft dark:text-brand-mist">
          <ArrowUp />
        </button>
      )}
      <a href="#contact" className="flex items-center gap-2 rounded-full bg-brand px-5 py-3 font-semibold text-white shadow-lg dark:bg-brand-sun dark:text-ink">
        <Phone size={18} />{t(ui.contactUs)}
      </a>
    </div>
  );
}
