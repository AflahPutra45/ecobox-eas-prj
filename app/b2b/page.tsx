import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Building2, FileText, TrendingDown, PackageSearch,
  UserCheck, ArrowRight, CheckCircle, Leaf, Star,
  ShieldCheck, BarChart3, Zap, Clock, Globe,
} from 'lucide-react'

// ─── Tiered Pricing Data ─────────────────────────────────────────────────────
const tiers = [
  {
    name: 'Starter',
    minQty: 50,
    maxQty: 199,
    discount: 10,
    badge: null,
    color: 'border-border',
    features: ['Akses katalog B2B', 'Faktur digital', 'Support email'],
  },
  {
    name: 'Business',
    minQty: 200,
    maxQty: 999,
    discount: 20,
    badge: 'Paling Populer',
    color: 'border-primary',
    features: ['Semua fitur Starter', 'Account manager dedikasi', 'Net-30 payment terms', 'Custom labeling'],
  },
  {
    name: 'Enterprise',
    minQty: 1000,
    maxQty: null,
    discount: 35,
    badge: 'Terbaik',
    color: 'border-[#CC73B3]',
    features: ['Semua fitur Business', 'SLA pengiriman prioritas', 'Laporan dampak ESG', 'Co-branding eksklusif', 'API integration'],
  },
]

// ─── Features ─────────────────────────────────────────────────────────────────
const features = [
  {
    icon: FileText,
    title: 'Request for Quotation (RFQ)',
    description: 'Ajukan permintaan penawaran harga otomatis berdasarkan volume pesanan. Sistem kami menghitung harga grosir secara real-time dan mengirimkan penawaran resmi dalam 24 jam kerja.',
    color: 'bg-[#A4F000]/10 text-[#A4F000]',
  },
  {
    icon: TrendingDown,
    title: 'Tiered Wholesale Pricing',
    description: 'Harga menyesuaikan otomatis sesuai kuantitas pesanan. Semakin besar volume, semakin besar diskon — tanpa negosiasi manual yang membuang waktu.',
    color: 'bg-[#CC73B3]/10 text-[#CC73B3]',
  },
  {
    icon: PackageSearch,
    title: 'Order Tracking B2B',
    description: 'Pantau status setiap pesanan massal secara real-time — dari proses, pengemas, pengiriman, hingga tiba di tangan Anda. Notifikasi otomatis di setiap milestone.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: UserCheck,
    title: 'Dedicated Account Manager',
    description: 'Setiap mitra korporat mendapatkan account manager personal yang siap membantu perencanaan pengadaan rutin, negosiasi khusus, dan laporan dampak lingkungan.',
    color: 'bg-amber-50 text-amber-600',
  },
]

// ─── Clients / Use Cases ──────────────────────────────────────────────────────
const useCases = [
  { icon: Building2, label: 'Kantor & Korporat' },
  { icon: Globe, label: 'Event Organizer' },
  { icon: Star, label: 'Hotel & Hospitality' },
  { icon: ShieldCheck, label: 'Instansi Pemerintah' },
  { icon: BarChart3, label: 'Retail & Distributor' },
  { icon: Zap, label: 'Startup & Scaleup' },
]

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    quote: 'EcoBox B2B membantu kami memenuhi target ESG perusahaan. Diskon 35% untuk pembelian >1000 unit sangat signifikan untuk anggaran kami.',
    name: 'Risa Andriani',
    role: 'Head of Procurement — PT Maju Bersama',
    rating: 5,
  },
  {
    quote: 'RFQ-nya sangat cepat. Dalam 4 jam kami sudah dapat penawaran resmi dengan harga yang kompetitif. Account manager kami sangat responsif.',
    name: 'Bimo Satria',
    role: 'Operations Director — GreenEvent Co.',
    rating: 5,
  },
  {
    quote: 'Order tracking real-time membuat tim kami tidak perlu menelepon berulang kali untuk cek status. Sangat efisien untuk event berskala besar.',
    name: 'Dewi Pertiwi',
    role: 'Event Manager — Konveksi Hijau',
    rating: 5,
  },
]

