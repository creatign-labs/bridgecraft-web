import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import { Download, FileText } from 'lucide-react';
import { companyInfo } from '@/lib/seed-data';

export const metadata: Metadata = {
  title: 'Company Brochure',
  description:
    'Download the BridgeCraft Engineers & Consultants company brochure for an overview of our services, projects, and capabilities.',
};

export default function BrochurePage() {
  return (
    <>
      <PageHero
        title="Company Brochure"
        subtitle="A comprehensive overview of our capabilities and experience"
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-base leading-relaxed text-charcoal/85">
              {companyInfo.introText}
            </p>

            <p className="mt-6 text-base leading-relaxed text-charcoal/85">
              Our company brochure provides a detailed overview of our service
              offerings, project portfolio, team expertise, and the sectors we
              serve. It is a useful reference for clients, partners, and anyone
              interested in learning more about BridgeCraft Engineers.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="mt-12 rounded-lg bg-off-white p-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <FileText className="h-8 w-8 text-primary-dark" />
              </div>
              <h2 className="mt-4 font-heading text-xl font-semibold text-charcoal">
                BridgeCraft Company Brochure
              </h2>
              <p className="mt-2 text-sm text-charcoal/60">PDF &middot; ~5 MB</p>
              <div className="mt-6">
                {/* Replace href with actual PDF URL when available */}
                <Button href="/brochure/bridgecraft-brochure.pdf" variant="primary" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Download Brochure
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
