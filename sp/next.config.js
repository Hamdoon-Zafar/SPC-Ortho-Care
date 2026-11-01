/** Static export = pure SSG. Hosting: Cloudflare Pages / Netlify / any static host.
 *  trailingSlash makes /admin build to admin/index.html so the Studio can be served by a single rewrite (public/_redirects). */
module.exports = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true, remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }] },
};
