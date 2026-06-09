'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'
import type { Product } from '@/lib/data'

const badgeColors = {
  green: 'bg-[#A4F000]/10 text-[#7AB800] border-[#A4F000]/30',
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  yellow: 'bg-amber-50 text-amber-700 border-amber-200',
  purple: 'bg-[#CC73B3]/10 text-[#CC73B3] border-[#CC73B3]/30',
  orange: 'bg-orange-50 text-orange-700 border-orange-200',
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  return (
    <Link
      href={`/product/${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-background transition-all hover:border-[#A4F000]/50 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Discount badge */}
        {product.originalPrice && (
          <div className="absolute left-3 top-3 rounded-full bg-[#CC73B3] px-2.5 py-1 text-xs font-semibold text-white">
            {Math.round((1 - product.price / product.originalPrice) * 100)}% DISKON
          </div>
        )}

        {/* Sustainability score */}
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 backdrop-blur-sm">
          <div className="h-2 w-2 rounded-full bg-[#A4F000]" />
          <span className="text-xs font-semibold text-foreground">{product.sustainabilityScore}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Vendor */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>{product.vendor.name}</span>
          {product.vendor.verified && (
            <span className="inline-flex items-center gap-0.5 text-[#A4F000]">
              <Check className="h-3 w-3" />
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="mt-1.5 line-clamp-2 text-sm font-semibold text-foreground group-hover:text-[#A4F000]">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex items-center">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          </div>
          <span className="text-xs font-medium text-foreground">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>

        {/* Badges */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.badges.slice(0, 2).map((badge) => (
            <Badge
              key={badge.id}
              variant="outline"
              className={`text-[10px] font-medium ${badgeColors[badge.color]}`}
            >
              {badge.name}
            </Badge>
          ))}
          {product.badges.length > 2 && (
            <Badge variant="outline" className="text-[10px] text-muted-foreground">
              +{product.badges.length - 2}
            </Badge>
          )}
        </div>

        {/* Price and CTA */}
        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <span className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-[#8BD400]"
            onClick={(e) => {
              e.preventDefault()
              addItem(product)
            }}
          >
            Tambah
          </Button>
        </div>
      </div>
    </Link>
  )
}
