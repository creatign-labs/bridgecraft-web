import PageHero from '@/components/layout/PageHero';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { sanityFetch } from '@/lib/sanity';
import { corporateStrategyQuery } from '@/lib/queries';
import { strategyPillars as seedPillars } from '@/lib/seed-data';
import CorporateStrategyClient from './CorporateStrategyClient';

export const revalidate = 60;

export default async function CorporateStrategyPage() {
  const data = await sanityFetch<{
    pillars: { title: string; description: string; bulletPoints?: string[] }[];
  }>(corporateStrategyQuery);

  const pillars = data?.pillars
    ? data.pillars.map((p) => ({
        title: p.title,
        summary: p.description,
        details: p.bulletPoints?.join('. ') ?? p.description,
      }))
    : seedPillars;

  return (
    <>
      <PageHero
        title="Corporate Strategy"
        subtitle="Four pillars that guide our growth and delivery"
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="mb-10 text-base leading-relaxed text-charcoal/80">
              Our corporate strategy is built on four interconnected pillars that
              drive sustainable growth while maintaining the technical excellence
              and client focus that define BridgeCraft Engineers.
            </p>
          </AnimatedSection>

          <CorporateStrategyClient pillars={pillars} />
        </div>
      </section>
    </>
  );
}
