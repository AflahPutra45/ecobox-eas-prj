'use client'

// Client island yang sangat kecil — hanya tombol "Tambah ke Keranjang"
// Komponen ini adalah satu-satunya bagian dari ProductCard yang butuh interaktivitas
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'
import type { Product } from '@/lib/data'

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart()

  return (
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
  )
}
