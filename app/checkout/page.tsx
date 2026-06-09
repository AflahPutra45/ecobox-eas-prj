'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/hooks/use-cart'
import { products } from '@/lib/data'
import {
  Package,
  Leaf,
  Recycle,
  Check,
  ChevronRight,
  Lock,
  Truck,
  CreditCard,
  ShieldCheck,
  ShoppingBag,
  ArrowRight,
} from 'lucide-react'

const packagingOptions = [
  {
    id: 'minimal',
    name: 'Paket Eco Minimal',
    description: 'Kotak kertas daur ulang dengan packing peanuts jagung',
    price: 0,
    materials: [
      { name: 'Kotak', value: 'Kardus 100% Daur Ulang' },
      { name: 'Bantalan', value: 'Packing Peanuts Pati Jagung' },
      { name: 'Lakban', value: 'Lakban Kertas (Aktivasi Air)' },
    ],
    impact: { plastic: '0g', compostable: '100%', carbonNeutral: true },
  },
  {
    id: 'premium',
    name: 'Paket Eco Premium',
    description: 'Kotak kertas biji yang dapat ditanam dengan busa jamur',
    price: 2.99,
    materials: [
      { name: 'Kotak', value: 'Kotak Kertas Biji yang Dapat Ditanam' },
      { name: 'Bantalan', value: 'Busa Miselium Jamur' },
      { name: 'Lakban', value: 'Lakban Selulosa Biodegradable' },
    ],
    impact: { plastic: '0g', compostable: '100%', carbonNeutral: true },
    recommended: true,
  },
  {
    id: 'gift',
    name: 'Bungkus Kado Eco',
    description: 'Bungkus kain dapat digunakan ulang dengan pita rami',
    price: 4.99,
    materials: [
      { name: 'Bungkus', value: 'Furoshiki Katun Organik' },
      { name: 'Pita', value: 'Pita Rami' },
      { name: 'Kartu', value: 'Kartu Ucapan Kertas Daur Ulang' },
    ],
    impact: { plastic: '0g', compostable: '100%', carbonNeutral: true },
  },
]

const shippingOptions = [
  {
    id: 'standard',
    name: 'Pengiriman Eco Standar',
    description: '5-7 hari kerja',
    price: 0,
    carbonOffset: true,
  },
  {
    id: 'express',
    name: 'Pengiriman Eco Express',
    description: '2-3 hari kerja',
    price: 5.99,
    carbonOffset: true,
  },
]

// Fallback dummy items when cart is empty (for direct URL access)
const DEMO_CART = [
  { product: products[0], quantity: 2 },
  { product: products[2], quantity: 1 },
  { product: products[5], quantity: 1 },
]

