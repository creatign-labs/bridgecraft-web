import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/layout/PageHero';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { services } from '@/lib/seed-data';

// To switch to Sanity:
// import { client } from '@/lib/sanity';
// import { getAllServices } from '@/lib/queries';
// const services = await getAllServices();

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'BridgeCraft Engineers offers structural engineering, bridge engineering, transportation engineering, and project management consultancy services.',
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="Comprehensive engineering solutions across four core disciplines"
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {services.map((service, index) => (
              <AnimatedSection key={service.slug} delay={index * 0.1}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col rounded-lg bg-white p-8 shadow transition-shadow duration-300 hover:shadow-lg"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <span className="font-heading text-xl font-bold text-primary-dark">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h2 className="mt-5 font-heading text-xl font-bold text-charcoal group-hover:text-primary-dark">
                    {service.title}
                  </h2>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal/70">
                    {service.shortDescription}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary-dark transition-colors group-hover:text-accent-coral">
                    Learn More
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
