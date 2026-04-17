"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { urlFor } from "@/lib/sanity";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

interface SanityImage {
  asset: unknown;
  alt?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image?: SanityImage;
}

export default function PageHero({ title, subtitle, image }: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const hasImage = image?.asset;

  return (
    <section
      ref={ref}
      className="relative flex min-h-[300px] items-center justify-center overflow-hidden"
    >
      {hasImage ? (
        <>
          <motion.div className="absolute inset-0" style={{ y }}>
            <Image
              src={urlFor(image).width(1920).height(600).fit("crop").url()}
              alt={image.alt || "Bridge Craft Engineers"}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
        </>
      ) : (
        <>
          <ImagePlaceholder variant="hero" className="absolute inset-0" />
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-heading text-4xl font-bold text-white sm:text-5xl"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 text-lg text-white/80"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-6 h-1 w-20 rounded-full bg-primary"
        />
      </div>
    </section>
  );
}
