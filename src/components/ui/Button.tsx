import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

interface ButtonAsButton
  extends ButtonBaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {
  href?: undefined;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  onClick?: undefined;
  type?: undefined;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-accent-coral text-white hover:bg-accent-coral/85 active:bg-accent-coral/75",
  secondary:
    "border border-primary text-primary hover:bg-primary hover:text-slate-dark",
  ghost: "text-charcoal hover:bg-off-white active:bg-off-white/80",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
};

function mergeClasses(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  href,
  ...rest
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

  const combinedClasses = mergeClasses(
    baseClasses,
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...(rest as ButtonAsButton)}>
      {children}
    </button>
  );
}
