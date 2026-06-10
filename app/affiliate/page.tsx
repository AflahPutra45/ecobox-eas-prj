import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import {
  Link2, DollarSign, Users, TrendingUp, ArrowRight,
  CheckCircle, Star, Zap, Shield, Gift, BarChart3,
  Megaphone, Instagram, Youtube, Globe, Heart,
} from 'lucide-react'

// ─── Commission Tiers ─────────────────────────────────────────────────────────
const TIERS = [
  {
    name: 'Eco Starter',
    icon: '🌱',
    commission: 5,
    minSales: 0,
    maxSales: 4999999,
    color: 'border-border',
    ringColor: '',
    perks: ['Link afiliasi unik', 'Dashboard statistik', 'Materi promosi dasar', 'Pembayaran bulanan'],
  },
  {
    name: 'Eco Advocate',
    icon: '🌿',
    commission: 8,
    minSales: 5000000,
    maxSales: 19999999,
    color: 'border-primary',
    ringColor: 'ring-2 ring-primary/20',
    badge: 'Paling Populer',
    perks: ['Semua Starter', 'Komisi 8% per transaksi', 'Akses produk eksklusif', 'Priority support', 'Weekly payout'],
  },
  {
    name: 'Eco Influencer',
    icon: '🌳',
    commission: 12,
    minSales: 20000000,
    maxSales: null,
    color: 'border-[#CC73B3]',
    ringColor: 'ring-2 ring-[#CC73B3]/20',
    badge: 'Elite',
    perks: ['Semua Advocate', 'Komisi 12% per transaksi', 'Co-branding eksklusif', 'Account manager dedikasi', 'Daily payout', 'Bonus kuartalan'],
  },
]

// ─── How It Works ─────────────────────────────────────────────────────────────
const HOW_IT_WORKS = [
  { step: '1', icon: Megaphone, title: 'Daftar & Dapatkan Link', desc: 'Daftar program afiliasi EcoBox gratis. Dapatkan link unik personalmu dalam hitungan menit.' },
  { step: '2', icon: Link2, title: 'Bagikan ke Komunitasmu', desc: 'Sebarkan link ke Instagram, TikTok, YouTube, WhatsApp, atau blog — platform mana pun yang kamu gunakan.' },
  { step: '3', icon: DollarSign, title: 'Dapatkan Komisi', desc: 'Setiap transaksi melalui linkmu menghasilkan komisi 5–12%. Makin banyak penjualan, makin tinggi tier-mu.' },
  { step: '4', icon: Gift, title: 'Cairkan Komisi', desc: 'Cairkan ke rekening bank, GoPay, atau OVO kapan saja. Minimum pencairan hanya Rp 50.000.' },
]

// ─── Who Is This For ──────────────────────────────────────────────────────────
const PERSONAS = [
  { icon: Instagram, label: 'Nano & Micro Influencer', desc: 'Konten kreator dengan 500–50K followers yang passionate tentang eco-friendly lifestyle.', color: 'bg-[#A4F000]/10 text-[#A4F000]' },
  { icon: Youtube, label: 'Content Creator', desc: 'YouTuber, blogger, atau podcaster yang membahas sustainability, zero waste, atau gaya hidup hijau.', color: 'bg-red-50 text-red-500' },
  { icon: Users, label: 'Pelanggan Setia', desc: 'Pembeli reguler EcoBox yang ingin berbagi produk favorit sambil menghasilkan penghasilan tambahan.', color: 'bg-[#CC73B3]/10 text-[#CC73B3]' },
  { icon: Globe, label: 'Komunitas & Komunitas', desc: 'Admin grup WhatsApp, Telegram, atau komunitas eco-conscious yang ingin memberi nilai tambah bagi anggotanya.', color: 'bg-blue-50 text-blue-600' },
]

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: 'Rina Amelia',
    handle: '@rina.ecolife',
    platform: 'Instagram · 12K followers',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
    text: 'Dalam 3 bulan pertama saya sudah di tier Eco Advocate. Produk EcoBox sangat mudah dijual karena audiens saya memang peduli lingkungan.',
    earned: 'Rp 2.4 Juta/bulan',
    tier: 'Eco Advocate',
  },
  {
    name: 'Dimas Prakosa',
    handle: '@dimasprakosa',
    platform: 'TikTok · 45K followers',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
    text: 'Satu video TikTok tentang sikat gigi bambu menghasilkan 200+ konversi. Komisinya langsung cair ke GoPay saya.',
    earned: 'Rp 5.8 Juta/bulan',
    tier: 'Eco Influencer',
  },
  {
    name: 'Sinta Dewi',
    handle: 'WhatsApp Group Admin',
    platform: 'Komunitas Zero Waste · 800 anggota',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop&crop=face',
    text: 'Tidak perlu followers jutaan. Grup WhatsApp saya yang 800 orang sudah cukup untuk menghasilkan komisi konsisten setiap bulan.',
    earned: 'Rp 850K/bulan',
    tier: 'Eco Starter',
  },
]

