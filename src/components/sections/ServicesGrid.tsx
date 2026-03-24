"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ClipboardCheck, Building2, Layers, Radio } from "lucide-react";
import { urlFor, isSanityConfigured } from "@/lib/sanity";

const fallbackIcons = [ClipboardCheck, Building2, Layers, Radio];

interface SanityImage {
  asset: unknown;
  alt?: string;
}

interface Service {
  title: string;
  slug: string;
  shortDescription: string;
  iconImage?: SanityImage;
}

interface ServicesGridProps {
  services: Service[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function ServicesGrid({ services }: ServicesGridProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      variants={prefersReducedMotion ? undefined : containerVariants}
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {services.map((service, index) => {
        const FallbackIcon = fallbackIcons[index % fallbackIcons.length];
        const hasIconImage = service.iconImage?.asset && isSanityConfigured;

        return (
          <motion.div
            key={service.slug}
            variants={prefersReducedMotion ? undefined : cardVariants}
          >
            <Link
              href={`/services/${service.slug}`}
              className="group flex h-full flex-col rounded-xl bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              {/* Icon */}
              <div className="mb-4 flex h-[200px] w-[200px] items-center justify-center self-center overflow-hidden rounded-lg">
                {hasIconImage ? (
                  <Image
                    src={urlFor(service.iconImage!).width(200).height(200).fit("crop").url()}
                    alt={service.iconImage!.alt || service.title}
                    width={200}
                    height={200}
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-primary/10">
                    <FallbackIcon className="h-16 w-16 text-primary-dark" />
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 className="font-heading text-lg font-bold text-charcoal group-hover:text-primary-dark">
                {service.title}
              </h3>

              {/* Description */}
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600">
                {service.shortDescription}
              </p>

              {/* Learn More link */}
              <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-[#4ecbcc] transition-colors group-hover:text-[#3ba8a9]">
                Learn More &rarr;
              </span>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
