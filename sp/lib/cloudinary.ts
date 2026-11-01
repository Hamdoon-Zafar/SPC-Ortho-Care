const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'vqdftvhe';

/**
 * Generates an auto-optimized, WebP/AVIF Cloudinary URL.
 * Automatically cleans paths like '/services/db-shoes.png' into Cloudinary public IDs.
 */
export function getCloudinaryUrl(source: string | undefined, width = 800): string {
  if (!source) return '';

  // If already an external link, pass it through
  if (source.startsWith('http://') || source.startsWith('https://')) {
    return source;
  }

  // Extract filename without folder or extension (e.g., '/services/db-shoes.png' -> 'db-shoes')
  const cleanId = source
    .replace(/^\/?(services\/)?/, '')
    .replace(/\.[^/.]+$/, '');

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_${width}/${cleanId}`;
}
