'use client'

import { use, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { products } from '@/lib/data'
import {
  Star,
  Check,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  Share2,
  Leaf,
  Droplets,
  Wind,
  Shield,
  Truck,
  RotateCcw,
  ChevronLeft,
} from 'lucide-react'

const badgeColors = {
  green: 'bg-[#A4F000]/10 text-[#7AB800] border-[#A4F000]/30',
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  yellow: 'bg-amber-50 text-amber-700 border-amber-200',
  purple: 'bg-[#CC73B3]/10 text-[#CC73B3] border-[#CC73B3]/30',
  orange: 'bg-orange-50 text-orange-700 border-orange-200',
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const product = products.find((p) => p.id === id)

  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  if (!product) {
    notFound()
  }

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link
              href="/shop"
              className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Kembali ke Belanja
            </Link>
          </nav>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Product Image */}
            <div className="relative">
              <div className="sticky top-24">
                <div className="relative aspect-square overflow-hidden rounded-3xl bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />

                  {/* Discount badge */}
                  {product.originalPrice && (
                    <div className="absolute left-4 top-4 rounded-full bg-[#CC73B3] px-3 py-1.5 text-sm font-semibold text-white">
                      {Math.round(
                        (1 - product.price / product.originalPrice) * 100
                      )}
                      % DISKON
                    </div>
                  )}

                  {/* Sustainability score */}
                  <div className="absolute right-4 top-4 rounded-xl bg-background/90 p-3 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-[#A4F000]" />
                      <span className="text-lg font-bold text-foreground">
                        {product.sustainabilityScore}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Skor Eco
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div>
              {/* Vendor */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{product.vendor.name}</span>
                {product.vendor.verified && (
                  <Badge className="bg-[#A4F000]/10 text-[#7AB800] border-[#A4F000]/30">
                    <Check className="mr-1 h-3 w-3" />
                    Terverifikasi
                  </Badge>
                )}
              </div>

              {/* Name */}
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="mt-4 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-muted text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium text-foreground">
                  {product.rating}
                </span>
                <span className="text-muted-foreground">
                  ({product.reviewCount} ulasan)
                </span>
              </div>

              {/* Price */}
              <div className="mt-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-foreground">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              {/* Badges */}
              <div className="mt-6 flex flex-wrap gap-2">
                {product.badges.map((badge) => (
                  <Badge
                    key={badge.id}
                    variant="outline"
                    className={`text-sm ${badgeColors[badge.color]}`}
                  >
                    {badge.name}
                  </Badge>
                ))}
              </div>

              {/* Quantity and Add to Cart */}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center rounded-lg border border-border">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button variant="ghost" size="icon" onClick={increaseQuantity}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  size="lg"
                  className="flex-1 bg-primary text-primary-foreground hover:bg-[#8BD400]"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Tambah ke Keranjang - ${(product.price * quantity).toFixed(2)}
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isWishlisted ? 'fill-[#CC73B3] text-[#CC73B3]' : ''
                    }`}
                  />
                </Button>

                <Button variant="outline" size="icon" className="h-12 w-12">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Environmental Impact */}
              <div className="mt-10 rounded-2xl border border-border bg-muted/30 p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <Leaf className="h-5 w-5 text-[#A4F000]" />
                  Dampak Lingkungan
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Dengan memilih produk ini, Anda berkontribusi untuk:
                </p>

                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl bg-background p-4">
                    <Leaf className="h-6 w-6 text-[#A4F000]" />
                    <p className="mt-2 text-2xl font-bold text-foreground">
                      {product.impactMetrics.plasticPrevented}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Plastik Dicegah
                    </p>
                  </div>
                  <div className="rounded-xl bg-background p-4">
                    <Wind className="h-6 w-6 text-[#CC73B3]" />
                    <p className="mt-2 text-2xl font-bold text-foreground">
                      {product.impactMetrics.carbonSaved}
                    </p>
                    <p className="text-sm text-muted-foreground">Karbon Dihemat</p>
                  </div>
                  {product.impactMetrics.waterSaved && (
                    <div className="rounded-xl bg-background p-4">
                      <Droplets className="h-6 w-6 text-blue-500" />
                      <p className="mt-2 text-2xl font-bold text-foreground">
                        {product.impactMetrics.waterSaved}
                      </p>
                      <p className="text-sm text-muted-foreground">Air Dihemat</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <Shield className="h-6 w-6 text-[#A4F000]" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    Kualitas Terverifikasi
                  </p>
                  <p className="text-xs text-muted-foreground">
                    100% Tersertifikasi
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <Truck className="h-6 w-6 text-[#A4F000]" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    Pengiriman Eco
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Netral Karbon
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <RotateCcw className="h-6 w-6 text-[#A4F000]" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    Pengembalian Mudah
                  </p>
                  <p className="text-xs text-muted-foreground">Kebijakan 30 Hari</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
