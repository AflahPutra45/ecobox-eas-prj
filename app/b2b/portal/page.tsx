'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatRupiah } from '@/lib/utils'
import {
  Package, TrendingUp, Clock, CheckCircle, Truck,
  UserCheck, FileText, LogOut, BarChart3, Phone,
  Mail, MessageSquare, ArrowRight, Building2,
  ChevronDown, ChevronUp, AlertCircle,
} from 'lucide-react'

// ─── Demo Data ────────────────────────────────────────────────────────────────
const DEMO_SESSION = {
  companyName: 'PT Maju Bersama',
  contactName: 'Risa Andriani',
  tier: 'Business',
  discount: 20,
  accountManager: {
    name: 'Bima Satria',
    email: 'bima.satria@ecobox.id',
    phone: '+62 811-2345-6789',
    whatsapp: '6281123456789',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
  },
}

const ORDERS = [
  {
    id: 'B2B-2026-001',
    rfqId: 'RFQ-2026-A1B2C',
    date: '1 Jun 2026',
    eta: '10 Jun 2026',
    products: ['Set Wadah Makanan Bambu × 200', 'Set Bungkus Lilin Lebah × 150'],
    total: 13100000,
    status: 'Dalam Pengiriman',
    statusColor: 'bg-blue-100 text-blue-700',
    tracking: [
      { label: 'RFQ Diterima', date: '1 Jun 09:00', done: true },
      { label: 'Penawaran Dikirim', date: '1 Jun 15:30', done: true },
      { label: 'PO Dikonfirmasi', date: '2 Jun 10:00', done: true },
      { label: 'Produksi & Packing', date: '3–5 Jun', done: true },
      { label: 'Dalam Pengiriman', date: '6 Jun', done: true },
      { label: 'Tiba di Tujuan', date: 'Est. 10 Jun', done: false },
    ],
  },
  {
    id: 'B2B-2026-002',
    rfqId: 'RFQ-2026-D3E4F',
    date: '15 Mei 2026',
    eta: '25 Mei 2026',
    products: ['Tas Tote Katun Organik × 500'],
    total: 7200000,
    status: 'Selesai',
    statusColor: 'bg-[#A4F000]/20 text-[#5a8500]',
    tracking: [
      { label: 'RFQ Diterima', date: '15 Mei', done: true },
      { label: 'Penawaran Dikirim', date: '15 Mei', done: true },
      { label: 'PO Dikonfirmasi', date: '16 Mei', done: true },
      { label: 'Produksi & Packing', date: '17–20 Mei', done: true },
      { label: 'Dalam Pengiriman', date: '21 Mei', done: true },
      { label: 'Tiba di Tujuan', date: '25 Mei', done: true },
    ],
  },
  {
    id: 'B2B-2026-003',
    rfqId: 'RFQ-2026-G5H6I',
    date: '8 Jun 2026',
    eta: '—',
    products: ['Kit Semprotan Pembersih × 300', 'Sikat Gigi Bambu × 1000'],
    total: 19500000,
    status: 'Menunggu Konfirmasi PO',
    statusColor: 'bg-amber-100 text-amber-700',
    tracking: [
      { label: 'RFQ Diterima', date: '8 Jun 14:00', done: true },
      { label: 'Penawaran Dikirim', date: '9 Jun 09:00', done: true },
      { label: 'PO Dikonfirmasi', date: 'Menunggu', done: false },
      { label: 'Produksi & Packing', date: '—', done: false },
      { label: 'Dalam Pengiriman', date: '—', done: false },
      { label: 'Tiba di Tujuan', date: '—', done: false },
    ],
  },
]

const TABS = ['dashboard', 'orders', 'rfq'] as const
type Tab = typeof TABS[number]

