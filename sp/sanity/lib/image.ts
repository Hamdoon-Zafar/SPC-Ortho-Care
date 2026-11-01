import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { dataset, projectId } from '../env';

const builder = imageUrlBuilder({ projectId: projectId || 'missing-project-id', dataset });

/**
 * Base builder. `.auto('format')` makes Sanity's CDN serve WebP/AVIF to browsers that support it,
 * `.quality(80)` keeps files small. Using width+height with fit('crop') respects the editor's hotspot/crop.
 */
export const urlFor = (source: SanityImageSource) => builder.image(source).auto('format').quality(80);

/** Ready-made sizes used by the site. Returns undefined when no image has been uploaded. */
export const imageUrl = (source: SanityImageSource | undefined, w: number, h?: number) => {
  if (!source) return undefined;
  const b = urlFor(source).width(w);
  return (h ? b.height(h).fit('crop') : b).url();
};

/**
 * Transforms any Sanity image source or CDN URL into a lightweight, resized WebP/AVIF asset.
 * If given a local fallback string (e.g. /services/db-shoes.png), it safely passes it through.
 */
export const optimizeImageUrl = (
  source: SanityImageSource | string | undefined,
  w?: number,
  h?: number,
  q = 75
): string | undefined => {
  if (!source) return undefined;
  try {
    if (typeof source === 'object' || (typeof source === 'string' && source.includes('cdn.sanity.io'))) {
      let b = builder.image(source).auto('format').quality(q);
      if (w) b = b.width(w);
      if (h) b = b.height(h).fit('crop');
      return b.url();
    }
  } catch {
    // If URL parsing fails, return raw string
  }
  return typeof source === 'string' ? source : undefined;
};