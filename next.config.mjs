import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Hostinger (no Node server at runtime): every route is
  // prerendered to HTML at `next build` time. See AGENTS.md and
  // node_modules/next/dist/docs/01-app/02-guides/static-exports.md for what
  // this disables (proxy/middleware, Server Actions, cookies()).
  output: 'export',
  // Folder-per-route output (`/about/index.html`) — the form shared static
  // hosts like Hostinger serve correctly without custom rewrite rules.
  trailingSlash: true,
  images: {
    // No Node server to run the optimizer; the site already serves
    // CMS/Storage images as plain <img> rather than next/image for exactly
    // this reason, so this only affects the few static /public images.
    unoptimized: true,
  },
  devIndicators: {
    position: 'bottom-right',
  },
  poweredByHeader: false,
  compress: true,
};

export default withNextIntl(nextConfig);