export default function B2BPortalPage() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [expandedOrder, setExpandedOrder] = useState<string | null>('B2B-2026-001')

  const totalSpend = ORDERS.filter((o) => o.status === 'Selesai').reduce((s, o) => s + o.total, 0)
  const activeOrders = ORDERS.filter((o) => o.status !== 'Selesai').length

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">

          {/* Portal Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-foreground">
                  Selamat datang, {DEMO_SESSION.contactName} 👋
                </h1>
                <Badge className="bg-primary/20 text-primary">
                  Tier {DEMO_SESSION.tier} · {DEMO_SESSION.discount}% Off
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{DEMO_SESSION.companyName} — Portal B2B EcoBox</p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-primary text-primary-foreground hover:bg-[#8BD400]" asChild>
                <Link href="/b2b/rfq">
                  <FileText className="mr-2 h-4 w-4" /> Ajukan RFQ Baru
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/b2b">
                  <LogOut className="mr-2 h-4 w-4" /> Keluar
                </Link>
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex gap-1 rounded-xl border border-border bg-background p-1">
            {([['dashboard', 'Dashboard'], ['orders', 'Order Tracking'], ['rfq', 'Riwayat RFQ']] as [Tab, string][]).map(([tab, label]) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${activeTab === tab ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                {label}
              </button>
            ))}
          </div>

          {/* ── Dashboard ──────────────────────────────────────────────────── */}
          {activeTab === 'dashboard' && (
            <div className="mt-6 space-y-6">
              {/* Stats */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: 'Total Belanja', value: formatRupiah(totalSpend), icon: TrendingUp, color: 'text-[#A4F000]' },
                  { label: 'Pesanan Aktif', value: String(activeOrders), icon: Package, color: 'text-[#CC73B3]' },
                  { label: 'Total Order', value: String(ORDERS.length), icon: BarChart3, color: 'text-blue-500' },
                  { label: 'Diskon Diperoleh', value: `${DEMO_SESSION.discount}%`, icon: CheckCircle, color: 'text-amber-500' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-border bg-background p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <p className="mt-2 text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Account Manager */}
              <div className="rounded-2xl border border-border bg-background p-6">
                <div className="flex items-center gap-2 mb-4">
                  <UserCheck className="h-5 w-5 text-[#A4F000]" />
                  <h2 className="font-semibold text-foreground">Account Manager Dedikasi Anda</h2>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-4">
                    <img
                      src={DEMO_SESSION.accountManager.avatar}
                      alt={DEMO_SESSION.accountManager.name}
                      className="h-16 w-16 rounded-full object-cover ring-2 ring-primary/20"
                    />
                    <div>
                      <p className="font-semibold text-foreground">{DEMO_SESSION.accountManager.name}</p>
                      <p className="text-sm text-muted-foreground">Account Manager B2B — EcoBox</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Tersedia Senin–Jumat, 08:00–17:00 WIB
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 sm:ml-auto">
                    <Button variant="outline" size="sm" asChild>
                      <a href={`mailto:${DEMO_SESSION.accountManager.email}`}>
                        <Mail className="mr-2 h-4 w-4" /> Email
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={`tel:${DEMO_SESSION.accountManager.phone}`}>
                        <Phone className="mr-2 h-4 w-4" /> Telepon
                      </a>
                    </Button>
                    <Button className="bg-[#25D366] text-white hover:bg-[#1ebe5a]" size="sm" asChild>
                      <a href={`https://wa.me/${DEMO_SESSION.accountManager.whatsapp}`} target="_blank" rel="noopener noreferrer">
                        <MessageSquare className="mr-2 h-4 w-4" /> WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Pending alert */}
              {ORDERS.some((o) => o.status === 'Menunggu Konfirmasi PO') && (
                <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                  <div>
                    <p className="text-sm font-semibold text-amber-800">Penawaran Menunggu Konfirmasi PO</p>
                    <p className="text-sm text-amber-700">
                      Order <strong>B2B-2026-003</strong> membutuhkan konfirmasi Purchase Order dari Anda. Segera hubungi account manager.
                    </p>
                  </div>
                </div>
              )}

              {/* Recent orders preview */}
              <div className="rounded-2xl border border-border bg-background p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-foreground">Pesanan Terbaru</h2>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab('orders')}>
                    Lihat semua <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
                <div className="divide-y divide-border">
                  {ORDERS.slice(0, 2).map((order) => (
                    <div key={order.id} className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">{order.id}</p>
                        <p className="text-xs text-muted-foreground">{order.date} · {order.products.length} produk</p>
                      </div>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${order.statusColor}`}>
                        {order.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Order Tracking ─────────────────────────────────────────────── */}
          {activeTab === 'orders' && (
            <div className="mt-6 space-y-4">
              {ORDERS.map((order) => (
                <div key={order.id} className="rounded-2xl border border-border bg-background overflow-hidden">
                  {/* Order header */}
                  <button
                    className="w-full p-5 flex flex-wrap items-center gap-4 text-left hover:bg-muted/30 transition-colors"
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <p className="font-semibold text-foreground">{order.id}</p>
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${order.statusColor}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {order.products.join(' · ')}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Order: {order.date} · ETA: {order.eta}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">{formatRupiah(order.total)}</p>
                      <p className="text-xs text-muted-foreground">sudah termasuk diskon</p>
                    </div>
                    {expandedOrder === order.id
                      ? <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
                      : <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />}
                  </button>

                  {/* Expanded tracking */}
                  {expandedOrder === order.id && (
                    <div className="border-t border-border bg-muted/20 px-5 py-4">
                      <p className="mb-4 text-sm font-semibold text-foreground">Status Pengiriman Real-time</p>
                      <div className="relative">
                        {order.tracking.map((t, idx) => (
                          <div key={t.label} className="flex gap-4 pb-4 last:pb-0">
                            {/* Line */}
                            <div className="flex flex-col items-center">
                              <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${t.done ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background text-muted-foreground'}`}>
                                {t.done ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                              </div>
                              {idx < order.tracking.length - 1 && (
                                <div className={`mt-1 h-full w-0.5 ${t.done ? 'bg-primary' : 'bg-border'}`} style={{ minHeight: '24px' }} />
                              )}
                            </div>
                            <div className="pb-2">
                              <p className={`text-sm font-medium ${t.done ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {t.label}
                              </p>
                              <p className="text-xs text-muted-foreground">{t.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ── RFQ History ────────────────────────────────────────────────── */}
          {activeTab === 'rfq' && (
            <div className="mt-6 space-y-4">
              {ORDERS.map((order) => (
                <div key={order.rfqId} className="rounded-2xl border border-border bg-background p-5">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <p className="font-semibold text-foreground">{order.rfqId}</p>
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${order.statusColor}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{order.products.join(', ')}</p>
                      <p className="text-xs text-muted-foreground">Diajukan: {order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">{formatRupiah(order.total)}</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Truck className="mr-2 h-3 w-3" /> Lihat Detail
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-4 text-center">
                <Button className="bg-primary text-primary-foreground hover:bg-[#8BD400]" asChild>
                  <Link href="/b2b/rfq">
                    <FileText className="mr-2 h-4 w-4" /> Ajukan RFQ Baru
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
