'use client'

import { use } from 'react'

import { useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { events } from '../page'
import {
  Calendar, Clock, MapPin, Users, Star, Check,
  ChevronLeft, Video, ArrowRight, Download,
  Ticket, Share2, Heart, AlertCircle,
} from 'lucide-react'

function formatRupiah(n: number) {
  if (n === 0) return 'GRATIS'
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)
}

const FORMAT_BADGE: Record<string, { label: string; color: string }> = {
  online: { label: 'Online', color: 'bg-blue-100 text-blue-700' },
  offline: { label: 'Offline', color: 'bg-[#A4F000]/20 text-[#5a8500]' },
  hybrid: { label: 'Hybrid', color: 'bg-[#CC73B3]/10 text-[#CC73B3]' },
}

const TYPE_LABELS: Record<string, string> = {
  workshop: '🛠️ Workshop',
  webinar: '💻 Webinar',
  roadshow: '🚌 Roadshow',
}

// ─── Ticket Form ──────────────────────────────────────────────────────────────
interface TicketForm {
  name: string
  email: string
  phone: string
  qty: number
  paymentMethod: string
}

const PAYMENT_METHODS = [
  { id: 'transfer', label: 'Transfer Bank (BCA/BRI/Mandiri)' },
  { id: 'gopay', label: 'GoPay' },
  { id: 'ovo', label: 'OVO' },
  { id: 'qris', label: 'QRIS' },
]

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const event = events.find((e) => e.id === id)
  if (!event) notFound()

  const [tab, setTab] = useState<'detail' | 'checkout'>('detail')
  const [form, setForm] = useState<TicketForm>({ name: '', email: '', phone: '', qty: 1, paymentMethod: 'transfer' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [wishlist, setWishlist] = useState(false)

  const slotsLeft = event.capacity - event.enrolled
  const almostFull = slotsLeft <= 5
  const isFull = slotsLeft <= 0
  const fmt = FORMAT_BADGE[event.format]

  const subtotal = event.price * form.qty
  const serviceFee = event.price === 0 ? 0 : Math.round(subtotal * 0.05)
  const total = subtotal + serviceFee

  const update = (field: keyof TicketForm, value: string | number) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleCheckout = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 2000))
    setLoading(false)
    setSuccess(true)
  }

  // ─── Success state ──────────────────────────────────────────────────────────
  if (success) {
    const ticketCode = `ECO-${event.id.toUpperCase()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 bg-muted/30 py-16">
          <div className="mx-auto max-w-lg px-4">
            <div className="rounded-2xl border border-border bg-background p-8 text-center shadow-sm">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#A4F000]/10">
                <Ticket className="h-10 w-10 text-[#A4F000]" />
              </div>
              <h1 className="mt-6 text-2xl font-bold text-foreground">Tiket Berhasil! 🎉</h1>
              <p className="mt-3 text-sm text-muted-foreground">
                Tiket untuk <span className="font-semibold text-foreground">{event.title}</span> telah dikirim ke{' '}
                <span className="font-semibold text-foreground">{form.email}</span>
              </p>

              {/* Ticket card */}
              <div className="mt-6 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-5 text-left">
                <div className="flex items-start gap-3">
                  <img src={event.image} alt="" className="h-16 w-16 rounded-xl object-cover" />
                  <div>
                    <p className="font-semibold text-foreground line-clamp-1">{event.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{event.date} · {event.time}</p>
                    <p className="text-xs text-muted-foreground">{event.location}</p>
                  </div>
                </div>
                <div className="mt-4 border-t border-dashed border-primary/20 pt-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Kode Tiket</p>
                  <p className="font-mono text-xl font-bold tracking-widest text-foreground">{ticketCode}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{form.qty} tiket · {form.name}</p>
                </div>
              </div>

              {/* QR placeholder */}
              <div className="mx-auto mt-4 flex h-24 w-24 items-center justify-center rounded-xl bg-muted">
                <p className="text-center text-xs text-muted-foreground">QR Code<br />di Email</p>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-[#8BD400]">
                  <Download className="mr-2 h-4 w-4" /> Unduh Tiket (PDF)
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/events">Lihat Event Lainnya</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // ─── Main detail ────────────────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">

        {/* Breadcrumb */}
        <div className="border-b border-border bg-background">
          <div className="mx-auto max-w-7xl px-4 py-3 lg:px-8">
            <Link href="/events" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="h-4 w-4" /> Semua Event
            </Link>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

            {/* ── Left: Event Info ────────────────────────────────────────── */}
            <div>
              {/* Hero image */}
              <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-muted sm:h-72 lg:h-80">
                <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
                <div className="absolute left-4 top-4 flex gap-2">
                  <span className="rounded-full bg-background/90 px-3 py-1 text-sm font-semibold text-foreground backdrop-blur-sm">
                    {TYPE_LABELS[event.type]}
                  </span>
                  <span className={`rounded-full px-3 py-1 text-sm font-semibold backdrop-blur-sm ${fmt.color}`}>
                    {fmt.label}
                  </span>
                </div>
              </div>

              {/* Title + instructor */}
              <div className="mt-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {event.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{event.title}</h1>
                <p className="mt-2 text-muted-foreground">{event.subtitle}</p>

                {/* Meta */}
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { icon: Calendar, label: event.date },
                    { icon: Clock, label: event.time },
                    { icon: MapPin, label: event.format === 'online' ? 'Online' : event.location.split('·')[0].trim() },
                    { icon: Users, label: `${event.enrolled}/${event.capacity} peserta` },
                  ].map((m) => (
                    <div key={m.label} className="flex items-start gap-2 rounded-xl border border-border bg-background p-3">
                      <m.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-xs font-medium text-foreground">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tabs: Detail / Checkout on mobile */}
              <div className="mt-6 flex gap-1 rounded-xl border border-border bg-muted/30 p-1 lg:hidden">
                {(['detail', 'checkout'] as const).map((t) => (
                  <button key={t} onClick={() => setTab(t)}
                    className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${tab === t ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>
                    {t === 'detail' ? 'Detail Event' : 'Beli Tiket'}
                  </button>
                ))}
              </div>

              {/* Detail content */}
              <div className={tab === 'checkout' ? 'hidden lg:block' : 'block'}>
                {/* Instructor */}
                <div className="mt-6 rounded-2xl border border-border bg-background p-5">
                  <p className="text-sm font-semibold text-foreground mb-3">Instruktur</p>
                  <div className="flex items-center gap-4">
                    <img src={event.instructor.avatar} alt={event.instructor.name}
                      className="h-14 w-14 rounded-2xl object-cover" />
                    <div>
                      <p className="font-semibold text-foreground">{event.instructor.name}</p>
                      <p className="text-sm text-muted-foreground">{event.instructor.title}</p>
                      <div className="mt-1 flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-semibold text-foreground">{event.rating}</span>
                        <span className="text-sm text-muted-foreground">({event.reviewCount} ulasan)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-4 rounded-2xl border border-border bg-background p-5">
                  <p className="text-sm font-semibold text-foreground mb-3">Tentang Event Ini</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{event.description}</p>
                </div>

                {/* What you'll learn */}
                <div className="mt-4 rounded-2xl border border-border bg-background p-5">
                  <p className="text-sm font-semibold text-foreground mb-3">Yang Akan Kamu Pelajari</p>
                  <ul className="space-y-2">
                    {event.whatYouLearn.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#A4F000]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Location detail */}
                <div className="mt-4 rounded-2xl border border-border bg-background p-5">
                  <p className="text-sm font-semibold text-foreground mb-2">Lokasi & Format</p>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    {event.format === 'online'
                      ? <><Video className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" /><span>{event.location}</span></>
                      : <><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{event.location}</span></>
                    }
                  </div>
                  {event.format !== 'offline' && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      Link akses akan dikirim ke email setelah pembayaran dikonfirmasi.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ── Right: Checkout Card ─────────────────────────────────────── */}
            <div className={`${tab === 'detail' ? 'hidden lg:block' : 'block'}`}>
              <div className="sticky top-24 rounded-2xl border border-border bg-background p-6 shadow-sm">
                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-foreground">{formatRupiah(event.price)}</span>
                  {event.originalPrice && (
                    <span className="text-base text-muted-foreground line-through">{formatRupiah(event.originalPrice)}</span>
                  )}
                  {event.originalPrice && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-sm font-bold text-primary">
                      Hemat {Math.round((1 - event.price / event.originalPrice) * 100)}%
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{event.duration} · Sertifikat digital termasuk</p>

                {/* Slot indicator */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                    <span>{event.enrolled} terdaftar</span>
                    <span className={almostFull ? 'text-amber-600 font-semibold' : ''}>
                      {isFull ? '⛔ Penuh' : almostFull ? `🔥 Sisa ${slotsLeft} kursi!` : `${slotsLeft} kursi tersedia`}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full transition-all ${isFull ? 'bg-destructive' : almostFull ? 'bg-amber-500' : 'bg-primary'}`}
                      style={{ width: `${(event.enrolled / event.capacity) * 100}%` }}
                    />
                  </div>
                </div>

                {!isFull ? (
                  <>
                    {/* Form */}
                    <div className="mt-5 space-y-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="ev-name">Nama Lengkap *</Label>
                        <Input id="ev-name" placeholder="Nama sesuai KTP" value={form.name}
                          onChange={(e) => update('name', e.target.value)} />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="ev-email">Email *</Label>
                        <Input id="ev-email" type="email" placeholder="untuk tiket & link event" value={form.email}
                          onChange={(e) => update('email', e.target.value)} />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="ev-phone">WhatsApp *</Label>
                        <Input id="ev-phone" type="tel" placeholder="+62 812 xxxx xxxx" value={form.phone}
                          onChange={(e) => update('phone', e.target.value)} />
                      </div>

                      {/* Qty */}
                      {event.price > 0 && (
                        <div className="space-y-1.5">
                          <Label>Jumlah Tiket</Label>
                          <div className="flex items-center gap-3">
                            <button onClick={() => update('qty', Math.max(1, form.qty - 1))}
                              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors text-foreground">
                              −
                            </button>
                            <span className="w-8 text-center font-semibold text-foreground">{form.qty}</span>
                            <button onClick={() => update('qty', Math.min(slotsLeft, form.qty + 1))}
                              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors text-foreground">
                              +
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Payment method */}
                      {event.price > 0 && (
                        <div className="space-y-1.5">
                          <Label>Metode Pembayaran *</Label>
                          <div className="space-y-2">
                            {PAYMENT_METHODS.map((pm) => (
                              <label key={pm.id}
                                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 transition-all ${form.paymentMethod === pm.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'}`}>
                                <input type="radio" name="payment" value={pm.id} checked={form.paymentMethod === pm.id}
                                  onChange={() => update('paymentMethod', pm.id)} className="accent-primary" />
                                <span className="text-sm text-foreground">{pm.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Order summary */}
                    {event.price > 0 && (
                      <div className="mt-4 rounded-xl bg-muted/50 p-3 space-y-1.5 text-sm">
                        <div className="flex justify-between text-muted-foreground">
                          <span>{formatRupiah(event.price)} × {form.qty} tiket</span>
                          <span>{formatRupiah(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>Biaya layanan (5%)</span>
                          <span>{formatRupiah(serviceFee)}</span>
                        </div>
                        <div className="border-t border-border pt-1.5 flex justify-between font-bold text-foreground">
                          <span>Total</span>
                          <span>{formatRupiah(total)}</span>
                        </div>
                      </div>
                    )}

                    {/* CTA */}
                    <Button
                      onClick={handleCheckout}
                      disabled={loading || !form.name || !form.email || !form.phone}
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
                      ) : event.price === 0 ? (
                        <><Ticket className="mr-2 h-4 w-4" /> Daftar Gratis</>
                      ) : (
                        <><Ticket className="mr-2 h-4 w-4" /> Bayar & Dapatkan Tiket</>
                      )}
                    </Button>

                    <div className="mt-3 flex gap-2">
                      <button onClick={() => setWishlist(!wishlist)}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-2 text-sm font-medium transition-colors ${wishlist ? 'border-[#CC73B3] bg-[#CC73B3]/10 text-[#CC73B3]' : 'border-border text-muted-foreground hover:border-primary/40'}`}>
                        <Heart className={`h-4 w-4 ${wishlist ? 'fill-[#CC73B3]' : ''}`} />
                        {wishlist ? 'Disimpan' : 'Simpan'}
                      </button>
                      <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border py-2 text-sm font-medium text-muted-foreground hover:border-primary/40 transition-colors">
                        <Share2 className="h-4 w-4" /> Bagikan
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="mt-5 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-center">
                    <AlertCircle className="mx-auto h-8 w-8 text-destructive" />
                    <p className="mt-2 font-semibold text-foreground">Kursi Penuh</p>
                    <p className="mt-1 text-sm text-muted-foreground">Daftarkan email kamu untuk waiting list.</p>
                    <Input className="mt-3" placeholder="email@kamu.com" type="email" />
                    <Button className="mt-2 w-full" variant="outline">Masuk Waiting List</Button>
                  </div>
                )}

                {/* Trust badges */}
                <div className="mt-4 space-y-1.5 border-t border-border pt-4">
                  {[
                    'Tiket terkirim instan ke email',
                    'Sertifikat digital setelah selesai',
                    'Refund 100% jika event dibatalkan',
                  ].map((t) => (
                    <p key={t} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="h-3.5 w-3.5 shrink-0 text-[#A4F000]" /> {t}
                    </p>
                  ))}
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
