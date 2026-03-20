import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface Project {
  title: string;
  slug: string;
  client: string;
  location: string;
  keyHighlights: string[];
}

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <AnimatedSection key={project.slug} delay={index * 0.08}>
          <Link
            href={`/projects/${project.slug}`}
            className="group block rounded-lg bg-white p-6 shadow transition-shadow duration-300 hover:shadow-lg"
          >
            <h3 className="font-heading text-lg font-semibold text-charcoal group-hover:text-primary-dark">
              {project.title}
            </h3>

            <dl className="mt-3 space-y-1 text-sm text-charcoal/70">
              <div className="flex gap-2">
                <dt className="font-medium text-charcoal/90">Client:</dt>
                <dd>{project.client}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-medium text-charcoal/90">Location:</dt>
                <dd>{project.location}</dd>
              </div>
            </dl>

            {project.keyHighlights.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {project.keyHighlights.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-dark"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        </AnimatedSection>
      ))}
    </div>
  );
}
