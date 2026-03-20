import type { ReactNode } from "react";
import Card from "@/components/ui/Card";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { ArrowRight } from "lucide-react";

interface Service {
  title: string;
  slug: string;
  shortDescription: string;
  icon?: ReactNode;
}

interface ServicesGridProps {
  services: Service[];
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((service, index) => (
        <AnimatedSection key={service.slug} delay={index * 0.1}>
          <Card href={`/services/${service.slug}`} className="group p-6">
            {/* Icon placeholder */}
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary-dark transition-colors group-hover:bg-primary/20">
              {service.icon ?? (
                <svg
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 7.5h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                  />
                </svg>
              )}
            </div>

            <h3 className="font-heading text-lg font-semibold text-charcoal group-hover:text-primary-dark">
              {service.title}
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
              {service.shortDescription}
            </p>

            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary-dark transition-colors group-hover:text-accent-coral">
              Learn More
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Card>
        </AnimatedSection>
      ))}
    </div>
  );
}
