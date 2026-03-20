import Link from "next/link";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  href?: string;
}

export default function Card({ children, className, href }: CardProps) {
  const baseClasses = `rounded-lg bg-white shadow transition-shadow duration-300 hover:shadow-lg ${className ?? ""}`.trim();

  if (href) {
    return (
      <Link href={href} className={`block ${baseClasses}`}>
        {children}
      </Link>
    );
  }

  return <div className={baseClasses}>{children}</div>;
}
