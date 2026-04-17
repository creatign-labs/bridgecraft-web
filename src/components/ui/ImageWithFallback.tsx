import Image from "next/image";
import { urlFor, isSanityConfigured } from "@/lib/sanity";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
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
    <ImagePlaceholder
      variant="card"
      className={className}
    />
  );
}
