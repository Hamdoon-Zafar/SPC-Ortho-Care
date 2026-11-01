/** Static export (SSG). trailingSlash builds /admin to admin/index.html so one rewrite (public/_redirects) can serve the Studio. */
module.exports = { output: 'export', trailingSlash: true, images: { unoptimized: true } };
