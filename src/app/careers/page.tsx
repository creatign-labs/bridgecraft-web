import PageHero from '@/components/layout/PageHero';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { sanityFetch } from '@/lib/sanity';
import { allJobOpeningsQuery } from '@/lib/queries';
import { jobOpenings as seedJobOpenings } from '@/lib/seed-data';
import CareersClient from './CareersClient';

export const revalidate = 60;

export const metadata = {
  title: 'Careers',
  description:
    'Join BridgeCraft Engineers — explore current job openings in structural, bridge, and transportation engineering.',
};

export default async function CareersPage() {
  const sanityJobs = await sanityFetch<
    {
      _id: string;
      title: string;
      department: string;
      location: string;
      type: string;
      description: string;
      requirements?: string[];
      isActive?: boolean;
      heroImage?: { asset: unknown; alt?: string };
    }[]
  >(allJobOpeningsQuery);

  const careersHeroImage = sanityJobs?.find((j) => j.heroImage?.asset)?.heroImage;

  const jobOpenings = sanityJobs
    ? sanityJobs
        .filter((j) => j.isActive !== false)
        .map((j) => ({
          _id: j._id,
          title: j.title,
          department: j.department,
          location: j.location,
          type: j.type,
          description: j.description,
          requirements: j.requirements ?? [],
        }))
    : seedJobOpenings;

  return (
    <>
      <PageHero
        title="Careers"
        subtitle="Join our team of passionate engineers and consultants"
        image={careersHeroImage}
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

          <CareersClient jobOpenings={jobOpenings} />
        </div>
      </section>
    </>
  );
}
