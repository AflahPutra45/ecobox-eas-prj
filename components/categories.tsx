import Link from 'next/link'
import { categories } from '@/lib/data'

export function Categories() {
  return (
    <section className="border-t border-border py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Belanja Berdasarkan Kategori
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Temukan alternatif berkelanjutan untuk setiap aspek kehidupan Anda
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.id}`}
              className="group relative overflow-hidden rounded-2xl border border-border bg-background p-6 transition-all hover:border-[#A4F000]/50 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{category.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-[#A4F000]">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.count} produk
                    </p>
                  </div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-[#A4F000]/10">
                  <svg
                    className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-[#A4F000]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
