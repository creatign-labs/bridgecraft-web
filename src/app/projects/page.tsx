import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import ProjectsGrid from '@/components/sections/ProjectsGrid';
import { sanityFetch } from '@/lib/sanity';
import { allProjectsQuery } from '@/lib/queries';
import { projects as seedProjects } from '@/lib/seed-data';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Our Projects',
  description:
    'Explore our portfolio of bridge, highway, building, and industrial infrastructure projects across India.',
};

interface SanityImage {
  asset: unknown;
  alt?: string;
}

export default async function ProjectsPage() {
  const sanityProjects = await sanityFetch<
    {
      _id: string;
      title: string;
      slug: { current: string };
      client: string;
      location: string;
      keyHighlights?: string[];
      coverImage?: SanityImage;
      images?: SanityImage[];
    }[]
  >(allProjectsQuery);

  const projects = sanityProjects
    ? sanityProjects.map((p) => ({
        _id: p._id,
        title: p.title,
        slug: p.slug.current,
        client: p.client,
        location: p.location,
        keyHighlights: p.keyHighlights ?? [],
        coverImage: p.coverImage,
        images: p.images,
      }))
    : seedProjects;

  return (
    <>
      <PageHero
        title="Our Projects"
        subtitle="A portfolio of landmark infrastructure projects delivered with excellence"
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProjectsGrid projects={projects} />
        </div>
      </section>
    </>
  );
}
