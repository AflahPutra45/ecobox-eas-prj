'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/hooks/use-cart'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Leaf } from 'lucide-react'

export default function CartPage() {
    const { items, totalItems, totalPrice, removeItem, updateQuantity } = useCart()

    if (items.length === 0) {
        return (
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
                    <div className="rounded-full bg-muted p-6">
                        <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h1 className="mt-6 text-2xl font-bold text-foreground">Keranjang Anda Kosong</h1>
                    <p className="mt-2 text-muted-foreground">
                        Mulai belanja produk ramah lingkungan pilihan kami.
                    </p>
                    <Button asChild className="mt-8 bg-primary text-primary-foreground hover:bg-[#8BD400]">
                        <Link href="/shop">
                            Mulai Belanja <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 bg-muted/30">
                <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Keranjang Belanja</h1>
                    <p className="mt-1 text-sm text-muted-foreground">{totalItems} item</p>

                    <div className="mt-8 grid gap-8 lg:grid-cols-3">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <div className="rounded-2xl border border-border bg-background">
                                <div className="divide-y divide-border">
                                    {items.map((item) => (
                                        <div key={item.product.id} className="flex gap-4 p-6">
                                            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted">
                                                <Image
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-1 flex-col gap-1">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="font-semibold text-foreground">{item.product.name}</h3>
                                                        <p className="text-sm text-muted-foreground">{item.product.vendor.name}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(item.product.id)}
                                                        className="text-muted-foreground transition-colors hover:text-destructive"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                <div className="mt-auto flex items-center justify-between">
                                                    <div className="flex items-center gap-2 rounded-lg border border-border">
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                            className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </button>
                                                        <span className="min-w-[2rem] text-center text-sm font-medium">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                            className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                    <span className="font-bold text-foreground">
                                                        ${(item.product.price * item.quantity).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-4 flex justify-between">
                                <Button variant="outline" asChild>
                                    <Link href="/shop">← Lanjut Belanja</Link>
                                </Button>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="space-y-4">
                            <div className="rounded-2xl border border-border bg-background p-6">
                                <h2 className="font-semibold text-foreground">Ringkasan Pesanan</h2>
                                <div className="mt-4 space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal ({totalItems} item)</span>
                                        <span className="font-medium">${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Pengiriman</span>
                                        <span className="font-medium text-[#A4F000]">Gratis</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between text-base">
                                        <span className="font-semibold">Total</span>
                                        <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                                <Button
                                    asChild
                                    className="mt-6 w-full bg-primary text-primary-foreground hover:bg-[#8BD400]"
                                >
                                    <Link href="/checkout">
                                        Lanjut ke Checkout <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>

                            {/* Eco impact */}
                            <div className="rounded-2xl border border-[#A4F000]/30 bg-[#A4F000]/5 p-4">
                                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                                    <Leaf className="h-4 w-4 text-[#A4F000]" />
                                    Dampak Pesanan Anda
                                </div>
                                <p className="mt-2 text-xs text-muted-foreground">
                                    Produk pilihan Anda membantu mencegah limbah plastik dan mengurangi emisi karbon.
                                    Terima kasih berbelanja berkelanjutan!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
