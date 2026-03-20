export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 animate-pulse rounded-full bg-primary" />
          <span className="h-3 w-3 animate-pulse rounded-full bg-primary-dark [animation-delay:150ms]" />
          <span className="h-3 w-3 animate-pulse rounded-full bg-primary [animation-delay:300ms]" />
        </div>
        <p className="text-sm text-charcoal/50">Loading...</p>
      </div>
    </div>
  );
}