export default function CheckoutPage() {
  const { items: cartItems } = useCart()
  const activeItems = cartItems.length > 0 ? cartItems : DEMO_CART

  const [step, setStep] = useState(1)
  const [selectedPackaging, setSelectedPackaging] = useState('premium')
  const [selectedShipping, setSelectedShipping] = useState('standard')

  const subtotal = activeItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )
  const packagingPrice =
    packagingOptions.find((p) => p.id === selectedPackaging)?.price || 0
  const shippingPrice =
    shippingOptions.find((s) => s.id === selectedShipping)?.price || 0
  const total = subtotal + packagingPrice + shippingPrice

  const totalPlasticPrevented = activeItems.reduce((sum, item) => {
    const match = item.product.impactMetrics.plasticPrevented.match(/[\d,]+/)
    const value = match ? parseFloat(match[0].replace(',', '.')) : 0
    return sum + value * item.quantity
  }, 0)

  const totalCarbonSaved = activeItems.reduce((sum, item) => {
    const match = item.product.impactMetrics.carbonSaved.match(/[\d,]+/)
    const value = match ? parseFloat(match[0].replace(',', '.')) : 0
    return sum + value * item.quantity
  }, 0)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium ${step >= s
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                      }`}
                  >
                    {step > s ? <Check className="h-5 w-5" /> : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`mx-2 h-0.5 w-16 sm:w-24 ${step > s ? 'bg-primary' : 'bg-muted'
                        }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center gap-8 text-sm sm:gap-16">
              <span
                className={step >= 1 ? 'text-foreground' : 'text-muted-foreground'}
              >
                Keranjang
              </span>
              <span
                className={step >= 2 ? 'text-foreground' : 'text-muted-foreground'}
              >
                Kemasan
              </span>
              <span
                className={step >= 3 ? 'text-foreground' : 'text-muted-foreground'}
              >
                Pembayaran
              </span>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === 1 && (
                <div className="rounded-2xl border border-border bg-background p-6">
                  <h2 className="text-xl font-semibold text-foreground">
                    Keranjang Anda
                  </h2>

                  <div className="mt-6 divide-y divide-border">
                    {activeItems.map((item) => (
                      <div key={item.product.id} className="flex gap-4 py-4">
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">
                            {item.product.name}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {item.product.vendor.name}
                          </p>
                          <div className="mt-2 flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">
                              Qty: {item.quantity}
                            </span>
                            <span className="font-medium text-foreground">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button
                    className="mt-6 w-full bg-primary text-primary-foreground hover:bg-[#8BD400]"
                    onClick={() => setStep(2)}
                  >
                    Lanjut ke Kemasan Eco
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  {/* Eco Packaging Selection */}
                  <div className="rounded-2xl border border-border bg-background p-6">
                    <div className="flex items-center gap-3">
                      <Package className="h-6 w-6 text-[#A4F000]" />
                      <h2 className="text-xl font-semibold text-foreground">
                        Pilih Kemasan Eco Anda
                      </h2>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Semua kemasan kami 100% bebas plastik dan dapat dikompos
                    </p>

                    <RadioGroup
                      value={selectedPackaging}
                      onValueChange={setSelectedPackaging}
                      className="mt-6 space-y-4"
                    >
                      {packagingOptions.map((option) => (
                        <div
                          key={option.id}
                          className={`relative rounded-xl border-2 p-4 transition-all ${selectedPackaging === option.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                            }`}
                        >
                          {option.recommended && (
                            <div className="absolute -top-3 left-4 rounded-full bg-[#CC73B3] px-3 py-0.5 text-xs font-medium text-white">
                              Direkomendasikan
                            </div>
                          )}
                          <div className="flex items-start gap-4">
                            <RadioGroupItem
                              value={option.id}
                              id={option.id}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <Label
                                  htmlFor={option.id}
                                  className="text-base font-medium text-foreground"
                                >
                                  {option.name}
                                </Label>
                                <span className="font-medium text-foreground">
                                  {option.price === 0
                                    ? 'Gratis'
                                    : `+$${option.price.toFixed(2)}`}
                                </span>
                              </div>
                              <p className="mt-1 text-sm text-muted-foreground">
                                {option.description}
                              </p>

                              {/* Materials breakdown */}
                              <div className="mt-4 space-y-2">
                                {option.materials.map((material) => (
                                  <div
                                    key={material.name}
                                    className="flex items-center justify-between text-sm"
                                  >
                                    <span className="text-muted-foreground">
                                      {material.name}:
                                    </span>
                                    <span className="font-medium text-foreground">
                                      {material.value}
                                    </span>
                                  </div>
                                ))}
                              </div>

                              {/* Impact badges */}
                              <div className="mt-4 flex flex-wrap gap-2">
                                <span className="inline-flex items-center gap-1 rounded-full bg-[#A4F000]/10 px-2.5 py-1 text-xs font-medium text-[#7AB800]">
                                  <Leaf className="h-3 w-3" />
                                  {option.impact.plastic} plastik
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full bg-[#A4F000]/10 px-2.5 py-1 text-xs font-medium text-[#7AB800]">
                                  <Recycle className="h-3 w-3" />
                                  {option.impact.compostable} dapat dikompos
                                </span>
                                {option.impact.carbonNeutral && (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-[#CC73B3]/10 px-2.5 py-1 text-xs font-medium text-[#CC73B3]">
                                    <Check className="h-3 w-3" />
                                    Netral Karbon
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Shipping Options */}
                  <div className="rounded-2xl border border-border bg-background p-6">
                    <div className="flex items-center gap-3">
                      <Truck className="h-6 w-6 text-[#A4F000]" />
                      <h2 className="text-xl font-semibold text-foreground">
                        Metode Pengiriman
                      </h2>
                    </div>

                    <RadioGroup
                      value={selectedShipping}
                      onValueChange={setSelectedShipping}
                      className="mt-6 space-y-3"
                    >
                      {shippingOptions.map((option) => (
                        <div
                          key={option.id}
                          className={`rounded-xl border-2 p-4 transition-all ${selectedShipping === option.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                            }`}
                        >
                          <div className="flex items-center gap-4">
                            <RadioGroupItem value={option.id} id={option.id} />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <Label
                                  htmlFor={option.id}
                                  className="font-medium text-foreground"
                                >
                                  {option.name}
                                </Label>
                                <span className="font-medium text-foreground">
                                  {option.price === 0
                                    ? 'Gratis'
                                    : `$${option.price.toFixed(2)}`}
                                </span>
                              </div>
                              <p className="mt-1 text-sm text-muted-foreground">
                                {option.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Kembali ke Keranjang
                    </Button>
                    <Button
                      className="flex-1 bg-primary text-primary-foreground hover:bg-[#8BD400]"
                      onClick={() => setStep(3)}
                    >
                      Lanjut ke Pembayaran
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  {/* Payment Form */}
                  <div className="rounded-2xl border border-border bg-background p-6">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-6 w-6 text-[#A4F000]" />
                      <h2 className="text-xl font-semibold text-foreground">
                        Detail Pembayaran
                      </h2>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="anda@contoh.com"
                          className="mt-1.5"
                        />
                      </div>

                      <Separator />

                      <div>
                        <Label htmlFor="name">Nama di Kartu</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          className="mt-1.5"
                        />
                      </div>

                      <div>
                        <Label htmlFor="card">Nomor Kartu</Label>
                        <Input
                          id="card"
                          placeholder="4242 4242 4242 4242"
                          className="mt-1.5"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Kedaluwarsa</Label>
                          <Input
                            id="expiry"
                            placeholder="BB/TT"
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvc">CVC</Label>
                          <Input
                            id="cvc"
                            placeholder="123"
                            className="mt-1.5"
                          />
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <Label htmlFor="address">Alamat Pengiriman</Label>
                        <Input
                          id="address"
                          placeholder="Jl. Hijau No. 123"
                          className="mt-1.5"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">Kota</Label>
                          <Input
                            id="city"
                            placeholder="Jakarta"
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="zip">Kode Pos</Label>
                          <Input
                            id="zip"
                            placeholder="12345"
                            className="mt-1.5"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    Informasi pembayaran Anda dienkripsi dan aman
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Kembali
                    </Button>
                    <Button
                      className="flex-1 bg-primary text-primary-foreground hover:bg-[#8BD400]"
                      asChild
                    >
                      <Link href="/checkout/success">
                        <ShieldCheck className="mr-2 h-5 w-5" />
                        Selesaikan Pesanan - ${total.toFixed(2)}
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-2xl border border-border bg-background p-6">
                  <h3 className="font-semibold text-foreground">Ringkasan Pesanan</h3>

                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Subtotal ({activeItems.length} item)
                      </span>
                      <span className="font-medium text-foreground">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Kemasan Eco</span>
                      <span className="font-medium text-foreground">
                        {packagingPrice === 0
                          ? 'Gratis'
                          : `$${packagingPrice.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Pengiriman</span>
                      <span className="font-medium text-foreground">
                        {shippingPrice === 0
                          ? 'Gratis'
                          : `$${shippingPrice.toFixed(2)}`}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="text-xl font-bold text-foreground">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Environmental Impact */}
                <div className="rounded-2xl border border-[#A4F000]/30 bg-[#A4F000]/5 p-6">
                  <div className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-[#A4F000]" />
                    <h3 className="font-semibold text-foreground">
                      Dampak Pesanan Anda
                    </h3>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Plastik Dicegah
                      </span>
                      <span className="font-semibold text-[#A4F000]">
                        {totalPlasticPrevented.toFixed(1)}kg
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Karbon Dihemat
                      </span>
                      <span className="font-semibold text-[#A4F000]">
                        {totalCarbonSaved.toFixed(1)}kg CO₂
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Kemasan
                      </span>
                      <span className="font-semibold text-[#A4F000]">
                        100% Dapat Dikompos
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-muted-foreground">
                    Terima kasih telah memilih berkelanjutan! Pembelian Anda membantu mendanai
                    inisiatif lingkungan.
                  </p>
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
