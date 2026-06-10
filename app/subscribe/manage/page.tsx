'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { products } from '@/lib/data'
import { formatRupiah } from '@/lib/utils'
import {
  RefreshCcw, Pause, XCircle, Check, ChevronDown,
  ChevronUp, Plus, Edit2, Truck, Bell, Calendar,
  ArrowRight, Package,
} from 'lucide-react'

// ─── Demo active subscriptions ────────────────────────────────────────────────
const INITIAL_SUBS = [
  {
    id: 'sub-001',
    productId: '3',
    frequency: 'monthly',
    freqLabel: 'Bulanan',
    discount: 10,
    nextDelivery: '15 Jul 2026',
    status: 'active',
    deliveryCount: 5,
    savedTotal: 60000,
    startDate: '15 Feb 2026',
  },
  {
    id: 'sub-002',
    productId: '8',
    frequency: 'biweekly',
    freqLabel: '2 Minggu',
    discount: 12,
    nextDelivery: '18 Jun 2026',
    status: 'active',
    deliveryCount: 3,
    savedTotal: 9000,
    startDate: '25 Apr 2026',
  },
  {
    id: 'sub-003',
    productId: '5',
    frequency: 'weekly',
    freqLabel: 'Mingguan',
    discount: 15,
    nextDelivery: '12 Jun 2026',
    status: 'paused',
    deliveryCount: 8,
    savedTotal: 21600,
    startDate: '1 Jan 2026',
  },
]

const FREQ_OPTIONS = [
  { id: 'weekly', label: 'Mingguan (setiap 7 hari)', discount: 15 },
  { id: 'biweekly', label: '2 Minggu (setiap 14 hari)', discount: 12 },
  { id: 'monthly', label: 'Bulanan (setiap 30 hari)', discount: 10 },
]

const DELIVERY_HISTORY = [
  { id: 'sub-001', date: '15 Jun 2026', product: 'Set Sikat Gigi Bambu Natural', status: 'Dikirim', amount: 10800 },
  { id: 'sub-002', date: '4 Jun 2026', product: 'Kit Semprotan Pembersih Isi Ulang', status: 'Selesai', amount: 22000 },
  { id: 'sub-001', date: '15 Mei 2026', product: 'Set Sikat Gigi Bambu Natural', status: 'Selesai', amount: 10800 },
  { id: 'sub-003', date: '5 Mei 2026', product: 'Tas Tote Katun Organik', status: 'Selesai', amount: 15300 },
  { id: 'sub-002', date: '21 Apr 2026', product: 'Kit Semprotan Pembersih Isi Ulang', status: 'Selesai', amount: 22000 },
]

type SubStatus = 'active' | 'paused' | 'cancelled'
type Sub = typeof INITIAL_SUBS[0]

