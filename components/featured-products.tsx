import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/product-card'
import { products } from '@/lib/data'

export function FeaturedProducts() {
  // Show first 8 products
  const featuredProducts = products.slice(0, 8)

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Produk Unggulan
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Produk ramah lingkungan terkurasi dari vendor terverifikasi kami
            </p>
          </div>
          <Button variant="outline" asChild className="group">
            <Link href="/shop">
              Lihat Semua Produk
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
