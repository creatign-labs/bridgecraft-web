'use client';

import { useState } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import { ChevronDown, MapPin, Briefcase, Clock } from 'lucide-react';

interface Job {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

function JobCard({ job, index }: { job: Job; index: number }) {
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

            {job.requirements.length > 0 && (
              <>
                <h4 className="mt-4 text-sm font-semibold text-charcoal">
                  Requirements:
                </h4>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-charcoal/70">
                  {job.requirements.map((req) => (
                    <li key={req}>{req}</li>
                  ))}
                </ul>
              </>
            )}

            <div className="mt-6">
              <Button
                href={`mailto:careers@bridgecraft.in?subject=Application: ${job.title}`}
                variant="primary"
                size="sm"
              >
                Apply Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}

export default function CareersClient({ jobOpenings }: { jobOpenings: Job[] }) {
  if (jobOpenings.length === 0) {
    return (
      <div className="rounded-lg bg-off-white p-8 text-center">
        <p className="text-charcoal/60">
          No openings at the moment. Please check back later or send your CV
          to{' '}
          <a
            href="mailto:careers@bridgecraft.in"
            className="font-medium text-primary-dark hover:underline"
          >
            careers@bridgecraft.in
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobOpenings.map((job, index) => (
        <JobCard key={job._id} job={job} index={index} />
      ))}
    </div>
  );
}
