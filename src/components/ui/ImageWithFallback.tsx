import Image from "next/image";
import { urlFor, isSanityConfigured } from "@/lib/sanity";
import type { LucideIcon } from "lucide-react";

interface SanityImage {
  asset: unknown;
  alt?: string;
}

interface ImageWithFallbackProps {
  image?: SanityImage | null;
  alt: string;
  width: number;
  height: number;
  fit?: "crop" | "max" | "clip";
  fallbackIcon?: LucideIcon;
  fallbackText?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export default function ImageWithFallback({
  image,
  alt,
  width,
  height,
  fit = "crop",
  fallbackIcon: FallbackIcon,
  fallbackText,
  className = "",
  priority = false,
  sizes,
}: ImageWithFallbackProps) {
  const hasImage = image?.asset && isSanityConfigured;

  if (hasImage) {
    return (
      <Image
        src={urlFor(image).width(width).height(height).fit(fit).url()}
        alt={image.alt || alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        sizes={sizes}
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center bg-[#F8F9FA] ${className}`}
      style={{ width: "100%", aspectRatio: `${width}/${height}` }}
    >
      {FallbackIcon && (
        <FallbackIcon className="h-12 w-12 text-charcoal/30" />
      )}
      {fallbackText && !FallbackIcon && (
        <span className="px-4 text-center font-heading text-sm font-medium text-charcoal/60">
          {fallbackText}
        </span>
      )}
    </div>
  );
}
