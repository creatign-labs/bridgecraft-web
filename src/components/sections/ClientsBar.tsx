import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { urlFor, isSanityConfigured } from "@/lib/sanity";

interface SanityImage {
  asset: unknown;
  alt?: string;
}

interface Client {
  name: string;
  logo?: SanityImage;
}

interface ClientsBarProps {
  clients: Client[];
}

export default function ClientsBar({ clients }: ClientsBarProps) {
  return (
    <AnimatedSection>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {clients.map((client) => {
          const hasLogo = client.logo?.asset && isSanityConfigured;

          return (
            <div
              key={client.name}
              className="flex h-24 items-center justify-center rounded-lg border border-gray-100 bg-white p-4 grayscale transition-all duration-300 hover:grayscale-0 hover:shadow-md"
              title={client.name}
            >
              {hasLogo ? (
                <Image
                  src={urlFor(client.logo!).width(300).height(120).fit("max").url()}
                  alt={client.logo!.alt || client.name}
                  width={300}
                  height={120}
                  className="h-12 w-auto object-contain"
                  sizes="150px"
                />
              ) : (
                <ImagePlaceholder variant="logo" label={client.name} className="h-full w-full" />
              )}
            </div>
          );
        })}
      </div>
    </AnimatedSection>
  );
}
