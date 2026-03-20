"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={centered ? "text-center" : ""}
    >
      <h2 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl">
        {title}
      </h2>
      <div
        className={`mt-3 h-1 w-16 rounded-full bg-primary ${
          centered ? "mx-auto" : ""
        }`}
      />
      {subtitle && (
        <p
          className={`mt-4 text-lg text-charcoal/70 ${
            centered ? "mx-auto max-w-2xl" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