export default function B2BPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-foreground py-20 lg:py-28">
          <div className="absolute inset-0 -z-10">
            <div className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/3 translate-x-1/4 rounded-full bg-[#A4F000]/15 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-[400px] w-[400px] translate-y-1/3 -translate-x-1/4 rounded-full bg-[#CC73B3]/15 blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#A4F000]/30 bg-[#A4F000]/10 px-4 py-1.5 text-sm font-medium text-[#A4F000]">
                  <Building2 className="h-4 w-4" />
                  Portal B2B Eksklusif
                </div>
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-background sm:text-5xl lg:text-6xl">
                  Pengadaan Eco{' '}
                  <span className="text-[#A4F000]">Skala Besar,</span>{' '}
                  Harga Terbaik
                </h1>
                <p className="mt-6 text-lg text-background/75 lg:text-xl">
                  Platform B2B EcoBox dirancang untuk institusi, kantor, dan event organizer yang membutuhkan produk ramah lingkungan dalam volume besar — dengan sistem RFQ, harga grosir berjenjang, dan pendampingan account manager dedikasi.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-[#8BD400]" asChild>
                    <Link href="/b2b/rfq">
                      Ajukan RFQ Sekarang <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-background/30 text-background hover:bg-background/10" asChild>
                    <Link href="/b2b/portal">Masuk Portal B2B</Link>
                  </Button>
                </div>
              </div>

              {/* Stats card */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 'Rp 0', label: 'Biaya Daftar', sub: 'Gratis selamanya' },
                  { value: '35%', label: 'Diskon Maks.', sub: 'Untuk ≥1.000 unit' },
                  { value: '24 Jam', label: 'Respons RFQ', sub: 'Hari kerja' },
                  { value: '500+', label: 'Mitra Korporat', sub: 'Di seluruh Indonesia' },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-background/10 bg-background/5 p-5 backdrop-blur-sm">
                    <p className="text-3xl font-bold text-[#A4F000]">{s.value}</p>
                    <p className="mt-1 text-sm font-medium text-background">{s.label}</p>
                    <p className="text-xs text-background/60">{s.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Use Cases ─────────────────────────────────────────────────────── */}
        <section className="border-b border-border bg-muted/30 py-8">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <p className="mb-6 text-center text-sm text-muted-foreground">Dipercaya oleh berbagai jenis institusi</p>
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
              {useCases.map((u) => (
                <div key={u.label} className="flex flex-col items-center gap-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background border border-border">
                    <u.icon className="h-6 w-6 text-[#A4F000]" />
                  </div>
                  <p className="text-xs font-medium text-muted-foreground">{u.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ──────────────────────────────────────────────────────── */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Semua yang Dibutuhkan Tim Pengadaan
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Empat fitur inti yang membuat pengadaan produk ramah lingkungan skala besar menjadi mudah dan efisien.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {features.map((f) => (
                <div key={f.title} className="rounded-2xl border border-border bg-background p-6">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${f.color}`}>
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-foreground">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tiered Pricing ────────────────────────────────────────────────── */}
        <section className="border-t border-border bg-muted/30 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Tiered Wholesale Pricing
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Harga otomatis menyesuaikan volume pesanan — tanpa negosiasi, tanpa ribet.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`relative rounded-2xl border-2 ${tier.color} bg-background p-6 ${tier.badge ? 'ring-2 ring-primary/20' : ''}`}
                >
                  {tier.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                        {tier.badge}
                      </span>
                    </div>
                  )}

                  <div>
                    <p className="text-lg font-bold text-foreground">{tier.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {tier.minQty}–{tier.maxQty ? tier.maxQty : '∞'} unit per pesanan
                    </p>
                  </div>

                  <div className="mt-4">
                    <span className="text-5xl font-bold text-[#A4F000]">{tier.discount}%</span>
                    <span className="ml-2 text-sm text-muted-foreground">diskon dari harga eceran</span>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 shrink-0 text-[#A4F000]" />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`mt-6 w-full ${tier.badge ? 'bg-primary text-primary-foreground hover:bg-[#8BD400]' : 'border border-border bg-background text-foreground hover:bg-muted'}`}
                    variant={tier.badge ? 'default' : 'outline'}
                    asChild
                  >
                    <Link href="/b2b/rfq">Ajukan RFQ <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Butuh volume lebih dari 5.000 unit atau harga khusus?{' '}
              <Link href="/b2b/rfq" className="font-medium text-primary hover:underline">
                Hubungi tim kami langsung →
              </Link>
            </p>
          </div>
        </section>

        {/* ── Testimonials ──────────────────────────────────────────────────── */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Apa Kata Mitra B2B Kami
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {testimonials.map((t) => (
                <div key={t.name} className="rounded-2xl border border-border bg-background p-6">
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">"{t.quote}"</p>
                  <div className="mt-6 border-t border-border pt-4">
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <section className="border-t border-border bg-foreground py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#A4F000]/10">
              <Leaf className="h-8 w-8 text-[#A4F000]" />
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-background sm:text-4xl">
              Siap Memulai Pengadaan Massal?
            </h2>
            <p className="mt-4 text-lg text-background/70">
              Ajukan RFQ sekarang dan dapatkan penawaran harga grosir resmi dalam 24 jam kerja. Gratis, tanpa komitmen.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-[#8BD400]" asChild>
                <Link href="/b2b/rfq">
                  Ajukan RFQ Sekarang <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-background/30 text-background hover:bg-background/10" asChild>
                <Link href="/b2b/portal">Masuk Portal B2B</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
