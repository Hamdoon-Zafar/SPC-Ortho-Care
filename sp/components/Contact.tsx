'use client';
import { useState } from 'react';
import { MessageCircle, Phone, Home } from 'lucide-react';
import { useApp } from './Providers';
import { ui } from '@/lib/ui';
import type { Clinic } from '@/content/clinic';

export default function Contact({ clinic }: { clinic: Clinic }) {
  const { t, lang } = useApp();
  const [msg, setMsg] = useState('');
  // wa.me deep link: the typed message, or the default greeting in the current language
  const wa = `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(msg.trim() || ui.waMsg[lang])}`;
  const card = 'rounded-2xl border border-brand/15 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-ink-soft/40';
  return (
    <section id="contact" className="bg-brand-mist/50 py-16 dark:bg-ink-soft/40">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-brand-dark dark:text-white">{t(ui.contact)}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className={card}>
            <h3 className="mb-3 text-lg font-semibold text-brand-dark dark:text-white">{t(ui.call)}</h3>
            <ul className="space-y-3">
              {clinic.contacts.map((c) => (
                <li key={c.phone}>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{t(c.name)} · {t(c.role)}</p>
                  <a href={`tel:${c.phone}`} className="inline-flex items-center gap-2 font-semibold text-brand hover:underline dark:text-brand-sky">
                    <Phone size={18} /><bdi dir="ltr">{c.display}</bdi>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className={`${card} flex flex-col`}>
            <h3 className="mb-3 text-lg font-semibold text-brand-dark dark:text-white">{t(ui.message)}</h3>
            <label htmlFor="wa-msg" className="sr-only">{t(ui.msgPlaceholder)}</label>
            <textarea id="wa-msg" rows={4} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder={t(ui.msgPlaceholder)}
              className="w-full resize-none rounded-xl border border-brand/25 bg-white p-3 text-slate-800 placeholder:text-slate-500 focus:border-brand-sky dark:border-white/20 dark:bg-ink dark:text-slate-100 dark:placeholder:text-slate-400" />
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">{t(ui.msgHint)}</p>
            <a href={wa} target="_blank" rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#1B7F46] px-5 py-3 font-semibold text-white hover:brightness-110">
              <MessageCircle size={20} />{t(ui.whatsapp)}
            </a>
          </div>
          <div className={card}>
            <h3 className="mb-3 text-lg font-semibold text-brand-dark dark:text-white">{t(ui.schedule)}</h3>
            <table className="w-full text-sm">
              <tbody>
                {clinic.hours.map((h) => (
                  <tr key={h.day.en} className="border-b border-brand/10 last:border-0 dark:border-white/10">
                    <th scope="row" className="py-1.5 text-start font-medium">{t(h.day)}</th>
                    <td className="whitespace-pre-line py-1.5 text-end">{t(h.open)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-xs text-slate-600 dark:text-slate-400">{t(ui.jummah)}</p>
            <p className="mt-3 flex items-start gap-2 rounded-lg bg-brand-mist p-3 text-sm font-medium text-brand-dark dark:bg-ink dark:text-brand-mist">
              <Home size={18} className="mt-0.5 shrink-0" aria-hidden />{t(clinic.homeService)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
