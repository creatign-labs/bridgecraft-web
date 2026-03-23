import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { sanityFetch, urlFor, isSanityConfigured } from '@/lib/sanity';
import { siteSettingsQuery } from '@/lib/queries';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'BridgeCraft Engineers & Consultants',
    template: '%s | BridgeCraft Engineers',
  },
  description:
    'BridgeCraft Engineers & Consultants is a multidisciplinary civil and structural engineering consultancy specialising in bridge design, structural engineering, transportation engineering, and project management consultancy.',
  metadataBase: new URL(
    (() => {
      const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://bridgecraft.in';
      return url.startsWith('http') ? url : `https://${url}`;
    })(),
  ),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'BridgeCraft Engineers & Consultants',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'BridgeCraft Engineers & Consultants',
  url: 'https://bridgecraft.in',
  description:
    'Multidisciplinary civil and structural engineering consultancy specialising in bridge design, structural engineering, transportation engineering, and project management.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '4th Floor, Meridian Tower, HITEC City',
    addressLocality: 'Hyderabad',
    addressRegion: 'Telangana',
    postalCode: '500081',
    addressCountry: 'IN',
  },
  telephone: '+914023123456',
  email: 'info@bridgecraft.in',
  sameAs: [],
};

interface SiteSettings {
  siteTitle?: string;
  logo?: { asset: { _ref: string } };
  tagline?: string;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let logoUrl: string | null = null;
  if (isSanityConfigured) {
    const settings = await sanityFetch<SiteSettings>(siteSettingsQuery);
    if (settings?.logo) {
      try {
        logoUrl = urlFor(settings.logo).width(320).url();
      } catch {
        // Logo not available, fall back to text
      }
    }
  }
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-body text-charcoal bg-white">
        <Header logoUrl={logoUrl} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
