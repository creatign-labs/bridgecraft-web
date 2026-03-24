import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Briefcase } from "lucide-react";
import { urlFor, isSanityConfigured } from "@/lib/sanity";

interface SanityImage {
  asset: unknown;
  alt?: string;
}

interface Project {
  title: string;
  slug: string;
  client: string;
  location: string;
  keyHighlights: string[];
  coverImage?: SanityImage;
  images?: SanityImage[];
  placeholderSrc?: string;
}

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => {
        const thumbnail = project.coverImage ?? project.images?.[0];
        const hasImage = thumbnail?.asset && isSanityConfigured;

        return (
          <AnimatedSection key={project.slug} delay={index * 0.08}>
            <Link
              href={`/projects/${project.slug}`}
              className="group block overflow-hidden rounded-lg bg-white shadow transition-shadow duration-300 hover:shadow-lg"
            >
              {/* Card image */}
              <div className="relative h-48 w-full overflow-hidden">
                {hasImage ? (
                  <Image
                    src={urlFor(thumbnail!).width(800).height(500).fit("crop").url()}
                    alt={thumbnail!.alt || `${project.title} - Bridge Craft Engineers`}
                    width={800}
                    height={500}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : project.placeholderSrc ? (
                  <Image
                    src={project.placeholderSrc}
                    alt={`${project.title} - Bridge Craft Engineers`}
                    width={800}
                    height={500}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#F8F9FA]">
                    <Briefcase className="h-12 w-12 text-charcoal/20" />
                  </div>
                )}
              </div>

              <div className="p-6">
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
              </div>
            </Link>
          </AnimatedSection>
        );
      })}
    </div>
  );
}
