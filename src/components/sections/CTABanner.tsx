import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface CTABannerProps {
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonHref: string;
}

export default function CTABanner({
  title,
  subtitle,
  buttonText,
  buttonHref,
}: CTABannerProps) {
  return (
    <section className="bg-slate-dark">
      <AnimatedSection className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-primary" />

        <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-4 text-lg text-white/70">{subtitle}</p>
        )}

        <div className="mt-8">
          <Button href={buttonHref} variant="primary" size="lg">
            {buttonText}
          </Button>
        </div>
      </AnimatedSection>
    </section>
  );
}
