import type { Metadata } from 'next';
import Image from 'next/image';
import PageHero from '@/components/layout/PageHero';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { User } from 'lucide-react';
import { sanityFetch, urlFor, isSanityConfigured } from '@/lib/sanity';
import { teamMembersQuery } from '@/lib/queries';
import { teamMembers as seedTeamMembers } from '@/lib/seed-data';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Our Team',
  description:
    'Meet the experienced engineers and consultants behind BridgeCraft Engineers & Consultants.',
};

interface SanityImage {
  asset: unknown;
  alt?: string;
}

export default async function TeamPage() {
  const sanityMembers = await sanityFetch<
    {
      _id: string;
      name: string;
      designation: string;
      photo?: SanityImage;
      bio: string;
      order: number;
    }[]
  >(teamMembersQuery);

  const teamMembers: {
    _id: string;
    name: string;
    designation: string;
    photo?: SanityImage;
    bio: string;
    order: number;
  }[] = sanityMembers ?? seedTeamMembers;

  return (
    <>
      <PageHero
        title="Our Team"
        subtitle="Experienced professionals committed to engineering excellence"
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => {
              const hasPhoto = member.photo?.asset && isSanityConfigured;

              return (
                <AnimatedSection key={member._id} delay={index * 0.08}>
                  <div className="rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-lg text-center">
                    {/* Photo */}
                    <div className="mx-auto h-24 w-24 overflow-hidden rounded-full">
                      {hasPhoto ? (
                        <Image
                          src={urlFor(member.photo!).width(400).height(400).fit('crop').url()}
                          alt={(member.photo!).alt || `${member.name} - Bridge Craft Engineers`}
                          width={400}
                          height={400}
                          className="h-full w-full object-cover"
                          sizes="96px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[#F8F9FA]">
                          <User className="h-10 w-10 text-charcoal/30" />
                        </div>
                      )}
                    </div>

                    <h3 className="mt-4 font-heading text-lg font-semibold text-charcoal">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-primary-dark">
                      {member.designation}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
                      {member.bio}
                    </p>
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
