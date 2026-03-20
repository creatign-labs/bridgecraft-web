"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

export default function PageHero({
  title,
  subtitle,
  backgroundImage,
}: PageHeroProps) {
  return (
    <section
      className="relative flex min-h-[300px] items-center justify-center bg-slate-dark bg-cover bg-center"
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})` }
          : undefined
      }
    >
      {/* Dark overlay */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
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
