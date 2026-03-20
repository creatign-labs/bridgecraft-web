import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import ClientsBar from '@/components/sections/ClientsBar';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { clients } from '@/lib/seed-data';

// To switch to Sanity:
// import { client as sanityClient } from '@/lib/sanity';
// import { getAllClients } from '@/lib/queries';
// const clients = await getAllClients();

export const metadata: Metadata = {
  title: 'Our Clients',
  description:
    'BridgeCraft Engineers is trusted by premier government agencies, construction firms, and private sector developers across India.',
};

export default function ClientsPage() {
  return (
    <>
      <PageHero
        title="Our Clients"
        subtitle="Trusted by leading government agencies and private enterprises"
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
