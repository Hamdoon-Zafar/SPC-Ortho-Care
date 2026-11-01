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
