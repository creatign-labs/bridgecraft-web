import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import ClientsBar from '@/components/sections/ClientsBar';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { sanityFetch } from '@/lib/sanity';
import { allClientsQuery } from '@/lib/queries';
import { clients as seedClients } from '@/lib/seed-data';
import { heroImages } from '@/lib/placeholder-images';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Our Clients',
  description:
    'BridgeCraft Engineers is trusted by premier government agencies, construction firms, and private sector developers across India.',
};

interface SanityImage {
  asset: unknown;
  alt?: string;
}

export default async function ClientsPage() {
  const sanityClients = await sanityFetch<
    { _id: string; name: string; logo?: SanityImage }[]
  >(allClientsQuery);

  const clients = sanityClients
    ? sanityClients.map((c) => ({
        _id: c._id,
        name: c.name,
        logo: c.logo,
        order: 0,
      }))
    : seedClients;

  return (
    <>
      <PageHero
        title="Our Clients"
        subtitle="Trusted by leading government agencies and private enterprises"
        placeholderSrc={heroImages.clients}
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="mx-auto mb-12 max-w-2xl text-center text-base leading-relaxed text-charcoal/80">
              Over the past decade, BridgeCraft Engineers has built lasting
              relationships with some of India&apos;s most prominent
              infrastructure organisations. Our clients trust us to deliver
              technically rigorous, cost-effective, and safe engineering
              solutions.
            </p>
          </AnimatedSection>

          <ClientsBar clients={clients} />
        </div>
      </section>
    </>
  );
}
