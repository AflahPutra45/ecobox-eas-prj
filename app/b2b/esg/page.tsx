'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { formatRupiah } from '@/lib/utils'
import {
  Leaf, Wind, Droplets, ShieldCheck, Download,
  FileText, BarChart3, Calendar, ChevronDown,
  Building2, ArrowLeft, CheckCircle2, TrendingUp,
  Globe, Award, Package, Printer, Share2, Info,
} from 'lucide-react'

// ─── Demo Company ────────────────────────────────────────────────────────────
const COMPANY = {
  name: 'PT Maju Bersama',
  pic: 'Risa Andriani',
  tier: 'Business',
  reportId: 'ESG-2026-MB-001',
  generatedAt: '10 Jun 2026, 12:50 WIB',
}

// ─── Period Options ───────────────────────────────────────────────────────────
const PERIODS = [
  { id: 'q2-2026', label: 'Q2 2026 (Apr–Jun)', short: 'Q2 2026' },
  { id: 'q1-2026', label: 'Q1 2026 (Jan–Mar)', short: 'Q1 2026' },
  { id: 'fy-2025', label: 'Tahun Penuh 2025', short: 'FY 2025' },
]

// ─── Impact KPIs ──────────────────────────────────────────────────────────────
const getImpactData = (periodId: string) => {
  const multiplier = periodId === 'fy-2025' ? 3.2 : periodId === 'q1-2026' ? 0.8 : 1
  return {
    plasticPrevented: +(12.4 * multiplier).toFixed(1),
    carbonSaved: +(28.7 * multiplier).toFixed(1),
    waterSaved: +(380 * multiplier).toFixed(0),
    certifiedProducts: 8,
    totalOrders: Math.round(7 * multiplier),
    totalSpend: Math.round(1850000 * multiplier),
    treeEquivalent: Math.round(2.3 * multiplier * 10) / 10,
    plasticBottles: Math.round(12.4 * multiplier * 40),
  }
}

// ─── Order breakdown ──────────────────────────────────────────────────────────
const ORDERS = [
  {
    id: 'B2B-2026-001',
    date: '1 Jun 2026',
    products: [
      { name: 'Set Wadah Makanan Bambu', qty: 200, plastic: '500kg', carbon: '240kg CO₂', cert: ['Verified', 'Food-Grade', 'Reusable'] },
      { name: 'Set Bungkus Makanan Lilin Lebah', qty: 150, plastic: '450kg', carbon: '300kg CO₂', cert: ['Verified', 'Reusable', 'Food-Grade'] },
    ],
    amount: 13100000,
    impactScore: 94,
  },
  {
    id: 'B2B-2026-002',
    date: '15 Mei 2026',
    products: [
      { name: 'Tas Tote Katun Organik', qty: 500, plastic: '7.500kg', carbon: '4.000kg CO₂', cert: ['Verified', 'Vegan', 'Reusable'] },
    ],
    amount: 7200000,
    impactScore: 91,
  },
  {
    id: 'B2B-2026-003',
    date: '8 Jun 2026',
    products: [
      { name: 'Kit Semprotan Pembersih Isi Ulang', qty: 300, plastic: '450kg', carbon: '300kg CO₂', cert: ['Verified', 'Reusable', 'Vegan'] },
      { name: 'Set Sikat Gigi Bambu Natural', qty: 1000, plastic: '400kg', carbon: '800kg CO₂', cert: ['Verified', 'Biodegradable', 'Vegan'] },
    ],
    amount: 19500000,
    impactScore: 96,
  },
]

