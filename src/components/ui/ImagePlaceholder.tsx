import { ImageIcon, UserRound } from "lucide-react";

type Variant = "card" | "hero" | "avatar" | "logo" | "icon";

interface ImagePlaceholderProps {
  variant?: Variant;
  label?: string;
  className?: string;
}

export default function ImagePlaceholder({
  variant = "card",
  label,
  className = "",
}: ImagePlaceholderProps) {
  if (variant === "hero") {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-[#1a2d3e] ${className}`}
      >
        <ImageIcon className="h-16 w-16 text-slate-600" />
        <p className="text-sm text-slate-500">
          {label ?? "Add hero image in Sanity Studio"}
        </p>
      </div>
    );
  }

  if (variant === "avatar") {
    return (
      <div
        className={`flex h-full w-full items-center justify-center bg-slate-100 ${className}`}
      >
        <UserRound className="h-10 w-10 text-slate-300" />
      </div>
    );
  }

  if (variant === "logo") {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-1.5 ${className}`}
      >
        <ImageIcon className="h-5 w-5 text-slate-300" />
        {label && (
          <span className="px-2 text-center text-xs font-medium text-slate-500">
            {label}
          </span>
        )}
      </div>
    );
  }

  if (variant === "icon") {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-slate-100 ${className}`}
      >
        <ImageIcon className="h-8 w-8 text-slate-300" />
        {label && <span className="text-xs text-slate-400">{label}</span>}
      </div>
    );
  }

  // default: card
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-slate-100 ${className}`}
    >
      <ImageIcon className="h-10 w-10 text-slate-300" />
      {label && (
        <span className="px-3 text-center text-xs text-slate-400">{label}</span>
      )}
    </div>
  );
}
