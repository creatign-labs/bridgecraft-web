import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { companyInfo } from '@/lib/seed-data';

// To switch to Sanity:
// import { client } from '@/lib/sanity';
// import { getAboutIntroduction } from '@/lib/queries';
// const data = await getAboutIntroduction();

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about BridgeCraft Engineers & Consultants — our history, expertise, and commitment to engineering excellence.',
};

export default function AboutIntroductionPage() {
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
              {companyInfo.aboutText.split('\n\n').map((paragraph, i) => (
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
