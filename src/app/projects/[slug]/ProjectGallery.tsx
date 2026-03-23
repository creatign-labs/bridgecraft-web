"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import { urlFor, isSanityConfigured } from "@/lib/sanity";

interface SanityImage {
  asset: unknown;
  alt?: string;
}

interface ProjectGalleryProps {
  images: SanityImage[];
  projectTitle: string;
}

export default function ProjectGallery({
  images,
  projectTitle,
}: ProjectGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const validImages = images.filter((img) => img.asset && isSanityConfigured);

  if (validImages.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {validImages.map((image, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setLightboxIndex(index)}
            className="group relative overflow-hidden rounded-lg"
          >
            <Image
              src={urlFor(image).width(1200).height(800).fit("crop").url()}
              alt={
                image.alt || `${projectTitle} - Image ${index + 1}`
              }
              width={1200}
              height={800}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          <div
            className="relative max-h-[85vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={urlFor(validImages[lightboxIndex])
                .width(1920)
                .height(1280)
                .fit("clip")
                .url()}
              alt={
                validImages[lightboxIndex].alt ||
                `${projectTitle} - Image ${lightboxIndex + 1}`
              }
              width={1920}
              height={1280}
              className="max-h-[85vh] w-auto rounded-lg object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
