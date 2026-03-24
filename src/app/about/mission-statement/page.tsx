import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { sanityFetch } from '@/lib/sanity';
import { missionStatementQuery } from '@/lib/queries';
import { companyInfo } from '@/lib/seed-data';
import { heroImages } from '@/lib/placeholder-images';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Mission Statement',
  description:
    'Our mission is to provide world-class civil and structural engineering solutions that are safe, sustainable, and value-driven.',
};

export default async function MissionStatementPage() {
  const data = await sanityFetch<{ heroImage?: { asset: unknown; alt?: string }; content: string }>(missionStatementQuery);

  const missionStatement = data?.content ?? companyInfo.missionStatement;

  return (
    <>
      <PageHero
        title="Mission Statement"
        subtitle="Our purpose and commitment to the built environment"
        image={data?.heroImage}
        placeholderSrc={!data?.heroImage ? heroImages['about-mission'] : undefined}
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mx-auto mb-8 h-1 w-16 rounded-full bg-primary" />
            <blockquote className="font-heading text-2xl font-medium leading-relaxed text-charcoal sm:text-3xl">
              &ldquo;{missionStatement}&rdquo;
            </blockquote>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="mt-12 space-y-6 text-left">
              <p className="text-base leading-relaxed text-charcoal/80">
                At BridgeCraft Engineers, our mission is the foundation upon which
                every project is built. We believe that engineering is not merely
                about calculations and drawings — it is about creating
                infrastructure that improves lives, strengthens communities, and
                respects the environment.
              </p>
              <p className="text-base leading-relaxed text-charcoal/80">
                Every bridge we design, every building we analyse, and every
                highway we plan is guided by this mission. We measure our success
                not just in technical achievements, but in the lasting positive
                impact our work has on the people and places we serve.
              </p>
              <p className="text-base leading-relaxed text-charcoal/80">
                We are committed to advancing the state of practice in civil and
                structural engineering through continuous research, adoption of
                emerging technologies, and active engagement with professional
                bodies and academic institutions.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
