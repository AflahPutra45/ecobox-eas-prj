import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { categories } from '@/lib/data'
import { ArrowRight } from 'lucide-react'

const categoryImages: Record<string, string> = {
  packaging: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=600&h=400&fit=crop',
  kitchen: 'https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?w=600&h=400&fit=crop',
  'personal-care': 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&h=400&fit=crop',
  home: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&h=400&fit=crop',
  office: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&h=400&fit=crop',
  fashion: 'https://images.unsplash.com/photo-1597484662317-9bd7bdda2907?w=600&h=400&fit=crop',
}

export default function CategoriesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b border-border bg-muted/30 py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Belanja Berdasarkan Kategori
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Jelajahi koleksi produk berkelanjutan kami yang terkurasi di semua kategori
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/shop?category=${category.id}`}
                  className="group relative overflow-hidden rounded-2xl bg-muted"
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${categoryImages[category.id]})`,
                    }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Content */}
                  <div className="relative flex h-64 flex-col justify-end p-6 lg:h-80">
                    <span className="text-4xl">{category.icon}</span>
                    <h2 className="mt-3 text-2xl font-bold text-white">
                      {category.name}
                    </h2>
                    <p className="mt-1 text-sm text-white/80">
                      {category.count} produk
                    </p>
                    <div className="mt-4 inline-flex items-center text-sm font-medium text-[#A4F000] transition-colors group-hover:text-white">
                      Belanja Sekarang
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Categories Info */}
        <section className="border-t border-border bg-muted/30 py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#A4F000]/10">
                  <span className="text-3xl">100%</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  Berkelanjutan Terverifikasi
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Setiap produk memenuhi standar keberlanjutan ketat kami
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#CC73B3]/10">
                  <span className="text-3xl">1.200+</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  Vendor Terverifikasi
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Pemasok terpercaya yang berkomitmen pada keberlanjutan
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#A4F000]/10">
                  <span className="text-3xl">500+</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  Produk Ditambahkan Bulanan
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Alternatif berkelanjutan baru setiap minggu
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
