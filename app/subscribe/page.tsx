'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { products } from '@/lib/data'
import { formatRupiah } from '@/lib/utils'
import {
  RefreshCcw, Leaf, BadgePercent, Truck, Shield,
  Check, ChevronDown, ChevronUp, Star, ArrowRight,
  Zap, Clock, Heart, Bell,
} from 'lucide-react'

// ─── Subscription-eligible products (personal care & home) ───────────────────
const SUBSCRIBE_PRODUCT_IDS = ['3', '5', '8', '4', '1', '6']

const FREQUENCIES = [
  { id: 'weekly', label: 'Mingguan', sub: 'Setiap 7 hari', discount: 15 },
  { id: 'biweekly', label: '2 Minggu', sub: 'Setiap 14 hari', discount: 12 },
  { id: 'monthly', label: 'Bulanan', sub: 'Setiap 30 hari', discount: 10 },
]

const BENEFITS = [
  { icon: BadgePercent, title: 'Hemat 10–15%', desc: 'Diskon otomatis di setiap pengiriman berlangganan, lebih hemat dari harga eceran.', color: 'bg-[#A4F000]/10 text-[#A4F000]' },
  { icon: Truck, title: 'Gratis Ongkir', desc: 'Semua pengiriman berlangganan bebas ongkos kirim ke seluruh Indonesia.', color: 'bg-blue-50 text-blue-600' },
  { icon: Shield, title: 'Prioritas Stok', desc: 'Pelanggan berlangganan selalu mendapat prioritas ketika stok terbatas.', color: 'bg-[#CC73B3]/10 text-[#CC73B3]' },
  { icon: Clock, title: 'Fleksibel & Mudah', desc: 'Ubah jadwal, jeda, atau batalkan kapan saja — tanpa biaya penalti.', color: 'bg-amber-50 text-amber-600' },
  { icon: Bell, title: 'Notifikasi Otomatis', desc: 'Pengingat 3 hari sebelum pengiriman agar Anda selalu siap.', color: 'bg-purple-50 text-purple-600' },
  { icon: Leaf, title: 'Dampak Lebih Besar', desc: 'Komitmen langganan membantu kami merencanakan produksi tanpa limbah.', color: 'bg-emerald-50 text-emerald-600' },
]

const FAQS = [
  { q: 'Kapan saya bisa membatalkan langganan?', a: 'Kapan saja, tanpa biaya penalti. Anda dapat membatalkan dari halaman Kelola Langganan sebelum tanggal pengiriman berikutnya.' },
  { q: 'Bisakah saya menjeda langganan sementara?', a: 'Ya! Anda dapat menjeda pengiriman hingga 90 hari dari dashboard langganan tanpa kehilangan diskon berlangganan.' },
  { q: 'Bagaimana cara mengubah frekuensi pengiriman?', a: 'Masuk ke halaman Kelola Langganan, klik produk yang ingin diubah, lalu pilih frekuensi baru. Perubahan berlaku di pengiriman berikutnya.' },
  { q: 'Apakah harga bisa berubah?', a: 'Harga yang Anda kunci saat berlangganan tetap berlaku selama 6 bulan. Kami akan memberi tahu 30 hari sebelum ada perubahan harga.' },
  { q: 'Metode pembayaran apa yang diterima?', a: 'Kartu kredit/debit, transfer bank, GoPay, OVO, dan QRIS. Pembayaran diproses otomatis sebelum setiap pengiriman.' },
]

const TESTIMONIALS = [
  { name: 'Sari W.', role: 'Ibu rumah tangga, Jakarta', text: 'Sikat gigi bambu datang tiap bulan tanpa harus ingat order ulang. Hemat 15% dan ongkir gratis. Perfect!', rating: 5 },
  { name: 'Dian P.', role: 'Pekerja kantoran, Bandung', text: 'Saya langganan detergen lerak mingguan. Stok selalu ada, tagihan lebih murah, dan lingkungan lebih terjaga.', rating: 5 },
  { name: 'Rudi H.', role: 'Desainer, Surabaya', text: 'Fitur jeda sangat membantu saat liburan. Tidak perlu cancel dan daftar ulang. Recommended!', rating: 5 },
]

