import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface Client {
  name: string;
  logo?: string;
}

interface ClientsBarProps {
  clients: Client[];
}

export default function ClientsBar({ clients }: ClientsBarProps) {
  return (
    <AnimatedSection>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {clients.map((client) => (
          <div
            key={client.name}
            className="flex items-center justify-center rounded-lg border border-gray-100 bg-white p-6 grayscale transition-all duration-300 hover:grayscale-0 hover:shadow-md"
            title={client.name}
          >
            {client.logo ? (
              <Image
                src={client.logo}
                alt={client.name}
                width={120}
                height={60}
                className="h-12 w-auto object-contain"
              />
            ) : (
              <span className="text-center text-sm font-medium text-charcoal/50">
                {client.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
