'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { formatRupiah } from '@/lib/utils'
import {
  Link2, Copy, Check, TrendingUp, DollarSign,
  Users, BarChart3, Clock, ArrowRight, ExternalLink,
  Download, ChevronUp, ChevronDown, Share2,
  Instagram, Twitter, MessageSquare, Star,
} from 'lucide-react'

// ─── Demo Affiliate Data ───────────────────────────────────────────────────────
const AFFILIATE = {
  name: 'Rina Amelia',
  handle: '@rina.ecolife',
  tier: 'Eco Advocate',
  tierIcon: '🌿',
  commission: 8,
  code: 'RINA-ECO',
  referralLink: 'https://ecobox.id/r/RINA-ECO',
  joinDate: '15 Jan 2026',
  nextTierName: 'Eco Influencer',
  nextTierTarget: 20000000,
  currentSales: 12450000,
  payoutMethod: 'GoPay · 0812-3456-7890',
}

// ─── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  { label: 'Total Komisi', value: formatRupiah(1845000), icon: DollarSign, color: 'text-[#A4F000]', bg: 'bg-[#A4F000]/10' },
  { label: 'Total Klik', value: '3.241', icon: BarChart3, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Konversi', value: '187 order', icon: Users, color: 'text-[#CC73B3]', bg: 'bg-[#CC73B3]/10' },
  { label: 'Conversion Rate', value: '5.77%', icon: TrendingUp, color: 'text-amber-500', bg: 'bg-amber-50' },
]

// ─── Top products ─────────────────────────────────────────────────────────────
const TOP_PRODUCTS = [
  { name: 'Set Sikat Gigi Bambu Natural', clicks: 842, orders: 67, commission: formatRupiah(64320), convRate: '7.95%' },
  { name: 'Tas Tote Katun Organik', clicks: 613, orders: 41, commission: formatRupiah(58320), convRate: '6.69%' },
  { name: 'Set Bungkus Makanan Lilin Lebah', clicks: 489, orders: 28, commission: formatRupiah(85120), convRate: '5.73%' },
  { name: 'Kit Semprotan Pembersih Isi Ulang', clicks: 321, orders: 19, commission: formatRupiah(38000), convRate: '5.92%' },
]

// ─── Payout history ───────────────────────────────────────────────────────────
const PAYOUTS = [
  { date: '1 Jun 2026', amount: 654000, status: 'Cair', method: 'GoPay', period: 'Mei 2026' },
  { date: '1 Mei 2026', amount: 512000, status: 'Cair', method: 'GoPay', period: 'Apr 2026' },
  { date: '1 Apr 2026', amount: 389000, status: 'Cair', method: 'GoPay', period: 'Mar 2026' },
  { date: '1 Mar 2026', amount: 290000, status: 'Cair', method: 'GoPay', period: 'Feb 2026' },
]

// ─── Monthly clicks chart data ────────────────────────────────────────────────
const MONTHLY_DATA = [
  { month: 'Jan', clicks: 180, orders: 11 },
  { month: 'Feb', clicks: 290, orders: 18 },
  { month: 'Mar', clicks: 420, orders: 24 },
  { month: 'Apr', clicks: 510, orders: 31 },
  { month: 'Mei', clicks: 680, orders: 45 },
  { month: 'Jun', clicks: 840, orders: 58 },
]

const maxClicks = Math.max(...MONTHLY_DATA.map((d) => d.clicks))

// ─── Leaderboard ──────────────────────────────────────────────────────────────
const LEADERBOARD = [
  { rank: 1, name: 'Dimas P.', handle: '@dimasprakosa', earned: 'Rp 8,5Jt', tier: '🌳 Influencer' },
  { rank: 2, name: 'Maya S.', handle: '@mayasustain', earned: 'Rp 5,2Jt', tier: '🌳 Influencer' },
  { rank: 3, name: 'Rina A.', handle: '@rina.ecolife', earned: 'Rp 1,8Jt', tier: '🌿 Advocate', isMe: true },
  { rank: 4, name: 'Budi H.', handle: '@budihijau', earned: 'Rp 1,5Jt', tier: '🌿 Advocate' },
  { rank: 5, name: 'Sinta D.', handle: 'WA Group', earned: 'Rp 850K', tier: '🌱 Starter' },
]

type Tab = 'dashboard' | 'products' | 'payouts' | 'materials'

export default function AffiliateDashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [copied, setCopied] = useState(false)
  const [withdrawing, setWithdrawing] = useState(false)
  const [withdrawn, setWithdrawn] = useState(false)

  const progress = (AFFILIATE.currentSales / AFFILIATE.nextTierTarget) * 100

  const copyLink = () => {
    navigator.clipboard.writeText(AFFILIATE.referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWithdraw = async () => {
    setWithdrawing(true)
    await new Promise((r) => setTimeout(r, 1800))
    setWithdrawing(false)
    setWithdrawn(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">

          {/* ── Header ──────────────────────────────────────────────────────── */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-foreground">Dashboard Afiliasi</h1>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  {AFFILIATE.tierIcon} {AFFILIATE.tier}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {AFFILIATE.name} · {AFFILIATE.handle} · Bergabung {AFFILIATE.joinDate}
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/affiliate"><ArrowRight className="mr-2 h-4 w-4 rotate-180" /> Info Program</Link>
            </Button>
          </div>

          {/* ── Referral Link Card ───────────────────────────────────────────── */}
          <div className="mt-6 rounded-2xl bg-foreground p-6">
            <p className="text-sm font-semibold text-background/70 mb-3">Link Referral Unikmu</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex flex-1 items-center gap-3 rounded-xl bg-background/10 px-4 py-3">
                <Link2 className="h-4 w-4 shrink-0 text-[#A4F000]" />
                <span className="flex-1 font-mono text-sm text-background truncate">{AFFILIATE.referralLink}</span>
                <span className="shrink-0 rounded-full bg-[#A4F000]/20 px-2 py-0.5 text-xs font-bold text-[#A4F000]">
                  Kode: {AFFILIATE.code}
                </span>
              </div>
              <button onClick={copyLink}
                className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${copied ? 'bg-[#A4F000] text-foreground' : 'bg-primary text-primary-foreground hover:bg-[#8BD400]'}`}>
                {copied ? <><Check className="h-4 w-4" /> Disalin!</> : <><Copy className="h-4 w-4" /> Salin Link</>}
              </button>
            </div>

            {/* Share buttons */}
            <div className="mt-4 flex flex-wrap gap-2">
              <p className="w-full text-xs text-background/50 mb-1">Bagikan via:</p>
              {[
                { icon: MessageSquare, label: 'WhatsApp', color: 'bg-[#25D366]/20 text-[#25D366]', href: `https://wa.me/?text=Hei! Belanja produk eco-friendly di EcoBox pakai link saya dan dapat diskon: ${AFFILIATE.referralLink}` },
                { icon: Instagram, label: 'Instagram', color: 'bg-pink-100 text-pink-600', href: '#' },
                { icon: Twitter, label: 'Twitter/X', color: 'bg-background/10 text-background', href: `https://twitter.com/intent/tweet?text=Belanja%20eco-friendly%20di%20%40EcoBox_ID%20pakai%20linkku!%20${AFFILIATE.referralLink}` },
                { icon: Share2, label: 'Lainnya', color: 'bg-background/10 text-background', href: '#' },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition-opacity hover:opacity-80 ${s.color}`}>
                  <s.icon className="h-3.5 w-3.5" />
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* ── Stats Grid ───────────────────────────────────────────────────── */}
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-border bg-background p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${stat.bg}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
                <p className="mt-2 text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* ── Tier Progress & Withdrawal ───────────────────────────────────── */}
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {/* Tier progress */}
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-foreground">Progres Naik Tier</h2>
                <span className="text-sm font-semibold text-primary">{AFFILIATE.tierIcon} → 🌳</span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Menuju <strong className="text-foreground">{AFFILIATE.nextTierName}</strong> (komisi 12%)
              </p>
              <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                <span>{formatRupiah(AFFILIATE.currentSales)} sudah tercapai</span>
                <span>Target: {formatRupiah(AFFILIATE.nextTierTarget)}</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-gradient-to-r from-primary to-[#8BD400] transition-all"
                  style={{ width: `${Math.min(100, progress)}%` }} />
              </div>
              <p className="mt-2 text-xs text-muted-foreground text-right">
                {Math.round(progress)}% · Kurang{' '}
                <span className="font-semibold text-foreground">
                  {formatRupiah(AFFILIATE.nextTierTarget - AFFILIATE.currentSales)}
                </span>
              </p>
            </div>

            {/* Withdraw */}
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-foreground">Komisi Tersedia</h2>
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-3xl font-bold text-foreground">{formatRupiah(654000)}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Periode Jun 2026 · {AFFILIATE.payoutMethod}
              </p>

              {withdrawn ? (
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#A4F000]/10 px-4 py-3 text-sm font-semibold text-[#5a8500]">
                  <Check className="h-4 w-4" /> Pencairan berhasil! Cek GoPay kamu.
                </div>
              ) : (
                <Button onClick={handleWithdraw} disabled={withdrawing}
                  className="mt-4 w-full bg-primary text-primary-foreground hover:bg-[#8BD400]">
                  {withdrawing ? (
                    <span className="flex items-center gap-2">
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Memproses...
                    </span>
                  ) : (
                    <><DollarSign className="mr-2 h-4 w-4" /> Cairkan ke GoPay</>
                  )}
                </Button>
              )}
              <p className="mt-2 text-xs text-center text-muted-foreground">Min. pencairan Rp 50.000 · Langsung cair</p>
            </div>
          </div>

          {/* ── Tabs ─────────────────────────────────────────────────────────── */}
          <div className="mt-6 flex gap-1 rounded-xl border border-border bg-background p-1">
            {([['dashboard', 'Performa'], ['products', 'Produk Terlaris'], ['payouts', 'Riwayat Pencairan'], ['materials', 'Materi Promosi']] as [Tab, string][]).map(([tab, label]) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`flex-1 rounded-lg py-2 text-xs font-medium transition-colors sm:text-sm ${activeTab === tab ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                {label}
              </button>
            ))}
          </div>

          {/* ── Dashboard Tab ────────────────────────────────────────────────── */}
          {activeTab === 'dashboard' && (
            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              {/* Bar chart */}
              <div className="rounded-2xl border border-border bg-background p-6">
                <h2 className="font-semibold text-foreground mb-5">Tren Klik & Order (6 Bulan)</h2>
                <div className="flex items-end gap-2 h-36">
                  {MONTHLY_DATA.map((d) => (
                    <div key={d.month} className="flex flex-1 flex-col items-center gap-1 group">
                      <div className="relative w-full flex flex-col items-center gap-0.5">
                        <div className="absolute -top-6 hidden group-hover:block text-xs font-semibold text-foreground bg-background border border-border rounded px-1.5 py-0.5 whitespace-nowrap shadow-sm z-10">
                          {d.clicks} klik · {d.orders} order
                        </div>
                        <div className="w-full rounded-t-md bg-[#A4F000]/30"
                          style={{ height: `${(d.clicks / maxClicks) * 100}px` }} />
                        <div className="w-3/4 rounded-t-md bg-primary"
                          style={{ height: `${(d.orders / 60) * 40}px` }} />
                      </div>
                      <p className="text-xs text-muted-foreground">{d.month}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded bg-[#A4F000]/30" /> Klik</span>
                  <span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded bg-primary" /> Order</span>
                </div>
              </div>

              {/* Leaderboard */}
              <div className="rounded-2xl border border-border bg-background p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-foreground">Leaderboard Bulan Ini</h2>
                  <Star className="h-5 w-5 text-amber-400" />
                </div>
                <div className="space-y-2">
                  {LEADERBOARD.map((entry) => (
                    <div key={entry.rank}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${entry.isMe ? 'border border-primary/20 bg-primary/5' : 'bg-muted/30'}`}>
                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${entry.rank === 1 ? 'bg-amber-400 text-white' : entry.rank === 2 ? 'bg-gray-300 text-gray-700' : entry.rank === 3 ? 'bg-amber-700 text-white' : 'bg-muted text-muted-foreground'}`}>
                        {entry.rank}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${entry.isMe ? 'text-primary' : 'text-foreground'}`}>
                          {entry.name} {entry.isMe && '(Kamu)'}
                        </p>
                        <p className="text-xs text-muted-foreground">{entry.tier}</p>
                      </div>
                      <span className="text-sm font-bold text-foreground">{entry.earned}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Products Tab ─────────────────────────────────────────────────── */}
          {activeTab === 'products' && (
            <div className="mt-5 rounded-2xl border border-border bg-background overflow-hidden">
              <div className="grid grid-cols-5 gap-4 border-b border-border px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <div className="col-span-2">Produk</div>
                <div className="text-center">Klik</div>
                <div className="text-center">Order</div>
                <div className="text-center">Komisi</div>
              </div>
              <div className="divide-y divide-border">
                {TOP_PRODUCTS.map((p, i) => (
                  <div key={p.name} className="grid grid-cols-5 gap-4 items-center px-5 py-4">
                    <div className="col-span-2">
                      <p className="text-sm font-medium text-foreground line-clamp-1">{p.name}</p>
                      <p className="text-xs text-muted-foreground">CR: {p.convRate}</p>
                    </div>
                    <p className="text-center text-sm text-foreground">{p.clicks}</p>
                    <p className="text-center text-sm text-foreground">{p.orders}</p>
                    <p className="text-center text-sm font-semibold text-[#5a8500]">{p.commission}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Payouts Tab ──────────────────────────────────────────────────── */}
          {activeTab === 'payouts' && (
            <div className="mt-5 rounded-2xl border border-border bg-background overflow-hidden">
              <div className="divide-y divide-border">
                {PAYOUTS.map((p) => (
                  <div key={p.date} className="flex items-center gap-4 px-5 py-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#A4F000]/10">
                      <DollarSign className="h-5 w-5 text-[#A4F000]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Komisi {p.period}</p>
                      <p className="text-xs text-muted-foreground">{p.date} · {p.method}</p>
                    </div>
                    <span className="rounded-full bg-[#A4F000]/20 px-2.5 py-0.5 text-xs font-medium text-[#5a8500]">
                      ✓ {p.status}
                    </span>
                    <p className="text-sm font-bold text-foreground">{formatRupiah(p.amount)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-border bg-muted/30 px-5 py-3 flex justify-between text-sm">
                <span className="text-muted-foreground">Total dicairkan</span>
                <span className="font-bold text-foreground">
                  {formatRupiah(PAYOUTS.reduce((s, p) => s + p.amount, 0))}
                </span>
              </div>
            </div>
          )}

          {/* ── Materials Tab ─────────────────────────────────────────────────── */}
          {activeTab === 'materials' && (
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: 'Banner Instagram Story (1080×1920)', format: 'PNG · 2 variasi warna', icon: '🖼️' },
                { title: 'Banner Feed Instagram (1080×1080)', format: 'PNG · 3 desain', icon: '📸' },
                { title: 'Caption Template WhatsApp', format: 'TXT · 5 variasi naskah', icon: '✍️' },
                { title: 'Video Product Demo (Reels)', format: 'MP4 · 30 detik', icon: '🎬' },
                { title: 'Banner Twitter/X (1600×900)', format: 'PNG · 2 desain', icon: '🖥️' },
                { title: 'Panduan Afiliator EcoBox', format: 'PDF · 12 halaman', icon: '📋' },
              ].map((m) => (
                <div key={m.title} className="rounded-2xl border border-border bg-background p-5">
                  <p className="text-3xl">{m.icon}</p>
                  <h3 className="mt-3 text-sm font-semibold text-foreground">{m.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{m.format}</p>
                  <Button variant="outline" size="sm" className="mt-3 w-full">
                    <Download className="mr-2 h-3.5 w-3.5" /> Unduh
                  </Button>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  )
}
