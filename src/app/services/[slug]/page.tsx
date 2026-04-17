import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHero from '@/components/layout/PageHero';
import AnimatedSection from '@/components/ui/AnimatedSection';
import CTABanner from '@/components/sections/CTABanner';
import { CheckCircle } from 'lucide-react';
import { sanityFetch } from '@/lib/sanity';
import { serviceBySlugQuery, allServicesQuery } from '@/lib/queries';
import { services as seedServices } from '@/lib/seed-data';

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const sanityServices = await sanityFetch<{ slug: { current: string } }[]>(
    allServicesQuery,
  );

  if (sanityServices) {
    return sanityServices.map((s) => ({ slug: s.slug.current }));
  }

  return seedServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const sanityService = await sanityFetch<{
    title: string;
    shortDescription: string;
  }>(serviceBySlugQuery, { slug });

  if (sanityService) {
    return {
      title: sanityService.title,
      description: sanityService.shortDescription,
    };
  }

  const service = seedServices.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.shortDescription,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;

  const sanityService = await sanityFetch<{
    _id: string;
    title: string;
    slug: { current: string };
    shortDescription: string;
    fullDescription: string;
    heroImage?: { asset: unknown; alt?: string };
    keyCapabilities: string[];
  }>(serviceBySlugQuery, { slug });

  const heroImage = sanityService?.heroImage;
  const service = sanityService
    ? {
        title: sanityService.title,
        shortDescription: sanityService.shortDescription,
        fullDescription: sanityService.fullDescription,
        keyCapabilities: sanityService.keyCapabilities ?? [],
      }
    : seedServices.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <PageHero title={service.title} subtitle={service.shortDescription} image={heroImage} />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Description */}
          <AnimatedSection>
            <div className="mx-auto max-w-3xl">
              <p className="text-base leading-relaxed text-charcoal/85">
                {service.fullDescription}
              </p>
            </div>
          </AnimatedSection>

          {/* Key Capabilities */}
          <div className="mt-16">
            <AnimatedSection>
              <h2 className="text-center font-heading text-2xl font-bold text-charcoal sm:text-3xl">
                Key Capabilities
              </h2>
              <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-primary" />
            </AnimatedSection>

            <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
              {service.keyCapabilities.map((capability, index) => (
                <AnimatedSection key={capability} delay={index * 0.06}>
                  <div className="flex items-start gap-3 rounded-lg bg-off-white p-4">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary-dark" />
                    <span className="text-sm font-medium text-charcoal">
                      {capability}
                    </span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        title="Interested in This Service?"
        subtitle="Get in touch with our team to discuss your project requirements."
        buttonText="Contact Us"
        buttonHref="/contact"
      />
    </>
  );
}
