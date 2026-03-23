"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { urlFor } from "@/lib/sanity";

interface SanityImage {
  asset: unknown;
  alt?: string;
}

interface HomeHeroProps {
  heading?: string;
  subheading?: string;
  heroImage?: SanityImage;
}

export default function HomeHero({
  heading,
  subheading,
  heroImage,
}: HomeHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const hasImage = heroImage?.asset;

  return (
    <section
      ref={ref}
      className="relative flex min-h-[85vh] items-center overflow-hidden"
    >
      {/* Background */}
      {hasImage ? (
        <>
          <motion.div className="absolute inset-0" style={{ y }}>
            <Image
              src={urlFor(heroImage).width(1920).height(600).fit("crop").url()}
              alt={heroImage.alt || "Bridge Craft Engineers"}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-dark via-slate-dark to-primary-dark/20" />
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <AnimatedSection>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Engineering Excellence Since 2015
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {heading ?? (
              <>
                Engineering Structures{" "}
                <span className="text-primary">with Responsibility</span>
              </>
            )}
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            {subheading ??
              "BridgeCraft Engineers & Consultants delivers safe, sustainable, and innovative infrastructure solutions — from bridges and highways to buildings and industrial facilities."}
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
  );
}
