'use client'

import { useState, useMemo } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { products, categories, badges } from '@/lib/data'
import { Search, SlidersHorizontal, X, Grid3X3, LayoutList } from 'lucide-react'

const sortOptions = [
  { value: 'featured', label: 'Unggulan' },
  { value: 'price-asc', label: 'Harga: Rendah ke Tinggi' },
  { value: 'price-desc', label: 'Harga: Tinggi ke Rendah' },
  { value: 'rating', label: 'Rating Tertinggi' },
  { value: 'sustainability', label: 'Skor Keberlanjutan' },
]

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedBadges, setSelectedBadges] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 100])
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.vendor.name.toLowerCase().includes(query)
      )
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory)
    }

    // Badge filter
    if (selectedBadges.length > 0) {
      result = result.filter((p) =>
        selectedBadges.every((badgeId) =>
          p.badges.some((b) => b.id === badgeId)
        )
      )
    }

    // Price filter
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    )

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'sustainability':
        result.sort((a, b) => b.sustainabilityScore - a.sustainabilityScore)
        break
    }

    return result
  }, [searchQuery, selectedCategory, selectedBadges, priceRange, sortBy])

  const toggleBadge = (badgeId: string) => {
    setSelectedBadges((prev) =>
      prev.includes(badgeId)
        ? prev.filter((id) => id !== badgeId)
        : [...prev, badgeId]
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory(null)
    setSelectedBadges([])
    setPriceRange([0, 100])
    setSortBy('featured')
  }

  const hasActiveFilters =
    searchQuery ||
    selectedCategory ||
    selectedBadges.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 100

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
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

        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          {/* Search and Controls */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1 lg:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari produk, vendor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filter
                {hasActiveFilters && (
                  <Badge className="ml-2 bg-primary text-primary-foreground">
                    {selectedBadges.length + (selectedCategory ? 1 : 0)}
                  </Badge>
                )}
              </Button>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Urutkan" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="hidden items-center gap-1 rounded-lg border border-border p-1 lg:flex">
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <LayoutList className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-8">
            {/* Filters Sidebar */}
            <aside
              className={`${
                showFilters ? 'block' : 'hidden'
              } fixed inset-0 z-50 bg-background p-6 lg:relative lg:block lg:w-64 lg:shrink-0 lg:p-0`}
            >
              <div className="flex items-center justify-between lg:hidden">
                <h2 className="text-lg font-semibold">Filter</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="mt-6 space-y-8 lg:mt-0">
                {/* Categories */}
                <div>
                  <h3 className="mb-4 text-sm font-semibold text-foreground">
                    Kategori
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() =>
                          setSelectedCategory(
                            selectedCategory === category.id ? null : category.id
                          )
                        }
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-primary/10 text-foreground'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{category.icon}</span>
                          {category.name}
                        </span>
                        <span className="text-xs">{category.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sustainability Badges */}
                <div>
                  <h3 className="mb-4 text-sm font-semibold text-foreground">
                    Badge Keberlanjutan
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.values(badges).map((badge) => (
                      <button
                        key={badge.id}
                        onClick={() => toggleBadge(badge.id)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                          selectedBadges.includes(badge.id)
                            ? 'border-primary bg-primary/10 text-foreground'
                            : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                        }`}
                      >
                        {badge.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="mb-4 text-sm font-semibold text-foreground">
                    Rentang Harga
                  </h3>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={100}
                    step={5}
                    className="mb-4"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}+</span>
                  </div>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="w-full"
                  >
                    Hapus Semua Filter
                  </Button>
                )}
              </div>

              {/* Mobile Apply Button */}
              <div className="mt-8 lg:hidden">
                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-[#8BD400]"
                  onClick={() => setShowFilters(false)}
                >
                  Tampilkan {filteredProducts.length} Hasil
                </Button>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Results count */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Menampilkan{' '}
                  <span className="font-medium text-foreground">
                    {filteredProducts.length}
                  </span>{' '}
                  produk
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="hidden text-sm text-primary hover:underline lg:block"
                  >
                    Hapus semua filter
                  </button>
                )}
              </div>

              {filteredProducts.length > 0 ? (
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
                      : 'space-y-4'
                  }
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-4 rounded-full bg-muted p-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Produk tidak ditemukan
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Coba sesuaikan filter atau kata kunci pencarian Anda
                  </p>
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="mt-4"
                  >
                    Hapus Filter
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
