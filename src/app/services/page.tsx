import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/layout/PageHero';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { ArrowRight, ClipboardCheck, Building2, Layers, Radio } from 'lucide-react';
import { sanityFetch, urlFor, isSanityConfigured } from '@/lib/sanity';
import { allServicesQuery } from '@/lib/queries';
import { services as seedServices } from '@/lib/seed-data';
import { heroImages } from '@/lib/placeholder-images';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'BridgeCraft Engineers offers structural engineering, bridge engineering, transportation engineering, and project management consultancy services.',
};

const fallbackIcons = [ClipboardCheck, Building2, Layers, Radio];

const serviceImageMap: Record<string, string> = {
  'structural-engineering': '/images/service-structural.jpg',
  'bridge-engineering': '/images/service-geotechnical.jpg',
  'transportation-engineering': '/images/service-preconstruction.jpg',
  'project-management-consultancy': '/images/service-geophysical.jpg',
};

interface SanityImage {
  asset: unknown;
  alt?: string;
}

export default async function ServicesPage() {
  const sanityServices = await sanityFetch<
    {
      _id: string;
      title: string;
      slug: { current: string };
      shortDescription: string;
      cardImage?: SanityImage;
    }[]
  >(allServicesQuery);

  const services = sanityServices
    ? sanityServices.map((s) => ({
        title: s.title,
        slug: s.slug.current,
        shortDescription: s.shortDescription,
        cardImage: s.cardImage,
        placeholderSrc: undefined as string | undefined,
      }))
    : seedServices.map((s) => ({
        title: s.title,
        slug: s.slug,
        shortDescription: s.shortDescription,
        cardImage: undefined as SanityImage | undefined,
        placeholderSrc: serviceImageMap[s.slug],
      }));

  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="Comprehensive engineering solutions across four core disciplines"
        placeholderSrc={heroImages.services}
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {services.map((service, index) => {
              const FallbackIcon = fallbackIcons[index % fallbackIcons.length];
              const hasImage = service.cardImage?.asset && isSanityConfigured;

              return (
                <AnimatedSection key={service.slug} delay={index * 0.1}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow transition-shadow duration-300 hover:shadow-lg"
                  >
                    {/* Card image */}
                    <div className="relative h-48 w-full overflow-hidden">
                      {hasImage ? (
                        <Image
                          src={urlFor(service.cardImage!).width(600).height(400).fit('crop').url()}
                          alt={service.cardImage!.alt || `${service.title} - Bridge Craft Engineers`}
                          width={600}
                          height={400}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : service.placeholderSrc ? (
                        <Image
                          src={service.placeholderSrc}
                          alt={`${service.title} - Bridge Craft Engineers`}
                          width={600}
                          height={400}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#F8F9FA] to-white">
                          <FallbackIcon className="h-16 w-16 text-primary-dark/30" />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-8">
                      <h2 className="font-heading text-xl font-bold text-charcoal group-hover:text-primary-dark">
                        {service.title}
                      </h2>

                      <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal/70">
                        {service.shortDescription}
                      </p>

                      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary-dark transition-colors group-hover:text-accent-coral">
                        Learn More
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
