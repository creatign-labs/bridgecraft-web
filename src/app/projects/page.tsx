import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import ProjectsGrid from '@/components/sections/ProjectsGrid';
import { projects } from '@/lib/seed-data';

// To switch to Sanity:
// import { client } from '@/lib/sanity';
// import { getAllProjects } from '@/lib/queries';
// const projects = await getAllProjects();

export const metadata: Metadata = {
  title: 'Our Projects',
  description:
    'Explore our portfolio of bridge, highway, building, and industrial infrastructure projects across India.',
};

export default function ProjectsPage() {
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