// ─── SDG Alignment ────────────────────────────────────────────────────────────
const SDG_GOALS = [
  { number: '3', title: 'Kehidupan Sehat', color: '#4C9F38', desc: 'Produk bebas bahan kimia berbahaya melindungi kesehatan karyawan & konsumen.' },
  { number: '12', title: 'Konsumsi Bertanggung Jawab', color: '#BF8B2E', desc: 'Pembelian produk daur ulang & dapat dikompos mendukung pola konsumsi berkelanjutan.' },
  { number: '13', title: 'Aksi Iklim', color: '#407F7F', desc: 'Setiap pembelian berkontribusi langsung pada pengurangan emisi karbon.' },
  { number: '14', title: 'Ekosistem Laut', color: '#1F97D4', desc: 'Mencegah plastik masuk ke lautan melalui produk ramah lingkungan.' },
  { number: '15', title: 'Ekosistem Darat', color: '#59BA47', desc: 'Produk berbasis bahan alami mengurangi tekanan pada ekosistem hutan & lahan.' },
  { number: '17', title: 'Kemitraan', color: '#19486A', desc: 'Kolaborasi dengan vendor terverifikasi memperkuat rantai pasok berkelanjutan.' },
]

// ─── Certifications ──────────────────────────────────────────────────────────
const CERTS = [
  { name: 'Berkelanjutan Terverifikasi EcoBox', scope: 'Seluruh vendor tier Verified', validUntil: '31 Des 2026', icon: '🌿' },
  { name: 'Food-Grade Safety Standard', scope: 'Produk kontak makanan', validUntil: '31 Des 2026', icon: '🍽️' },
  { name: 'Biodegradable Certified', scope: 'Produk berbasis bahan alami', validUntil: '30 Jun 2027', icon: '♻️' },
  { name: 'Vegan & Cruelty-Free', scope: 'Produk tanpa bahan hewani', validUntil: '31 Des 2026', icon: '🐰' },
]

// ─── Circular progress helper ─────────────────────────────────────────────────
function CircularProgress({ value, max, color, size = 80 }: { value: number; max: number; color: string; size?: number }) {
  const r = (size - 12) / 2
  const circ = 2 * Math.PI * r
  const filled = (value / max) * circ
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth={6} className="text-border" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={6}
        strokeDasharray={circ} strokeDashoffset={circ - filled} strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
    </svg>
  )
}

