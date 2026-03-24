import type { Metadata } from 'next';
import Image from 'next/image';
import PageHero from '@/components/layout/PageHero';
import AnimatedSection from '@/components/ui/AnimatedSection';
import {
  Route,
  Landmark,
  Sun,
  Train,
  GraduationCap,
  Building2,
  Factory,
} from 'lucide-react';
import { sanityFetch, urlFor, isSanityConfigured } from '@/lib/sanity';
import { allSectorsQuery } from '@/lib/queries';
import { sectors as seedSectors } from '@/lib/seed-data';
import { heroImages } from '@/lib/placeholder-images';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Sectors We Serve',
  description:
    'BridgeCraft Engineers works across infrastructure, government, renewable energy, railways, institutional, commercial, and industrial sectors.',
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Route,
  Landmark,
  Sun,
  Zap: Sun,
  Train,
  GraduationCap,
  Building2,
  Factory,
};

interface SanityImage {
  asset: unknown;
  alt?: string;
}

export default async function SectorsPage() {
  const sanitySectors = await sanityFetch<
    {
      _id: string;
      name: string;
      slug: { current: string };
      description: string;
      image?: SanityImage;
      icon: string;
    }[]
  >(allSectorsQuery);

  const sectors = sanitySectors
    ? sanitySectors.map((s) => ({
        name: s.name,
        slug: s.slug?.current ?? s.name.toLowerCase().replace(/\s+/g, '-'),
        description: s.description,
        image: s.image,
        icon: s.icon,
      }))
    : seedSectors.map((s) => ({
        ...s,
        image: undefined as SanityImage | undefined,
      }));

  return (
    <>
      <PageHero
        title="Sectors We Serve"
        subtitle="Delivering engineering excellence across diverse industries"
        placeholderSrc={heroImages.sectors}
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sectors.map((sector, index) => {
              const Icon = iconMap[sector.icon] || Building2;
              const hasImage = sector.image?.asset && isSanityConfigured;

              return (
                <AnimatedSection key={sector.slug} delay={index * 0.08}>
                  <div className="group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    {/* Image or gradient fallback */}
                    <div className="relative h-40 w-full overflow-hidden">
                      {hasImage ? (
                        <Image
                          src={urlFor(sector.image!).width(600).height(400).fit('crop').url()}
                          alt={sector.image!.alt || `${sector.name} - Bridge Craft Engineers`}
                          width={600}
                          height={400}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                          <Icon className="h-12 w-12 text-primary-dark/40" />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col items-center p-6 text-center">
                      <h3 className="font-heading text-lg font-semibold text-charcoal">
                        {sector.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                        {sector.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
