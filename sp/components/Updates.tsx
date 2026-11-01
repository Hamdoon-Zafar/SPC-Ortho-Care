'use client';
import { PortableText } from '@portabletext/react';
import { useApp } from './Providers';
import { ui } from '@/lib/ui';
import type { Post } from '@/lib/content';

/** Latest announcements from Sanity. Renders nothing while there are no posts, so the page is unchanged until you publish one. */
export default function Updates({ posts }: { posts: Post[] }) {
  const { t, lang } = useApp();
  if (!posts.length) return null;
  return (
    <section id="updates" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-brand-dark dark:text-white">{t(ui.updates)}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <article key={p.id} className="overflow-hidden rounded-2xl border border-brand/15 dark:border-white/10 dark:bg-ink-soft/40">
              {p.image && <div className="relative aspect-[16/9]"><img src={p.image.src} srcSet={p.image.srcSet} sizes="(min-width:768px) 360px, 100vw" alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" /></div>}
              <div className="p-5">
                <time dateTime={p.date} className="text-sm text-slate-600 dark:text-slate-400">
                  {new Date(p.date).toLocaleDateString(lang === 'ur' ? 'ur-PK' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </time>
                <h3 className="mt-1 text-xl font-semibold text-brand-dark dark:text-white" dir="auto">{p.title}</h3>
                <div className="mt-3 space-y-3 text-slate-700 dark:text-slate-300" dir="auto">
                  <PortableText value={p.content} components={{
                    block: { h2: ({ children }) => <h4 className="text-lg font-semibold">{children}</h4>, h3: ({ children }) => <h5 className="font-semibold">{children}</h5> },
                    list: { bullet: ({ children }) => <ul className="list-disc ps-5">{children}</ul>, number: ({ children }) => <ol className="list-decimal ps-5">{children}</ol> },
                    marks: { link: ({ value, children }) => <a href={value?.href} className="text-brand underline dark:text-brand-sky" target="_blank" rel="noopener noreferrer">{children}</a> },
                  }} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