export default function SubscribeManagePage() {
  const [subs, setSubs] = useState(INITIAL_SUBS)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'subscriptions' | 'history'>('subscriptions')
  const [confirmCancel, setConfirmCancel] = useState<string | null>(null)

  const activeSubs = subs.filter((s) => s.status === 'active')
  const totalSaved = subs.reduce((sum, s) => sum + s.savedTotal, 0)

  const togglePause = (id: string) => {
    setSubs((prev) => prev.map((s) =>
      s.id === id ? { ...s, status: s.status === 'paused' ? 'active' : 'paused' as SubStatus } : s
    ))
  }

  const cancelSub = (id: string) => {
    setSubs((prev) => prev.map((s) => s.id === id ? { ...s, status: 'cancelled' as SubStatus } : s))
    setConfirmCancel(null)
  }

  const changeFreq = (id: string, freqId: string) => {
    const opt = FREQ_OPTIONS.find((f) => f.id === freqId)!
    setSubs((prev) => prev.map((s) =>
      s.id === id ? { ...s, frequency: freqId, freqLabel: opt.label.split(' ')[0], discount: opt.discount } : s
    ))
    setEditingId(null)
  }

  const getProduct = (productId: string) => products.find((p) => p.id === productId)

  const statusBadge = (status: string) => {
    if (status === 'active') return 'bg-[#A4F000]/20 text-[#5a8500]'
    if (status === 'paused') return 'bg-amber-100 text-amber-700'
    return 'bg-muted text-muted-foreground line-through'
  }

  const statusLabel = (status: string) => {
    if (status === 'active') return '● Aktif'
    if (status === 'paused') return '⏸ Dijeda'
    return '✕ Dibatalkan'
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8">

          {/* Page Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Kelola Langganan</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {activeSubs.length} langganan aktif · Total hemat{' '}
                <span className="font-semibold text-primary">{formatRupiah(totalSaved)}</span>
              </p>
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-[#8BD400]" asChild>
              <Link href="/subscribe">
                <Plus className="mr-2 h-4 w-4" /> Tambah Langganan
              </Link>
            </Button>
          </div>

          {/* Summary stats */}
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: 'Langganan Aktif', value: String(activeSubs.length), icon: RefreshCcw },
              { label: 'Total Pengiriman', value: String(subs.reduce((s, i) => s + i.deliveryCount, 0)), icon: Truck },
              { label: 'Total Hemat', value: formatRupiah(totalSaved), icon: Package },
              { label: 'Pengiriman Berikutnya', value: activeSubs[0]?.nextDelivery ?? '—', icon: Calendar },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-border bg-background p-4">
                <stat.icon className="h-5 w-5 text-primary" />
                <p className="mt-2 text-sm font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Upcoming delivery alert */}
          {activeSubs.length > 0 && (
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
              <Bell className="h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm text-foreground">
                <span className="font-semibold">Pengiriman berikutnya:</span>{' '}
                {activeSubs[0].nextDelivery} — {getProduct(activeSubs[0].productId)?.name}
              </p>
            </div>
          )}

          {/* Tabs */}
          <div className="mt-6 flex gap-1 rounded-xl border border-border bg-background p-1">
            {([['subscriptions', 'Langganan Aktif'], ['history', 'Riwayat Pengiriman']] as const).map(([tab, label]) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${activeTab === tab ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                {label}
              </button>
            ))}
          </div>

          {/* ── Subscriptions tab ─────────────────────────────────────────── */}
          {activeTab === 'subscriptions' && (
            <div className="mt-4 space-y-4">
              {subs.length === 0 && (
                <div className="rounded-2xl border border-border bg-background p-12 text-center">
                  <RefreshCcw className="mx-auto h-10 w-10 text-muted-foreground" />
                  <p className="mt-4 font-semibold text-foreground">Belum ada langganan</p>
                  <p className="mt-2 text-sm text-muted-foreground">Mulai berlangganan untuk hemat lebih banyak.</p>
                  <Button className="mt-6 bg-primary text-primary-foreground hover:bg-[#8BD400]" asChild>
                    <Link href="/subscribe">Mulai Berlangganan <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              )}

              {subs.map((sub) => {
                const product = getProduct(sub.productId)
                if (!product) return null
                const discountedPrice = Math.round(product.price * (1 - sub.discount / 100))
                const isCancelled = sub.status === 'cancelled'

                return (
                  <div key={sub.id} className={`rounded-2xl border bg-background overflow-hidden transition-opacity ${isCancelled ? 'opacity-50 border-border' : 'border-border'}`}>
                    {/* Main row */}
                    <div className="flex flex-wrap items-center gap-4 p-5">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-foreground">{product.name}</p>
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadge(sub.status)}`}>
                            {statusLabel(sub.status)}
                          </span>
                        </div>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {sub.freqLabel} · Mulai {sub.startDate}
                        </p>
                        <div className="mt-1 flex items-baseline gap-2">
                          <span className="font-bold text-foreground">{formatRupiah(discountedPrice)}</span>
                          <span className="text-xs text-muted-foreground line-through">{formatRupiah(product.price)}</span>
                          <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-xs font-semibold text-primary">
                            -{sub.discount}%
                          </span>
                        </div>
                      </div>

                      <div className="text-right text-sm">
                        {!isCancelled && (
                          <>
                            <p className="text-muted-foreground">Pengiriman berikutnya</p>
                            <p className="font-semibold text-foreground">{sub.nextDelivery}</p>
                            <p className="text-xs text-muted-foreground">{sub.deliveryCount}× sudah dikirim</p>
                          </>
                        )}
                      </div>

                      {/* Actions */}
                      {!isCancelled && (
                        <div className="flex gap-2 shrink-0">
                          <Button variant="outline" size="sm"
                            onClick={() => setEditingId(editingId === sub.id ? null : sub.id)}>
                            <Edit2 className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => togglePause(sub.id)}
                            className={sub.status === 'paused' ? 'border-primary text-primary' : ''}>
                            {sub.status === 'paused' ? (
                              <><Check className="mr-1.5 h-3.5 w-3.5" /> Aktifkan</>
                            ) : (
                              <><Pause className="mr-1.5 h-3.5 w-3.5" /> Jeda</>
                            )}
                          </Button>
                          <Button variant="outline" size="sm"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/30"
                            onClick={() => setConfirmCancel(sub.id)}>
                            <XCircle className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Edit frequency panel */}
                    {editingId === sub.id && (
                      <div className="border-t border-border bg-muted/30 px-5 py-4">
                        <p className="mb-3 text-sm font-semibold text-foreground">Ubah Frekuensi Pengiriman</p>
                        <div className="flex flex-wrap gap-2">
                          {FREQ_OPTIONS.map((opt) => (
                            <button key={opt.id} onClick={() => changeFreq(sub.id, opt.id)}
                              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-all ${sub.frequency === opt.id ? 'border-primary bg-primary/10 text-foreground' : 'border-border text-muted-foreground hover:border-primary/50'}`}>
                              {opt.label.split('(')[0].trim()}
                              <span className="ml-1 text-xs text-primary font-semibold">({opt.discount}% off)</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Cancel confirm */}
                    {confirmCancel === sub.id && (
                      <div className="border-t border-destructive/20 bg-destructive/5 px-5 py-4">
                        <p className="text-sm font-semibold text-foreground">Batalkan langganan ini?</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Pengiriman yang sudah diproses tidak dapat dikembalikan. Anda bisa berlangganan ulang kapan saja.
                        </p>
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => setConfirmCancel(null)}>
                            Tidak, Lanjutkan
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => cancelSub(sub.id)}>
                            Ya, Batalkan
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}

              <Button variant="outline" className="w-full" asChild>
                <Link href="/subscribe">
                  <Plus className="mr-2 h-4 w-4" /> Tambah Produk Berlangganan
                </Link>
              </Button>
            </div>
          )}

          {/* ── History tab ───────────────────────────────────────────────── */}
          {activeTab === 'history' && (
            <div className="mt-4 rounded-2xl border border-border bg-background overflow-hidden">
              <div className="divide-y divide-border">
                {DELIVERY_HISTORY.map((h, i) => (
                  <div key={i} className="flex items-center gap-4 p-4">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${h.status === 'Selesai' ? 'bg-[#A4F000]/10' : 'bg-blue-50'}`}>
                      <Truck className={`h-4 w-4 ${h.status === 'Selesai' ? 'text-[#5a8500]' : 'text-blue-600'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground line-clamp-1">{h.product}</p>
                      <p className="text-xs text-muted-foreground">{h.date}</p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${h.status === 'Selesai' ? 'bg-[#A4F000]/20 text-[#5a8500]' : 'bg-blue-100 text-blue-700'}`}>
                      {h.status}
                    </span>
                    <span className="shrink-0 text-sm font-semibold text-foreground">
                      {formatRupiah(h.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  )
}
