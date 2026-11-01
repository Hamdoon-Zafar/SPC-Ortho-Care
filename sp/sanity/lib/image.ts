import imageUrlBuilder from '@sanity/image-url';
import type { Img } from '../../content/clinic';
import { dataset, projectId } from '../env';

const builder = imageUrlBuilder({ projectId: projectId || 'missing-project-id', dataset });

// Sanity's CDN resizes on the fly. auto('format') => WebP/AVIF where supported; fit('crop') honours the editor's hotspot.
const url = (source: any, w: number, h?: number) => {
  const b = builder.image(source).width(w).auto('format').quality(72);
  return (h ? b.height(h).fit('crop') : b).url();
};

/** Same crop at several widths, so a phone downloads ~480px and a desktop ~1120px. `ratio` = height / width. */
export function imgSet(source: any, widths: number[], ratio: number): Img | undefined {
  if (!source?.asset) return undefined;
  const at = (w: number) => url(source, w, Math.round(w * ratio));
  return { src: at(widths[Math.floor(widths.length / 2)]), srcSet: widths.map((w) => `${at(w)} ${w}w`).join(', ') };
}

/** Small square thumbnail (service list icons). */
export const thumbUrl = (source: any): string | undefined => (source?.asset ? url(source, 112, 112) : undefined);
