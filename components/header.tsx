'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, ShoppingCart, Search, User } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'

const navigation = [
  { name: 'Belanja', href: '/shop' },
  { name: 'Langganan', href: '/subscribe' },
  { name: 'B2B', href: '/b2b' },
  { name: 'Dampak', href: '/impact' },
  { name: 'Tentang', href: '/about' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ecobox%20no%20bg-nEdLAeClecu7C7Y4jeYAkHB2bhi4cw.png"
            alt="EcoBox"
            width={48}
            height={48}
            priority                    // LCP element — preload untuk mempercepat render awal
            className="h-10 w-10 lg:h-12 lg:w-12"
          />
          <span className="text-xl font-bold tracking-tight lg:text-2xl">
            <span className="text-[#A4F000]">ECO</span>
            <span className="text-[#CC73B3]">BOX</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex lg:items-center lg:gap-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Search className="h-5 w-5" />
            <span className="sr-only">Cari</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" asChild>
            <Link href="/vendor/login">
              <User className="h-5 w-5" />
              <span className="sr-only">Akun Vendor</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Keranjang</span>
            </Link>
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-[#8BD400]" asChild>
            <Link href="/shop">Mulai Belanja</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-4 lg:hidden">
          <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 border-t border-border px-4 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2 pt-4">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/vendor/login">
                  <User className="mr-2 h-4 w-4" />
                  Portal Vendor
                </Link>
              </Button>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-[#8BD400]" asChild>
                <Link href="/shop">Mulai Belanja</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
