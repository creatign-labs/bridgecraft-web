import type { MetadataRoute } from 'next';

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bridgecraft.in';
const BASE_URL = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio/', '/api/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
