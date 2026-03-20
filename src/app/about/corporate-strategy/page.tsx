'use client';

import { useState } from 'react';
import PageHero from '@/components/layout/PageHero';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { ChevronDown } from 'lucide-react';
import { strategyPillars } from '@/lib/seed-data';

// Note: metadata cannot be exported from "use client" pages.
// If SEO metadata is needed, move it to a layout.tsx in this directory
// or convert to a server component with a client child.

function PillarCard({
  pillar,
  index,
}: {
  pillar: (typeof strategyPillars)[number];
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AnimatedSection delay={index * 0.1}>
      <div className="rounded-lg bg-white shadow transition-shadow hover:shadow-lg">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between p-6 text-left"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-heading text-lg font-bold text-primary-dark">
              {index + 1}
            </span>
            <div>
              <h3 className="font-heading text-lg font-semibold text-charcoal">
                {pillar.title}
              </h3>
              <p className="mt-1 text-sm text-charcoal/60">{pillar.summary}</p>
            </div>
          </div>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-charcoal/40 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isOpen && (
          <div className="border-t border-gray-100 px-6 pb-6 pt-4">
            <p className="text-sm leading-relaxed text-charcoal/80">
              {pillar.details}
            </p>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}

export default function CorporateStrategyPage() {
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

          <div className="space-y-4">
            {strategyPillars.map((pillar, index) => (
              <PillarCard key={pillar.title} pillar={pillar} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
