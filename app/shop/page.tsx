// Server Component — page header dirender di server, tidak perlu JS
import { Suspense } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ShopClientSection } from './shop-client'

// Metadata dirender di server
export const metadata = {
  title: 'Belanja | EcoBox',
  description: 'Temukan produk ramah lingkungan terverifikasi dari vendor terpercaya',
}

// Skeleton untuk product grid saat loading
function ProductGridSkeleton() {
  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-2xl border border-border">
          <div className="aspect-square bg-muted" />
          <div className="p-4 space-y-3">
            <div className="h-3 w-1/3 rounded bg-muted" />
            <div className="h-4 w-3/4 rounded bg-muted" />
            <div className="h-3 w-1/4 rounded bg-muted" />
            <div className="flex gap-2 mt-2">
              <div className="h-5 w-16 rounded-full bg-muted" />
              <div className="h-5 w-16 rounded-full bg-muted" />
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="h-6 w-16 rounded bg-muted" />
              <div className="h-8 w-20 rounded bg-muted" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ShopPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header — Server Rendered, instan */}
        <section className="border-b border-border bg-muted/30 py-8 lg:py-12">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Belanja Produk Berkelanjutan
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Temukan produk ramah lingkungan terverifikasi dari vendor terpercaya
            </p>
          </div>
        </section>

        {/* Filter & Product Grid — Client Component dengan Suspense boundary */}
        <Suspense fallback={
          <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
            <ProductGridSkeleton />
          </div>
        }>
          <ShopClientSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
