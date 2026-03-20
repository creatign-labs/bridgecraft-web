'use client';

import { useState } from 'react';
import PageHero from '@/components/layout/PageHero';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import { ChevronDown, MapPin, Briefcase, Clock } from 'lucide-react';
import { jobOpenings } from '@/lib/seed-data';

// Note: metadata cannot be exported from "use client" pages.
// To add metadata, create a layout.tsx in this directory.

function JobCard({
  job,
  index,
}: {
  job: (typeof jobOpenings)[number];
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AnimatedSection delay={index * 0.08}>
      <div className="rounded-lg bg-white shadow transition-shadow hover:shadow-lg">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between p-6 text-left"
        >
          <div>
            <h3 className="font-heading text-lg font-semibold text-charcoal">
              {job.title}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-charcoal/60">
              <span className="flex items-center gap-1">
                <Briefcase className="h-3.5 w-3.5" />
                {job.department}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {job.type}
              </span>
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
              {job.description}
            </p>

            <h4 className="mt-4 text-sm font-semibold text-charcoal">
              Requirements:
            </h4>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-charcoal/70">
              {job.requirements.map((req) => (
                <li key={req}>{req}</li>
              ))}
            </ul>

            <div className="mt-6">
              <Button href={`mailto:careers@bridgecraft.in?subject=Application: ${job.title}`} variant="primary" size="sm">
                Apply Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}

export default function CareersPage() {
  return (
    <>
      <PageHero
        title="Careers"
        subtitle="Join our team of passionate engineers and consultants"
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="mb-10 text-base leading-relaxed text-charcoal/80">
              At BridgeCraft Engineers, we are always looking for talented and
              driven individuals who share our commitment to engineering
              excellence. We offer a collaborative work environment, exciting
              projects, and opportunities for professional growth.
            </p>
          </AnimatedSection>

          {jobOpenings.length > 0 ? (
            <div className="space-y-4">
              {jobOpenings.map((job, index) => (
                <JobCard key={job._id} job={job} index={index} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg bg-off-white p-8 text-center">
              <p className="text-charcoal/60">
                No openings at the moment. Please check back later or send your
                CV to{' '}
                <a
                  href="mailto:careers@bridgecraft.in"
                  className="font-medium text-primary-dark hover:underline"
                >
                  careers@bridgecraft.in
                </a>
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
