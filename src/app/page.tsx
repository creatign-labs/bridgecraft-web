import Link from 'next/link';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';
import StatsCounter from '@/components/ui/StatsCounter';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ServicesGrid from '@/components/sections/ServicesGrid';
import ProjectsGrid from '@/components/sections/ProjectsGrid';
import ClientsBar from '@/components/sections/ClientsBar';
import CTABanner from '@/components/sections/CTABanner';
import {
  services,
  projects,
  clients,
  stats,
  companyInfo,
} from '@/lib/seed-data';

// To switch to Sanity:
// import { client } from '@/lib/sanity';
// import { getHomepage, getServices, getFeaturedProjects, getClients } from '@/lib/queries';
// Then fetch data in the component body using: const data = await getHomepage();

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <>
      {/* ── Hero Section ── */}
      <section className="relative flex min-h-[85vh] items-center bg-slate-dark">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-dark via-slate-dark to-primary-dark/20" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Engineering Excellence Since 2015
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Engineering Structures{' '}
              <span className="text-primary">with Responsibility</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              BridgeCraft Engineers & Consultants delivers safe, sustainable, and
              innovative infrastructure solutions — from bridges and highways to
              buildings and industrial facilities.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/services" variant="primary" size="lg">
                Our Services
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Get in Touch
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Introduction ── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              title="Building the Foundations of Tomorrow"
              subtitle="A trusted multidisciplinary engineering consultancy"
            />
            <AnimatedSection className="mt-8">
              <p className="text-base leading-relaxed text-charcoal/80">
                {companyInfo.introText}
              </p>
            </AnimatedSection>
            <AnimatedSection className="mt-6">
              <Button href="/about/introduction" variant="ghost">
                Learn More About Us
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Services Overview ── */}
      <section className="bg-off-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Services"
            subtitle="Comprehensive engineering solutions across four core disciplines"
          />
          <div className="mt-12">
            <ServicesGrid
              services={services.map((s) => ({
                title: s.title,
                slug: s.slug,
                shortDescription: s.shortDescription,
              }))}
            />
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Featured Projects"
            subtitle="A selection of landmark projects from our portfolio"
          />
          <div className="mt-12">
            <ProjectsGrid projects={featuredProjects} />
          </div>
          <AnimatedSection className="mt-10 text-center">
            <Button href="/projects" variant="ghost">
              View All Projects
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Stats Counter ── */}
      <section className="bg-off-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="BridgeCraft by the Numbers" />
          <div className="mt-12">
            <StatsCounter stats={stats} />
          </div>
        </div>
      </section>

      {/* ── Clients Trust Bar ── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Trusted by Leading Organisations"
            subtitle="We are proud to work with premier government agencies and private enterprises"
          />
          <div className="mt-12">
            <ClientsBar clients={clients} />
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <CTABanner
        title="Ready to Start Your Next Project?"
        subtitle="Let us bring our engineering expertise to your infrastructure challenge."
        buttonText="Contact Us"
        buttonHref="/contact"
      />
    </>
  );
}