export default function ESGReportPage() {
  const [period, setPeriod] = useState('q2-2026')
  const [expandedOrder, setExpandedOrder] = useState<string | null>('B2B-2026-001')
  const [showExportMenu, setShowExportMenu] = useState(false)

  const impact = getImpactData(period)
  const selectedPeriod = PERIODS.find((p) => p.id === period)!
  const avgScore = Math.round(ORDERS.reduce((s, o) => s + o.impactScore, 0) / ORDERS.length)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">

          {/* ── Page Header ─────────────────────────────────────────────────── */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <Link href="/b2b/portal"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3">
                <ArrowLeft className="h-4 w-4" /> Kembali ke Portal B2B
              </Link>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#A4F000]/10">
                  <Leaf className="h-5 w-5 text-[#A4F000]" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Laporan Dampak ESG</h1>
                  <p className="text-sm text-muted-foreground">
                    {COMPANY.name} · ID Laporan: <span className="font-mono text-xs">{COMPANY.reportId}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Period + Export */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Period selector */}
              <div className="relative">
                <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="bg-transparent text-sm font-medium text-foreground focus:outline-none pr-6 cursor-pointer"
                  >
                    {PERIODS.map((p) => (
                      <option key={p.id} value={p.id}>{p.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Export menu */}
              <div className="relative">
                <Button
                  className="bg-primary text-primary-foreground hover:bg-[#8BD400]"
                  onClick={() => setShowExportMenu(!showExportMenu)}
                >
                  <Download className="mr-2 h-4 w-4" /> Ekspor Laporan
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
                {showExportMenu && (
                  <div className="absolute right-0 top-12 z-20 w-52 rounded-xl border border-border bg-background shadow-lg overflow-hidden">
                    {[
                      { icon: FileText, label: 'Ekspor PDF (ESG Report)', sub: 'Siap untuk investor' },
                      { icon: BarChart3, label: 'Ekspor Excel (.xlsx)', sub: 'Data mentah per transaksi' },
                      { icon: Globe, label: 'Ekspor CSV', sub: 'Format universal' },
                      { icon: Printer, label: 'Cetak Laporan', sub: 'Format A4 terformat' },
                      { icon: Share2, label: 'Bagikan via Link', sub: 'Akses terbatas 30 hari' },
                    ].map((opt) => (
                      <button key={opt.label} onClick={() => setShowExportMenu(false)}
                        className="flex w-full items-start gap-3 px-4 py-3 text-left text-sm hover:bg-muted transition-colors">
                        <opt.icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">{opt.label}</p>
                          <p className="text-xs text-muted-foreground">{opt.sub}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── ESG Score Banner ─────────────────────────────────────────────── */}
          <div className="mt-6 rounded-2xl bg-foreground p-6 lg:p-8">
            <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
              {/* Score ring */}
              <div className="flex flex-col items-center gap-2">
                <div className="relative">
                  <CircularProgress value={avgScore} max={100} color="#A4F000" size={120} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-background">{avgScore}</span>
                    <span className="text-xs text-background/60">/ 100</span>
                  </div>
                </div>
                <p className="text-sm font-semibold text-background">EcoBox ESG Score</p>
                <span className="rounded-full bg-[#A4F000]/20 px-3 py-1 text-xs font-bold text-[#A4F000]">
                  Excellent
                </span>
              </div>

              {/* Summary text */}
              <div>
                <p className="text-lg font-semibold text-background">{selectedPeriod.label}</p>
                <p className="mt-2 text-background/70 text-sm leading-relaxed">
                  Pada periode ini, <strong className="text-background">{COMPANY.name}</strong> telah berkontribusi
                  dalam mencegah <strong className="text-[#A4F000]">{impact.plasticPrevented} kg plastik</strong> masuk ke lingkungan,
                  menghemat <strong className="text-[#A4F000]">{impact.carbonSaved} kg CO₂</strong>, dan mendukung
                  gaya hidup berkelanjutan bagi <strong className="text-[#A4F000]">{impact.waterSaved.toLocaleString('id')} liter</strong> penghematan air.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['SDG 3', 'SDG 12', 'SDG 13', 'SDG 14', 'SDG 15'].map((sdg) => (
                    <span key={sdg} className="rounded-full bg-background/10 px-3 py-1 text-xs font-semibold text-background">
                      {sdg}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-xs text-background/50">
                  Laporan ID: {COMPANY.reportId} · Dibuat: {COMPANY.generatedAt} · Periode: {selectedPeriod.label}
                </p>
              </div>
            </div>
          </div>

          {/* ── Impact KPI Cards ─────────────────────────────────────────────── */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Leaf, label: 'Plastik Dicegah', value: `${impact.plasticPrevented} kg`,
                sub: `≈ ${impact.plasticBottles.toLocaleString('id')} botol plastik`,
                color: 'text-[#A4F000]', bg: 'bg-[#A4F000]/10', borderColor: 'border-[#A4F000]/20',
              },
              {
                icon: Wind, label: 'Karbon Dihemat', value: `${impact.carbonSaved} kg CO₂`,
                sub: `≈ ${impact.treeEquivalent} pohon per tahun`,
                color: 'text-[#CC73B3]', bg: 'bg-[#CC73B3]/10', borderColor: 'border-[#CC73B3]/20',
              },
              {
                icon: Droplets, label: 'Air Dihemat', value: `${impact.waterSaved.toLocaleString('id')} L`,
                sub: `${Math.round(impact.waterSaved / 50)} hari kebutuhan air`,
                color: 'text-blue-500', bg: 'bg-blue-50', borderColor: 'border-blue-200',
              },
              {
                icon: ShieldCheck, label: 'Produk Tersertifikasi', value: `${impact.certifiedProducts} SKU`,
                sub: `${impact.totalOrders} transaksi · ${formatRupiah(impact.totalSpend)}`,
                color: 'text-amber-500', bg: 'bg-amber-50', borderColor: 'border-amber-200',
              },
            ].map((kpi) => (
              <div key={kpi.label} className={`rounded-2xl border ${kpi.borderColor} bg-background p-5`}>
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${kpi.bg}`}>
                  <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                </div>
                <p className="mt-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">{kpi.label}</p>
                <p className={`mt-1 text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{kpi.sub}</p>
              </div>
            ))}
          </div>

          {/* ── Progress Bars: Impact vs Target ──────────────────────────────── */}
          <div className="mt-6 rounded-2xl border border-border bg-background p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-foreground">Progres Target Tahunan {new Date().getFullYear()}</h2>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Info className="h-3.5 w-3.5" /> Target ditetapkan bersama Account Manager
              </span>
            </div>
            <div className="space-y-5">
              {[
                { label: 'Plastik Dicegah', value: impact.plasticPrevented, target: 50, unit: 'kg', color: '#A4F000' },
                { label: 'Karbon Dihemat', value: impact.carbonSaved, target: 100, unit: 'kg CO₂', color: '#CC73B3' },
                { label: 'Air Dihemat', value: impact.waterSaved, target: 1500, unit: 'L', color: '#3B82F6' },
              ].map((bar) => {
                const pct = Math.min(100, Math.round((bar.value / bar.target) * 100))
                return (
                  <div key={bar.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-foreground">{bar.label}</span>
                      <span className="text-sm text-muted-foreground">
                        <strong className="text-foreground">{bar.value.toLocaleString('id')}</strong> / {bar.target.toLocaleString('id')} {bar.unit}
                        <span className="ml-2 font-bold" style={{ color: bar.color }}>{pct}%</span>
                      </span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, backgroundColor: bar.color }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* ── Order Breakdown ───────────────────────────────────────────── */}
            <div className="rounded-2xl border border-border bg-background overflow-hidden">
              <div className="border-b border-border px-6 py-4">
                <h2 className="font-semibold text-foreground">Rincian Per Transaksi</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Klik baris untuk melihat detail produk</p>
              </div>
              <div className="divide-y divide-border">
                {ORDERS.map((order) => (
                  <div key={order.id}>
                    <button
                      className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-muted/30 transition-colors"
                      onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground">{order.id}</p>
                        <p className="text-xs text-muted-foreground">{order.date} · {order.products.length} produk · {formatRupiah(order.amount)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <CircularProgress value={order.impactScore} max={100} color="#A4F000" size={40} />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-bold text-foreground">{order.impactScore}</span>
                          </div>
                        </div>
                        {expandedOrder === order.id
                          ? <ChevronDown className="h-4 w-4 text-muted-foreground rotate-180 transition-transform" />
                          : <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform" />
                        }
                      </div>
                    </button>
                    {expandedOrder === order.id && (
                      <div className="bg-muted/30 border-t border-border px-5 py-4 space-y-3">
                        {order.products.map((p, i) => (
                          <div key={i} className="rounded-xl bg-background border border-border p-3">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="text-sm font-medium text-foreground">{p.name}</p>
                                <p className="text-xs text-muted-foreground">Qty: {p.qty.toLocaleString('id')} unit</p>
                              </div>
                            </div>
                            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Leaf className="h-3 w-3 text-[#A4F000]" /> Plastik: <span className="font-semibold text-foreground ml-1">{p.plastic}</span>
                              </div>
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Wind className="h-3 w-3 text-[#CC73B3]" /> Karbon: <span className="font-semibold text-foreground ml-1">{p.carbon}</span>
                              </div>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {p.cert.map((c) => (
                                <span key={c} className="rounded-full bg-[#A4F000]/10 px-2 py-0.5 text-xs font-medium text-[#5a8500]">
                                  ✓ {c}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Certifications ────────────────────────────────────────────── */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-background p-6">
                <h2 className="font-semibold text-foreground mb-4">Sertifikasi Produk yang Dibeli</h2>
                <div className="space-y-3">
                  {CERTS.map((cert) => (
                    <div key={cert.name} className="flex items-start gap-3 rounded-xl border border-border p-3">
                      <span className="text-2xl">{cert.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground">{cert.name}</p>
                        <p className="text-xs text-muted-foreground">Cakupan: {cert.scope}</p>
                        <p className="text-xs text-muted-foreground">Berlaku s.d. {cert.validUntil}</p>
                      </div>
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#A4F000]" />
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  <Download className="mr-2 h-3.5 w-3.5" /> Unduh Semua Sertifikat (ZIP)
                </Button>
              </div>

              {/* Trend mini-chart (visual bars) */}
              <div className="rounded-2xl border border-border bg-background p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-foreground">Tren Karbon Dihemat</h2>
                  <span className="flex items-center gap-1 text-xs font-medium text-[#5a8500]">
                    <TrendingUp className="h-3.5 w-3.5" /> +24% vs periode lalu
                  </span>
                </div>
                <div className="flex items-end gap-2 h-24">
                  {[
                    { m: 'Jan', v: 45 }, { m: 'Feb', v: 60 }, { m: 'Mar', v: 52 },
                    { m: 'Apr', v: 68 }, { m: 'Mei', v: 78 }, { m: 'Jun', v: 95 },
                  ].map((d) => (
                    <div key={d.m} className="flex flex-1 flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t-md bg-[#A4F000]/70 transition-all duration-500"
                        style={{ height: `${d.v}%` }}
                      />
                      <p className="text-xs text-muted-foreground">{d.m}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs text-center text-muted-foreground">kg CO₂ per bulan (2026)</p>
              </div>
            </div>
          </div>

          {/* ── SDG Alignment ────────────────────────────────────────────────── */}
          <div className="mt-6 rounded-2xl border border-border bg-background p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-semibold text-foreground">Keselarasan dengan SDGs PBB</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Pembelian {COMPANY.name} berkontribusi pada 6 dari 17 Tujuan Pembangunan Berkelanjutan PBB
                </p>
              </div>
              <Globe className="h-6 w-6 text-[#A4F000]" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {SDG_GOALS.map((sdg) => (
                <div key={sdg.number} className="flex items-start gap-3 rounded-xl border border-border p-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-bold text-white text-sm"
                    style={{ backgroundColor: sdg.color }}
                  >
                    {sdg.number}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">SDG {sdg.number}: {sdg.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{sdg.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Disclaimer + CTA ─────────────────────────────────────────────── */}
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-muted/30 p-5">
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-5 w-5 text-amber-500" />
                <p className="text-sm font-semibold text-foreground">Disclaimer Laporan</p>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Data dampak lingkungan dalam laporan ini didasarkan pada metodologi Life Cycle Assessment (LCA)
                yang diakui industri dan telah diverifikasi oleh tim sustainability EcoBox.
                Angka estimasi karbon menggunakan faktor emisi Scope 3 sesuai GHG Protocol.
                Laporan ini dapat digunakan sebagai lampiran resmi dokumen ESG kepada investor dan regulator.
              </p>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-5 w-5 text-primary" />
                <p className="text-sm font-semibold text-foreground">Tingkatkan Dampak Anda</p>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground mb-4">
                Ajukan RFQ untuk periode berikutnya dan jadikan {COMPANY.name} pemimpin dalam
                praktik pengadaan berkelanjutan di industri Anda.
              </p>
              <div className="flex gap-2">
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-[#8BD400]" asChild>
                  <Link href="/b2b/rfq">Ajukan RFQ Baru</Link>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/b2b/portal">Dashboard B2B</Link>
                </Button>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