// ─── FAQs ─────────────────────────────────────────────────────────────────────
const FAQS = [
  { q: 'Berapa minimum followers untuk mendaftar?', a: 'Tidak ada minimum followers! Siapapun bisa mendaftar — dari pelanggan biasa hingga influencer besar. Yang penting adalah kamu punya komunitas yang peduli lingkungan, berapapun ukurannya.' },
  { q: 'Berapa lama cookie tracking berlaku?', a: 'Cookie tracking berlaku selama 30 hari. Jika seseorang mengklik linkmu dan melakukan pembelian dalam 30 hari, komisi tetap terhitung untukmu.' },
  { q: 'Kapan komisi dibayarkan?', a: 'Tier Starter: pembayaran bulanan (setiap tanggal 1). Tier Advocate: mingguan. Tier Influencer: harian. Semua pembayaran dikonfirmasi setelah masa return (14 hari) selesai.' },
  { q: 'Produk apa saja yang bisa saya promosikan?', a: 'Seluruh katalog produk EcoBox, termasuk produk baru yang diluncurkan. Kamu juga mendapat akses early ke produk eksklusif sebelum dijual ke publik.' },
  { q: 'Apakah ada biaya untuk bergabung?', a: 'Tidak ada biaya apapun. Program afiliasi EcoBox 100% gratis untuk bergabung dan tetap gratis selama Anda aktif.' },
]

