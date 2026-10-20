import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    position: 'bottom-right',
  },
  poweredByHeader: false,
  compress: true,
  images: {
    // CMS-uploaded images (logo, hero background, credit logo) live on
    // Supabase Storage — without this they fall back to a plain <img>,
    // skipping Next's resizing/WebP/lazy-loading.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ruvobfdiqkowlzxxmhrp.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);