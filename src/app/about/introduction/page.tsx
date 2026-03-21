import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { sanityFetch } from '@/lib/sanity';
import { aboutIntroductionQuery } from '@/lib/queries';
import { companyInfo } from '@/lib/seed-data';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about BridgeCraft Engineers & Consultants — our history, expertise, and commitment to engineering excellence.',
};

export default async function AboutIntroductionPage() {
  const data = await sanityFetch<{ content: unknown; image: unknown }>(
    aboutIntroductionQuery,
  );

  const aboutText = data
    ? String(data.content ?? companyInfo.aboutText)
    : companyInfo.aboutText;

  return (
    <>
      <PageHero
        title="About Us"
        subtitle="Engineering excellence rooted in integrity and innovation"
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="prose prose-lg max-w-none">
              {aboutText.split('\n\n').map((paragraph, i) => (
                <p
                  key={i}
                  className="mb-6 text-base leading-relaxed text-charcoal/85"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