export default function AffiliatePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-foreground py-20 lg:py-28">
          <div className="absolute inset-0 -z-10">
            <div className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/3 translate-x-1/4 rounded-full bg-[#A4F000]/15 blur-3xl" />
            <div className="absolute left-0 bottom-0 h-[400px] w-[400px] translate-y-1/3 -translate-x-1/4 rounded-full bg-[#CC73B3]/15 blur-3xl" />
          </div>
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#A4F000]/30 bg-[#A4F000]/10 px-4 py-1.5 text-sm font-medium text-[#A4F000]">
                  <Link2 className="h-4 w-4" />
                  Program Afiliasi & Referral EcoBox
                </div>
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-background sm:text-5xl lg:text-6xl">
                  Bagikan,{' '}
                  <span className="text-[#A4F000]">Dampak &</span>{' '}
                  Hasilkan
                </h1>
                <p className="mt-6 text-lg text-background/75">
                  Rekomendasikan produk eco-friendly EcoBox kepada komunitasmu dan dapatkan komisi <strong className="text-[#A4F000]">5–12%</strong> dari setiap transaksi. Gratis bergabung, tanpa minimum followers.
                </p>

                <div className="mt-8 flex flex-wrap gap-5 text-sm text-background/70">
                  {[
                    { icon: CheckCircle, label: 'Gratis bergabung' },
                    { icon: Zap, label: 'Link aktif instan' },
                    { icon: Shield, label: '30 hari cookie tracking' },
                    { icon: DollarSign, label: 'Min. cairkan Rp 50K' },
                  ].map((b) => (
                    <div key={b.label} className="flex items-center gap-2">
                      <b.icon className="h-4 w-4 text-[#A4F000]" />
                      <span>{b.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-[#8BD400]" asChild>
                    <Link href="/affiliate/dashboard">
                      Daftar Sekarang — Gratis <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-background/30 text-background hover:bg-background/10" asChild>
                    <Link href="/affiliate/dashboard">Masuk Dashboard</Link>
                  </Button>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '12%', label: 'Komisi Tertinggi', sub: 'Tier Eco Influencer', icon: '💰' },
                  { value: '2.500+', label: 'Afiliator Aktif', sub: 'Di seluruh Indonesia', icon: '👥' },
                  { value: 'Rp 8,5M', label: 'Komisi Tertinggi/Bulan', sub: 'Afiliator terbaik kami', icon: '🏆' },
                  { value: '30 Hari', label: 'Cookie Tracking', sub: 'Validitas klik', icon: '🔗' },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-background/10 bg-background/5 p-5 backdrop-blur-sm">
                    <p className="text-3xl">{s.icon}</p>
                    <p className="mt-2 text-2xl font-bold text-[#A4F000]">{s.value}</p>
                    <p className="text-sm font-medium text-background">{s.label}</p>
                    <p className="text-xs text-background/60">{s.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── How It Works ─────────────────────────────────────────────────── */}
        <section className="border-b border-border py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">Cara Kerjanya</h2>
            <p className="mt-3 text-center text-muted-foreground">4 langkah mudah dari daftar hingga komisi cair</p>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {HOW_IT_WORKS.map((step, idx) => (
                <div key={step.step} className="relative text-center">
                  {idx < HOW_IT_WORKS.length - 1 && (
                    <div className="absolute left-1/2 top-8 hidden h-0.5 w-full -translate-y-1/2 bg-gradient-to-r from-primary/50 to-transparent lg:block" />
                  )}
                  <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <step.icon className="h-8 w-8 text-primary" />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Commission Tiers ──────────────────────────────────────────────── */}
        <section className="bg-muted/30 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Tier Komisi Berjenjang</h2>
              <p className="mt-3 text-muted-foreground">
                Makin tinggi total penjualanmu, makin besar komisi yang kamu dapatkan — naik tier otomatis!
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {TIERS.map((tier) => (
                <div key={tier.name}
                  className={`relative rounded-2xl border-2 ${tier.color} ${tier.ringColor} bg-background p-6`}>
                  {tier.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                        {tier.badge}
                      </span>
                    </div>
                  )}

                  <div className="text-center">
                    <p className="text-4xl">{tier.icon}</p>
                    <p className="mt-2 text-lg font-bold text-foreground">{tier.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {tier.maxSales
                        ? `Penjualan s.d. Rp ${(tier.maxSales / 1000000).toFixed(0)}Jt`
                        : `Penjualan ≥ Rp ${(tier.minSales / 1000000).toFixed(0)}Jt`}
                    </p>
                  </div>

                  <div className="mt-4 text-center">
                    <span className="text-5xl font-bold text-[#A4F000]">{tier.commission}%</span>
                    <p className="text-sm text-muted-foreground">komisi per transaksi</p>
                  </div>

                  <ul className="mt-6 space-y-2.5">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 shrink-0 text-[#A4F000]" />
                        {perk}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`mt-6 w-full ${tier.badge === 'Paling Populer' ? 'bg-primary text-primary-foreground hover:bg-[#8BD400]' : ''}`}
                    variant={tier.badge === 'Paling Populer' ? 'default' : 'outline'}
                    asChild
                  >
                    <Link href="/affiliate/dashboard">Mulai di Tier Ini <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Semua orang mulai dari Eco Starter. Naik tier otomatis berdasarkan total penjualan kumulatif.
            </p>
          </div>
        </section>

        {/* ── Who Is This For ───────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">Siapa yang Cocok?</h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {PERSONAS.map((p) => (
                <div key={p.label} className="rounded-2xl border border-border bg-background p-5 text-center">
                  <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl ${p.color}`}>
                    <p.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-3 font-semibold text-foreground">{p.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ─────────────────────────────────────────────────── */}
        <section className="border-t border-border bg-muted/30 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">Afiliator Terbaik Kami</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="rounded-2xl border border-border bg-background p-6">
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-[#A4F000] font-medium">{t.handle}</p>
                      <p className="text-xs text-muted-foreground">{t.platform}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
                  <div className="mt-4 flex items-center justify-between rounded-xl bg-[#A4F000]/10 px-3 py-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Komisi rata-rata</p>
                      <p className="font-bold text-[#5a8500]">{t.earned}</p>
                    </div>
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                      {t.tier}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-4 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">Pertanyaan Umum</h2>
            <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-background overflow-hidden">
              {FAQS.map((faq) => (
                <div key={faq.q} className="px-6 py-5">
                  <p className="font-medium text-foreground">{faq.q}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="border-t border-border bg-foreground py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#A4F000]/10">
              <Heart className="h-8 w-8 text-[#A4F000]" />
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-background sm:text-4xl">
              Jadi Advokat Brand EcoBox
            </h2>
            <p className="mt-4 text-lg text-background/70">
              Bergabunglah dengan 2.500+ afiliator yang sudah menghasilkan komisi sambil menyebarkan dampak positif bagi lingkungan.
            </p>
            <Button size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-[#8BD400]" asChild>
              <Link href="/affiliate/dashboard">
                Daftar Gratis Sekarang <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
