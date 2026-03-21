import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHero from '@/components/layout/PageHero';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import { MapPin, Building2, Landmark, FileText } from 'lucide-react';
import { sanityFetch } from '@/lib/sanity';
import { projectBySlugQuery, allProjectsQuery } from '@/lib/queries';
import { projects as seedProjects } from '@/lib/seed-data';

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const sanityProjects = await sanityFetch<{ slug: { current: string } }[]>(
    allProjectsQuery,
  );

  if (sanityProjects) {
    return sanityProjects.map((p) => ({ slug: p.slug.current }));
  }

  return seedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const sanityProject = await sanityFetch<{
    title: string;
    description: string;
  }>(projectBySlugQuery, { slug });

  if (sanityProject) {
    return {
      title: sanityProject.title,
      description: sanityProject.description?.slice(0, 160),
    };
  }

  const project = seedProjects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description.slice(0, 160),
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  const sanityProject = await sanityFetch<{
    _id: string;
    title: string;
    slug: { current: string };
    client: string;
    authority: string;
    location: string;
    scope: string;
    description: string;
    keyHighlights: string[];
    sector?: { name: string };
  }>(projectBySlugQuery, { slug });

  const project = sanityProject
    ? {
        title: sanityProject.title,
        client: sanityProject.client,
        authority: sanityProject.authority,
        location: sanityProject.location,
        scope: sanityProject.scope,
        description: sanityProject.description,
        keyHighlights: sanityProject.keyHighlights ?? [],
        sector: sanityProject.sector?.name ?? '',
      }
    : seedProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const details = [
    { icon: Building2, label: 'Client', value: project.client },
    { icon: Landmark, label: 'Authority', value: project.authority },
    { icon: MapPin, label: 'Location', value: project.location },
    { icon: FileText, label: 'Scope', value: project.scope },
  ];

  return (
    <>
      <PageHero title={project.title} subtitle={project.sector} />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <h2 className="font-heading text-2xl font-bold text-charcoal">
                  Project Overview
                </h2>
                <div className="mt-3 h-1 w-12 rounded-full bg-primary" />
                <p className="mt-6 text-base leading-relaxed text-charcoal/85">
                  {project.description}
                </p>
              </AnimatedSection>

              {/* Key Highlights */}
              {project.keyHighlights.length > 0 && (
                <AnimatedSection delay={0.1} className="mt-10">
                  <h3 className="font-heading text-xl font-semibold text-charcoal">
                    Key Highlights
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.keyHighlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary-dark"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Sidebar — Project Details */}
            <div>
              <AnimatedSection delay={0.15}>
                <div className="rounded-lg bg-off-white p-6">
                  <h3 className="font-heading text-lg font-semibold text-charcoal">
                    Project Details
                  </h3>
                  <div className="mt-1 h-1 w-10 rounded-full bg-primary" />

                  <dl className="mt-6 space-y-5">
                    {details.map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-start gap-3">
                        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary-dark" />
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-wider text-charcoal/50">
                            {label}
                          </dt>
                          <dd className="mt-0.5 text-sm text-charcoal">
                            {value}
                          </dd>
                        </div>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-8">
                    <Button href="/contact" variant="primary" size="md">
                      Discuss a Similar Project
                    </Button>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
