import {
  PortableText,
  type PortableTextReactComponents,
  type PortableTextBlock,
} from "@portabletext/react";
import Link from "next/link";

const components: Partial<PortableTextReactComponents> = {
  block: {
    h1: ({ children }) => (
      <h1 className="mt-10 mb-4 font-heading text-4xl font-bold text-charcoal">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 mb-3 font-heading text-3xl font-bold text-charcoal">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-3 font-heading text-2xl font-semibold text-charcoal">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-5 mb-2 font-heading text-xl font-semibold text-charcoal">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 font-body leading-relaxed text-charcoal/85">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-primary pl-4 italic text-charcoal/70">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 ml-6 list-disc space-y-1.5 text-charcoal/85">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-1.5 text-charcoal/85">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="font-body leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="font-body leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-charcoal">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    code: ({ children }) => (
      <code className="rounded bg-off-white px-1.5 py-0.5 font-mono text-sm text-primary-dark">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = value?.href ?? "#";
      const isExternal = href.startsWith("http");

      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-dark underline decoration-primary/40 underline-offset-2 transition-colors hover:text-accent-coral hover:decoration-accent-coral/40"
          >
            {children}
          </a>
        );
      }

      return (
        <Link
          href={href}
          className="text-primary-dark underline decoration-primary/40 underline-offset-2 transition-colors hover:text-accent-coral hover:decoration-accent-coral/40"
        >
          {children}
        </Link>
      );
    },
  },
};

interface PortableTextRendererProps {
  content: PortableTextBlock[];
}

export default function PortableTextRenderer({
  content,
}: PortableTextRendererProps) {
  if (!content || content.length === 0) {
    return null;
  }

  return (
    <div className="portable-text mx-auto max-w-prose">
      <PortableText value={content} components={components} />
    </div>
  );
}
