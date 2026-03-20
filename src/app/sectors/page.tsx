import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import AnimatedSection from '@/components/ui/AnimatedSection';
import {
  Route,
  Landmark,
  Zap,
  Train,
  GraduationCap,
  Building2,
  Factory,
} from 'lucide-react';
import { sectors } from '@/lib/seed-data';

export const metadata: Metadata = {
  title: 'Sectors We Serve',
  description:
    'BridgeCraft Engineers works across infrastructure, government, renewable energy, railways, institutional, commercial, and industrial sectors.',
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Route,
  Landmark,
  Zap,
  Train,
  GraduationCap,
  Building2,
  Factory,
};

export default function SectorsPage() {
  return (
    <>
      <PageHero
        title="Sectors We Serve"
        subtitle="Delivering engineering excellence across diverse industries"
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sectors.map((sector, index) => {
              const Icon = iconMap[sector.icon] || Building2;
              return (
                <AnimatedSection key={sector.slug} delay={index * 0.08}>
                  <div className="group flex h-full flex-col items-center rounded-lg bg-white p-8 text-center shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <Icon className="h-8 w-8 text-primary-dark" />
                    </div>
                    <h3 className="mt-5 font-heading text-lg font-semibold text-charcoal">
                      {sector.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                      {sector.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
