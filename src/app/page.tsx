import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';
import StatsCounter from '@/components/ui/StatsCounter';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ServicesGrid from '@/components/sections/ServicesGrid';
import ProjectsGrid from '@/components/sections/ProjectsGrid';
import ClientsBar from '@/components/sections/ClientsBar';
import CTABanner from '@/components/sections/CTABanner';
import HomeHero from '@/components/sections/HomeHero';
import { sanityFetch } from '@/lib/sanity';
import {
  homepageQuery,
  allServicesQuery,
  featuredProjectsQuery,
  allClientsQuery,
} from '@/lib/queries';
import {
  services as seedServices,
  projects as seedProjects,
  clients as seedClients,
  stats as seedStats,
  companyInfo,
} from '@/lib/seed-data';

export const revalidate = 60;

export default async function HomePage() {
  const [homepageData, sanityServices, sanityFeaturedProjects, sanityClients] =
    await Promise.all([
      sanityFetch<{
        heroHeading: string;
        heroSubheading: string;
        heroImage?: { asset: unknown; alt?: string };
        introText: string;
        stats: { label: string; value: number; suffix?: string }[];
        ctaText: string;
        ctaLink: string;
      }>(homepageQuery),
      sanityFetch<
        {
          _id: string;
          title: string;
          slug: { current: string };
          shortDescription: string;
          iconImage?: { asset: unknown; alt?: string };
        }[]
      >(allServicesQuery),
      sanityFetch<
        {
          _id: string;
          title: string;
          slug: { current: string };
          client: string;
          location: string;
          description: string;
          keyHighlights?: string[];
        }[]
      >(featuredProjectsQuery),
      sanityFetch<{ _id: string; name: string; logo?: string }[]>(
        allClientsQuery,
      ),
    ]);

  const services = sanityServices
    ? sanityServices.map((s) => ({
        title: s.title,
        slug: s.slug.current,
        shortDescription: s.shortDescription,
        iconImage: s.iconImage,
      }))
    : seedServices.map((s) => ({
        title: s.title,
        slug: s.slug,
        shortDescription: s.shortDescription,
      }));

  const featuredProjects = sanityFeaturedProjects
    ? sanityFeaturedProjects.map((p) => ({
        _id: p._id,
        title: p.title,
        slug: p.slug.current,
        client: p.client,
        location: p.location,
        keyHighlights: p.keyHighlights ?? [],
      }))
    : seedProjects
        .filter((p) => p.featured)
        .slice(0, 4)
        .map((p) => ({
          _id: p._id,
          title: p.title,
          slug: p.slug,
          client: p.client,
          location: p.location,
          keyHighlights: p.keyHighlights,
        }));

  const clients = sanityClients
    ? sanityClients.map((c) => ({ _id: c._id, name: c.name, order: 0 }))
    : seedClients;

  const introText = homepageData?.introText ?? companyInfo.introText;
  const stats =
    homepageData?.stats?.map((s) => ({
      label: s.label,
      value: s.value,
      suffix: s.suffix ?? '',
    })) ?? seedStats;

  return (
    <>
      {/* ── Hero Section ── */}
      <HomeHero
        heading={homepageData?.heroHeading}
        subheading={homepageData?.heroSubheading}
        heroImage={homepageData?.heroImage}
      />

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
                {introText}
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
      <section className="bg-[#F8F9FA] py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="Our Core Services"
            subtitle="Specialized engineering solutions across four disciplines"
          />
          <div className="mt-12">
            <ServicesGrid services={services} />
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
        title={homepageData?.ctaText ?? 'Ready to Start Your Next Project?'}
        subtitle="Let us bring our engineering expertise to your infrastructure challenge."
        buttonText="Contact Us"
        buttonHref={homepageData?.ctaLink ?? '/contact'}
      />
    </>
  );
}
