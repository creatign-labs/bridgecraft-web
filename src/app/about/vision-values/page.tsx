import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Shield, Award, Lightbulb, Leaf, Users, HardHat } from 'lucide-react';
import { companyInfo } from '@/lib/seed-data';

export const metadata: Metadata = {
  title: 'Our Vision & Values',
  description:
    'Discover the vision and core values that drive BridgeCraft Engineers to deliver world-class infrastructure solutions.',
};

const values = [
  {
    icon: Shield,
    title: 'Integrity',
    description:
      'We uphold the highest ethical standards in every engagement, delivering honest assessments and transparent recommendations.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description:
      'We pursue technical excellence through rigorous quality processes, continuous learning, and a culture of peer review.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'We embrace new technologies, materials, and methods to deliver smarter, more efficient engineering solutions.',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    description:
      'We design with the future in mind, minimising environmental impact and maximising the lifecycle value of every structure.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description:
      'We work closely with clients, contractors, and stakeholders to ensure project success through open communication and teamwork.',
  },
  {
    icon: HardHat,
    title: 'Safety',
    description:
      'Safety is non-negotiable. We design structures that protect lives and embed safety considerations at every stage of our work.',
  },
];

export default function VisionValuesPage() {
  return (
    <>
      <PageHero
        title="Our Vision & Values"
        subtitle="The principles that guide everything we do"
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Vision Statement */}
          <AnimatedSection>
            <div className="mx-auto max-w-3xl rounded-lg border-l-4 border-primary bg-off-white p-8">
              <h2 className="font-heading text-2xl font-bold text-charcoal">
                Our Vision
              </h2>
              <p className="mt-4 text-base leading-relaxed text-charcoal/80">
                {companyInfo.visionStatement}
              </p>
            </div>
          </AnimatedSection>

          {/* Values Grid */}
          <div className="mt-16">
            <AnimatedSection>
              <h2 className="text-center font-heading text-3xl font-bold text-charcoal">
                Our Core Values
              </h2>
              <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-primary" />
            </AnimatedSection>

            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <AnimatedSection key={value.title} delay={index * 0.08}>
                    <div className="rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-lg">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary-dark" />
                      </div>
                      <h3 className="mt-4 font-heading text-lg font-semibold text-charcoal">
                        {value.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                        {value.description}
                      </p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
