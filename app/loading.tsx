// Root loading skeleton — tampil saat navigasi antar halaman
// Memberikan perceived performance yang baik tanpa blank screen
export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col animate-pulse">
      {/* Header skeleton */}
      <div className="sticky top-0 z-50 border-b border-border bg-background/95 px-4 py-4 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-muted" />
            <div className="h-6 w-24 rounded bg-muted" />
          </div>
          <div className="hidden gap-8 lg:flex">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 w-16 rounded bg-muted" />
            ))}
          </div>
          <div className="flex gap-3">
            <div className="h-9 w-9 rounded bg-muted" />
            <div className="h-9 w-9 rounded bg-muted" />
            <div className="h-9 w-28 rounded bg-muted" />
          </div>
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="mx-auto w-full max-w-7xl px-4 py-16 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <div className="h-6 w-64 rounded-full bg-muted" />
            <div className="space-y-3">
              <div className="h-12 w-full rounded bg-muted" />
              <div className="h-12 w-3/4 rounded bg-muted" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-5/6 rounded bg-muted" />
              <div className="h-4 w-4/6 rounded bg-muted" />
            </div>
            <div className="flex gap-4">
              <div className="h-11 w-40 rounded bg-muted" />
              <div className="h-11 w-40 rounded bg-muted" />
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="aspect-square rounded-3xl bg-muted" />
          </div>
        </div>
      </div>
    </div>
  )
}