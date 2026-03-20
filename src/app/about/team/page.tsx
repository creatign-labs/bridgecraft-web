import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { teamMembers } from '@/lib/seed-data';

// To switch to Sanity:
// import { client } from '@/lib/sanity';
// import { getTeamMembers } from '@/lib/queries';
// const members = await getTeamMembers();

export const metadata: Metadata = {
  title: 'Our Team',
  description:
    'Meet the experienced engineers and consultants behind BridgeCraft Engineers & Consultants.',
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        title="Our Team"
        subtitle="Experienced professionals committed to engineering excellence"
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <AnimatedSection key={member._id} delay={index * 0.08}>
                <div className="rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-lg text-center">
                  {/* Photo placeholder */}
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                    <span className="font-heading text-2xl font-bold text-primary-dark">
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
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
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
