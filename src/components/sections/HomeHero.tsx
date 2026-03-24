"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import { urlFor } from "@/lib/sanity";

interface SanityImage {
  asset: unknown;
  alt?: string;
}

interface HomeHeroProps {
  heading?: string;
  subheading?: string;
  heroImage?: SanityImage;
  placeholderSrc?: string;
}

export default function HomeHero({
  heading,
  subheading,
  heroImage,
  placeholderSrc,
}: HomeHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, -50]
  );

  const hasImage = heroImage?.asset;

  const fadeSlideUp = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: "easeOut" as const },
        };

  return (
    <section
      ref={ref}
      className="relative flex min-h-[85vh] items-center overflow-hidden"
    >
      {/* Background */}
      {hasImage ? (
        <>
          <motion.div className="absolute inset-0" style={{ y: bgY }}>
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
      ) : placeholderSrc ? (
        <>
          <motion.div className="absolute inset-0" style={{ y: bgY }}>
            <Image
              src={placeholderSrc}
              alt="Bridge Craft Engineers"
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
        <motion.div {...fadeSlideUp(0.2)}>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Engineering Excellence Since 2015
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {heading ?? (
              <>
                Engineering Structures{" "}
                <span className="text-primary">with Responsibility</span>
              </>
            )}
          </h1>
        </motion.div>

        <motion.p
          {...fadeSlideUp(0.4)}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70"
        >
          {subheading ??
            "BridgeCraft Engineers & Consultants delivers safe, sustainable, and innovative infrastructure solutions — from bridges and highways to buildings and industrial facilities."}
        </motion.p>

        <motion.div {...fadeSlideUp(0.6)} className="mt-8 flex flex-wrap gap-4">
          <Button href="/services" variant="primary" size="lg">
            Our Services
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            Get in Touch
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
