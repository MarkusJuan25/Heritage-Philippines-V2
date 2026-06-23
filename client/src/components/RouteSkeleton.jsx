function Bone({ className }) {
  return (
    <div
      aria-hidden="true"
      className={`rounded-lg bg-coffee-900/[0.07] motion-reduce:animate-none ${className}`}
    />
  );
}

function CardSkeleton() {
  return (
    <div aria-hidden="true" className="overflow-hidden rounded-2xl border border-cream-200/60 bg-white/60">
      {/* image area */}
      <Bone className="h-48 rounded-none" />
      {/* text lines */}
      <div className="space-y-3 p-5">
        <Bone className="h-3 w-1/3" />
        <Bone className="h-5 w-4/5" />
        <Bone className="h-3 w-full" />
        <Bone className="h-3 w-3/4" />
        <Bone className="mt-4 h-9 w-28 rounded-full" />
      </div>
    </div>
  );
}

export default function RouteSkeleton() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="animate-pulse motion-reduce:animate-none"
    >
      <span className="sr-only">Loading page</span>

      {/* Hero placeholder */}
      <div
        aria-hidden="true"
        className="relative h-[56svh] min-h-64 w-full overflow-hidden bg-coffee-950/10"
      >
        <Bone className="absolute inset-0 rounded-none bg-coffee-900/[0.10]" />
        {/* headline block */}
        <div className="absolute bottom-10 left-6 space-y-3 sm:left-12 md:left-16">
          <Bone className="h-3 w-24" />
          <Bone className="h-8 w-64 sm:w-80 md:w-96" />
          <Bone className="h-5 w-48 sm:w-64" />
          <Bone className="mt-2 h-10 w-36 rounded-full" />
        </div>
      </div>

      {/* Body content placeholder */}
      <div className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-10">

        {/* Eyebrow + heading + paragraph block */}
        <div className="mx-auto mb-12 max-w-2xl space-y-4 text-center">
          <Bone className="mx-auto h-3 w-20" />
          <Bone className="mx-auto h-8 w-3/4" />
          <Bone className="mx-auto h-4 w-full" />
          <Bone className="mx-auto h-4 w-5/6" />
        </div>

        {/* Three-card grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>

      </div>
    </div>
  );
}