export default function SubscribePage() {
  const [selectedFreq, setSelectedFreq] = useState('monthly')
  const [cart, setCart] = useState<Record<string, boolean>>({})
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)

  const freq = FREQUENCIES.find((f) => f.id === selectedFreq)!
  const subscribeProducts = products.filter((p) => SUBSCRIBE_PRODUCT_IDS.includes(p.id))
  const selectedProducts = subscribeProducts.filter((p) => cart[p.id])

  const subtotal = selectedProducts.reduce((s, p) => s + p.price, 0)
  const saving = Math.round(subtotal * (freq.discount / 100))
  const total = subtotal - saving

  const toggleProduct = (id: string) =>
    setCart((prev) => ({ ...prev, [id]: !prev[id] }))

  const handleSubscribe = async () => {
    if (selectedProducts.length === 0) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1800))
    setLoading(false)
    setSubscribed(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-foreground py-20 lg:py-28">
          <div className="absolute inset-0 -z-10">
            <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-[#A4F000]/15 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-[#CC73B3]/15 blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#A4F000]/30 bg-[#A4F000]/10 px-4 py-1.5 text-sm font-medium text-[#A4F000]">
                <RefreshCcw className="h-4 w-4" />
                Langganan Rutin Eco-Friendly
              </div>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-background sm:text-5xl lg:text-6xl">
                Eco-Friendly Otomatis,{' '}
                <span className="text-[#A4F000]">Hemat & Praktis</span>
              </h1>
              <p className="mt-6 text-lg text-background/75 lg:text-xl">
                Atur pengiriman produk kebutuhan rumah tangga ramah lingkungan secara otomatis — mingguan atau bulanan. Hemat hingga <strong className="text-[#A4F000]">15%</strong>, gratis ongkir, dan prioritas stok.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
                {[
                  { icon: BadgePercent, label: 'Hemat 10–15%' },
                  { icon: Truck, label: 'Gratis Ongkir' },
                  { icon: RefreshCcw, label: 'Batalkan Kapan Saja' },
                ].map((b) => (
                  <div key={b.label} className="flex items-center gap-2 text-background/80">
                    <b.icon className="h-4 w-4 text-[#A4F000]" />
                    <span>{b.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-[#8BD400]"
                  onClick={() => document.getElementById('pilih-produk')?.scrollIntoView({ behavior: 'smooth' })}>
                  Mulai Berlangganan <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-background/30 text-background hover:bg-background/10" asChild>
                  <Link href="/subscribe/manage">Kelola Langganan</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Benefits ──────────────────────────────────────────────────────── */}
        <section className="border-b border-border py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">
              Kenapa Berlangganan EcoBox?
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {BENEFITS.map((b) => (
                <div key={b.title} className="rounded-2xl border border-border bg-background p-5">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${b.color}`}>
                    <b.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Product + Frequency Selector ──────────────────────────────────── */}
        <section id="pilih-produk" className="bg-muted/30 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Pilih Produk & Frekuensi
              </h2>
              <p className="mt-3 text-muted-foreground">
                Pilih produk yang ingin dikirim otomatis, lalu tentukan seberapa sering.
              </p>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-3">
              {/* Left: product grid */}
              <div className="lg:col-span-2 space-y-3">
                <p className="text-sm font-semibold text-foreground">1. Pilih Produk</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {subscribeProducts.map((p) => {
                    const selected = !!cart[p.id]
                    const discounted = Math.round(p.price * (1 - freq.discount / 100))
                    return (
                      <button
                        key={p.id}
                        onClick={() => toggleProduct(p.id)}
                        className={`relative rounded-2xl border-2 bg-background p-4 text-left transition-all ${selected ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/40'}`}
                      >
                        {selected && (
                          <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                            <Check className="h-4 w-4 text-primary-foreground" />
                          </div>
                        )}
                        <div className="flex gap-3">
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                            <Image src={p.image} alt={p.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="line-clamp-1 text-sm font-semibold text-foreground">{p.name}</p>
                            <p className="text-xs text-muted-foreground">{p.vendor.name}</p>
                            <div className="mt-1.5 flex items-baseline gap-2">
                              <span className="font-bold text-foreground">{formatRupiah(discounted)}</span>
                              <span className="text-xs text-muted-foreground line-through">{formatRupiah(p.price)}</span>
                              <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-xs font-semibold text-primary">
                                -{freq.discount}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Right: frequency + summary */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-foreground mb-3">2. Pilih Frekuensi</p>
                  <div className="space-y-2">
                    {FREQUENCIES.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setSelectedFreq(f.id)}
                        className={`w-full rounded-xl border-2 p-3.5 text-left transition-all ${selectedFreq === f.id ? 'border-primary bg-primary/5' : 'border-border bg-background hover:border-primary/40'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-foreground">{f.label}</p>
                            <p className="text-xs text-muted-foreground">{f.sub}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="rounded-full bg-[#A4F000]/10 px-2 py-0.5 text-xs font-bold text-[#5a8500]">
                              Hemat {f.discount}%
                            </span>
                            {f.id === 'weekly' && (
                              <span className="rounded-full bg-[#CC73B3]/10 px-2 py-0.5 text-xs font-medium text-[#CC73B3]">
                                Terbaik
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Summary card */}
                <div className="rounded-2xl border border-border bg-background p-5">
                  <p className="text-sm font-semibold text-foreground mb-3">Ringkasan</p>
                  {selectedProducts.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Belum ada produk dipilih
                    </p>
                  ) : (
                    <div className="space-y-2 text-sm">
                      {selectedProducts.map((p) => (
                        <div key={p.id} className="flex justify-between text-muted-foreground">
                          <span className="line-clamp-1 flex-1 pr-2">{p.name}</span>
                          <span>{formatRupiah(p.price)}</span>
                        </div>
                      ))}
                      <div className="border-t border-border pt-2 flex justify-between text-muted-foreground">
                        <span>Subtotal</span>
                        <span>{formatRupiah(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-[#5a8500] font-medium">
                        <span>Diskon {freq.discount}% ({freq.label})</span>
                        <span>-{formatRupiah(saving)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Ongkos kirim</span>
                        <span className="text-[#5a8500] font-medium">Gratis</span>
                      </div>
                      <div className="border-t border-border pt-2 flex justify-between font-bold text-foreground text-base">
                        <span>Total / {freq.label}</span>
                        <span>{formatRupiah(total)}</span>
                      </div>
                      <div className="rounded-lg bg-[#A4F000]/10 px-3 py-2 text-xs text-[#5a8500] font-medium text-center">
                        💰 Hemat {formatRupiah(saving)} setiap {freq.sub.toLowerCase()}
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={handleSubscribe}
                    disabled={selectedProducts.length === 0 || loading || subscribed}
                    className="mt-4 w-full bg-primary text-primary-foreground hover:bg-[#8BD400]"
                    size="lg"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Memproses...
                      </span>
                    ) : subscribed ? (
                      <span className="flex items-center gap-2">
                        <Check className="h-4 w-4" /> Langganan Aktif!
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <RefreshCcw className="h-4 w-4" /> Mulai Berlangganan
                      </span>
                    )}
                  </Button>

                  {subscribed && (
                    <div className="mt-3 text-center">
                      <Link href="/subscribe/manage" className="text-sm font-medium text-primary hover:underline">
                        Kelola Langganan →
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── How it works ──────────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">
              Cara Kerja Langganan EcoBox
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { step: '1', icon: Heart, title: 'Pilih Produk', desc: 'Pilih produk eco-friendly yang ingin dikirim otomatis ke rumah Anda.' },
                { step: '2', icon: RefreshCcw, title: 'Atur Frekuensi', desc: 'Pilih mingguan, 2 mingguan, atau bulanan sesuai kebutuhan Anda.' },
                { step: '3', icon: Zap, title: 'Konfirmasi & Bayar', desc: 'Pembayaran pertama diproses, lalu otomatis di setiap siklus berikutnya.' },
                { step: '4', icon: Truck, title: 'Terima Kiriman', desc: 'Produk tiba tepat waktu. Ubah atau batalkan kapan saja tanpa penalti.' },
              ].map((s) => (
                <div key={s.step} className="relative text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <s.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute -right-3 top-4 hidden h-0.5 w-full bg-gradient-to-r from-primary/30 to-transparent lg:block" />
                  <p className="mt-1 text-xs font-bold text-primary">Langkah {s.step}</p>
                  <h3 className="mt-3 font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ──────────────────────────────────────────────────── */}
        <section className="border-t border-border bg-muted/30 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">
              Pelanggan Setia EcoBox
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="rounded-2xl border border-border bg-background p-6">
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
                  <div className="mt-5 border-t border-border pt-4">
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-4 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">
              Pertanyaan yang Sering Diajukan
            </h2>
            <div className="mt-10 space-y-3">
              {FAQS.map((faq, i) => (
                <div key={i} className="rounded-xl border border-border bg-background">
                  <button
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-medium text-foreground">{faq.q}</span>
                    {openFaq === i
                      ? <ChevronUp className="h-5 w-5 shrink-0 text-muted-foreground" />
                      : <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
                    }
                  </button>
                  {openFaq === i && (
                    <div className="border-t border-border px-5 pb-4 pt-3">
                      <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Bottom ────────────────────────────────────────────────────── */}
        <section className="border-t border-border bg-foreground py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#A4F000]/10">
              <RefreshCcw className="h-8 w-8 text-[#A4F000]" />
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-background sm:text-4xl">
              Eco-Friendly Tanpa Usaha Ekstra
            </h2>
            <p className="mt-4 text-lg text-background/70">
              Mulai berlangganan sekarang — hemat lebih banyak, dan buat gaya hidup ramah lingkungan jadi kebiasaan otomatis.
            </p>
            <Button
              size="lg"
              className="mt-8 bg-primary text-primary-foreground hover:bg-[#8BD400]"
              onClick={() => document.getElementById('pilih-produk')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Mulai Berlangganan Sekarang <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
