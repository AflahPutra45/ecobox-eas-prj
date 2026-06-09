'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { products } from '@/lib/data'
import { formatRupiah } from '@/lib/utils'
import {
  FileText, ArrowRight, ArrowLeft, CheckCircle,
  Plus, Minus, Trash2, Building2, Package,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────
interface CartItem { productId: string; quantity: number }

interface RFQForm {
  // Step 1
  companyName: string
  contactName: string
  email: string
  phone: string
  companyType: string
  npwp: string
  // Step 2
  items: CartItem[]
  deliveryDate: string
  notes: string
  // Step 3
  shippingAddress: string
  city: string
  province: string
  zipCode: string
  paymentTerm: string
}

const COMPANY_TYPES = ['PT / Perseroan Terbatas', 'CV / UD', 'Koperasi', 'Instansi Pemerintah', 'Event Organizer', 'Yayasan / NGO', 'Lainnya']
const PAYMENT_TERMS = ['Transfer Bank (COD)', 'Net-15', 'Net-30', 'Net-45', 'Termin (DP 50%)']

const INITIAL_FORM: RFQForm = {
  companyName: '', contactName: '', email: '', phone: '',
  companyType: '', npwp: '', items: [], deliveryDate: '',
  notes: '', shippingAddress: '', city: '', province: '',
  zipCode: '', paymentTerm: '',
}

const STEPS = [
  { label: 'Data Perusahaan', icon: Building2 },
  { label: 'Pilih Produk', icon: Package },
  { label: 'Pengiriman', icon: FileText },
  { label: 'Selesai', icon: CheckCircle },
]

// ─── Discount tier helper ─────────────────────────────────────────────────────
function getTierDiscount(totalQty: number) {
  if (totalQty >= 1000) return { name: 'Enterprise', pct: 35 }
  if (totalQty >= 200) return { name: 'Business', pct: 20 }
  if (totalQty >= 50) return { name: 'Starter', pct: 10 }
  return { name: 'Retail', pct: 0 }
}

export default function RFQPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<RFQForm>(INITIAL_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const update = (field: keyof RFQForm, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  // ── Item management ───────────────────────────────────────────────────────
  const addItem = (productId: string) => {
    setForm((prev) => {
      const exists = prev.items.find((i) => i.productId === productId)
      if (exists) {
        return { ...prev, items: prev.items.map((i) => i.productId === productId ? { ...i, quantity: i.quantity + 50 } : i) }
      }
      return { ...prev, items: [...prev.items, { productId, quantity: 50 }] }
    })
  }

  const updateQty = (productId: string, qty: number) => {
    if (qty <= 0) {
      setForm((prev) => ({ ...prev, items: prev.items.filter((i) => i.productId !== productId) }))
    } else {
      setForm((prev) => ({ ...prev, items: prev.items.map((i) => i.productId === productId ? { ...i, quantity: qty } : i) }))
    }
  }

  const removeItem = (productId: string) =>
    setForm((prev) => ({ ...prev, items: prev.items.filter((i) => i.productId !== productId) }))

  // ── Calculated values ─────────────────────────────────────────────────────
  const totalQty = form.items.reduce((s, i) => s + i.quantity, 0)
  const tier = getTierDiscount(totalQty)
  const subtotal = form.items.reduce((s, i) => {
    const p = products.find((p) => p.id === i.productId)
    return s + (p ? p.price * i.quantity : 0)
  }, 0)
  const discountAmt = subtotal * (tier.pct / 100)
  const total = subtotal - discountAmt

  const handleSubmit = async () => {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1800))
    setSubmitting(false)
    setSubmitted(true)
    setStep(3)
  }

  // ─── Step 1: Data Perusahaan ─────────────────────────────────────────────
  const Step1 = () => (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="companyName">Nama Perusahaan / Institusi *</Label>
          <Input id="companyName" placeholder="PT Maju Bersama" value={form.companyName}
            onChange={(e) => update('companyName', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactName">Nama Kontak PIC *</Label>
          <Input id="contactName" placeholder="Nama lengkap" value={form.contactName}
            onChange={(e) => update('contactName', e.target.value)} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="rfq-email">Email Bisnis *</Label>
          <Input id="rfq-email" type="email" placeholder="pengadaan@perusahaan.com" value={form.email}
            onChange={(e) => update('email', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rfq-phone">Nomor Telepon *</Label>
          <Input id="rfq-phone" type="tel" placeholder="+62 812 xxxx xxxx" value={form.phone}
            onChange={(e) => update('phone', e.target.value)} />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Jenis Perusahaan / Institusi *</Label>
        <div className="flex flex-wrap gap-2">
          {COMPANY_TYPES.map((type) => (
            <button key={type} type="button" onClick={() => update('companyType', type)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${form.companyType === type
                ? 'border-primary bg-primary/10 text-foreground'
                : 'border-border text-muted-foreground hover:border-primary/50'}`}>
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="npwp">NPWP (opsional — untuk faktur pajak)</Label>
        <Input id="npwp" placeholder="XX.XXX.XXX.X-XXX.XXX" value={form.npwp}
          onChange={(e) => update('npwp', e.target.value)} />
      </div>

      <div className="flex justify-end pt-2">
        <Button
          onClick={() => setStep(1)}
          disabled={!form.companyName || !form.contactName || !form.email || !form.companyType}
          className="bg-primary text-primary-foreground hover:bg-[#8BD400]">
          Selanjutnya <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )

  // ─── Step 2: Pilih Produk ────────────────────────────────────────────────
  const Step2 = () => (
    <div className="space-y-5">
      {/* Tier indicator */}
      <div className={`rounded-xl border p-4 ${tier.pct > 0 ? 'border-primary/30 bg-primary/5' : 'border-border bg-muted/30'}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">
              {tier.pct > 0 ? `Tier ${tier.name} — Diskon ${tier.pct}%` : 'Tambah ≥50 unit untuk mulai diskon'}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Total kuantitas: <span className="font-semibold text-foreground">{totalQty} unit</span>
              {totalQty < 50 && ' · Min. 50 unit untuk Starter (10%)'}
              {totalQty >= 50 && totalQty < 200 && ' · Tambah ke 200 unit untuk Business (20%)'}
              {totalQty >= 200 && totalQty < 1000 && ' · Tambah ke 1.000 unit untuk Enterprise (35%)'}
            </p>
          </div>
          {tier.pct > 0 && (
            <span className="rounded-full bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">
              -{tier.pct}%
            </span>
          )}
        </div>
      </div>

      {/* Product catalog */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-foreground">Katalog Produk</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {products.map((p) => {
            const item = form.items.find((i) => i.productId === p.id)
            return (
              <div key={p.id} className={`rounded-xl border p-4 transition-all ${item ? 'border-primary/30 bg-primary/5' : 'border-border'}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground line-clamp-1">{p.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{p.vendor.name}</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{formatRupiah(p.price)}/unit</p>
                  </div>
                  {!item ? (
                    <Button size="sm" variant="outline" onClick={() => addItem(p.id)} className="shrink-0">
                      <Plus className="mr-1 h-3 w-3" /> Tambah
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => updateQty(p.id, item.quantity - 50)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground">
                        <Minus className="h-3 w-3" />
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQty(p.id, parseInt(e.target.value) || 0)}
                        className="w-16 rounded-lg border border-input bg-background px-2 py-1 text-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring"
                        min={1}
                      />
                      <button onClick={() => updateQty(p.id, item.quantity + 50)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground">
                        <Plus className="h-3 w-3" />
                      </button>
                      <button onClick={() => removeItem(p.id)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Order summary */}
      {form.items.length > 0 && (
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-sm font-semibold text-foreground mb-3">Ringkasan Pesanan</p>
          <div className="space-y-2 text-sm">
            {form.items.map((item) => {
              const p = products.find((p) => p.id === item.productId)
              if (!p) return null
              return (
                <div key={item.productId} className="flex justify-between text-muted-foreground">
                  <span>{p.name} × {item.quantity}</span>
                  <span>{formatRupiah(p.price * item.quantity)}</span>
                </div>
              )
            })}
            <div className="border-t border-border pt-2 flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatRupiah(subtotal)}</span>
            </div>
            {tier.pct > 0 && (
              <div className="flex justify-between text-[#5a8500] font-medium">
                <span>Diskon {tier.name} ({tier.pct}%)</span>
                <span>-{formatRupiah(discountAmt)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-foreground text-base">
              <span>Total Estimasi</span>
              <span>{formatRupiah(total)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Catatan / Spesifikasi Khusus (opsional)</Label>
        <textarea id="notes" rows={3}
          placeholder="Misalnya: custom printing, ukuran khusus, warna tertentu, atau kebutuhan lainnya..."
          value={form.notes}
          onChange={(e) => update('notes', e.target.value)}
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="deliveryDate">Target Tanggal Pengiriman</Label>
        <Input id="deliveryDate" type="date" value={form.deliveryDate}
          onChange={(e) => update('deliveryDate', e.target.value)} />
      </div>

      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={() => setStep(0)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
        </Button>
        <Button
          onClick={() => setStep(2)}
          disabled={form.items.length === 0}
          className="bg-primary text-primary-foreground hover:bg-[#8BD400]">
          Selanjutnya <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )

  // ─── Step 3: Pengiriman ───────────────────────────────────────────────────
  const Step3 = () => (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="shippingAddress">Alamat Pengiriman *</Label>
        <Input id="shippingAddress" placeholder="Jalan, nomor, gedung, lantai..." value={form.shippingAddress}
          onChange={(e) => update('shippingAddress', e.target.value)} />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="rfq-city">Kota *</Label>
          <Input id="rfq-city" placeholder="Surabaya" value={form.city}
            onChange={(e) => update('city', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rfq-province">Provinsi *</Label>
          <Input id="rfq-province" placeholder="Jawa Timur" value={form.province}
            onChange={(e) => update('province', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rfq-zip">Kode Pos</Label>
          <Input id="rfq-zip" placeholder="60123" value={form.zipCode}
            onChange={(e) => update('zipCode', e.target.value)} />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Syarat Pembayaran *</Label>
        <div className="flex flex-wrap gap-2">
          {PAYMENT_TERMS.map((term) => (
            <button key={term} type="button" onClick={() => update('paymentTerm', term)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${form.paymentTerm === term
                ? 'border-primary bg-primary/10 text-foreground'
                : 'border-border text-muted-foreground hover:border-primary/50'}`}>
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Final summary */}
      <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm">
        <p className="font-semibold text-foreground mb-2">Ringkasan RFQ</p>
        <div className="space-y-1 text-muted-foreground">
          <p>Perusahaan: <span className="text-foreground font-medium">{form.companyName}</span></p>
          <p>Kontak: <span className="text-foreground font-medium">{form.contactName} — {form.email}</span></p>
          <p>Total Produk: <span className="text-foreground font-medium">{form.items.length} jenis · {totalQty} unit</span></p>
          <p>Tier Diskon: <span className="text-primary font-bold">{tier.name} ({tier.pct}% off)</span></p>
          <p>Total Estimasi: <span className="text-foreground font-bold">{formatRupiah(total)}</span></p>
        </div>
      </div>

      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={() => setStep(1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={submitting || !form.shippingAddress || !form.city || !form.paymentTerm}
          className="bg-primary text-primary-foreground hover:bg-[#8BD400] min-w-[160px]">
          {submitting ? (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Mengirim RFQ...
            </span>
          ) : (
            <>Kirim RFQ <ArrowRight className="ml-2 h-4 w-4" /></>
          )}
        </Button>
      </div>
    </div>
  )

  // ─── Step 4: Sukses ───────────────────────────────────────────────────────
  const StepSuccess = () => (
    <div className="py-8 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#A4F000]/10">
        <CheckCircle className="h-10 w-10 text-[#A4F000]" />
      </div>
      <h2 className="mt-6 text-2xl font-bold text-foreground">RFQ Berhasil Dikirim! 🎉</h2>
      <p className="mt-3 max-w-md mx-auto text-muted-foreground">
        RFQ dari <span className="font-semibold text-foreground">{form.companyName}</span> sudah kami terima.
        Tim B2B akan menghubungi <span className="font-semibold text-foreground">{form.email}</span> dengan
        penawaran resmi dalam <span className="text-primary font-semibold">24 jam kerja</span>.
      </p>
      <div className="mt-6 inline-block rounded-xl border border-primary/20 bg-primary/5 px-6 py-3">
        <p className="text-sm text-muted-foreground">Nomor RFQ Anda</p>
        <p className="text-xl font-bold text-foreground">
          RFQ-{new Date().getFullYear()}-{Math.random().toString(36).slice(2, 7).toUpperCase()}
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button asChild className="bg-primary text-primary-foreground hover:bg-[#8BD400]">
          <Link href="/b2b/portal">Pantau Status RFQ</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/b2b">Kembali ke Portal B2B</Link>
        </Button>
      </div>
    </div>
  )

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        {/* Hero */}
        <section className="border-b border-border bg-background py-10 lg:py-14">
          <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#A4F000]/10">
              <FileText className="h-7 w-7 text-[#A4F000]" />
            </div>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Request for Quotation (RFQ)
            </h1>
            <p className="mt-3 text-muted-foreground">
              Isi formulir berikut untuk mendapatkan penawaran harga grosir resmi. Gratis, tanpa komitmen.
            </p>
          </div>
        </section>

        {/* Form */}
        <section className="py-10 lg:py-14">
          <div className="mx-auto max-w-2xl px-4 lg:px-8">
            {/* Step indicators */}
            {!submitted && (
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  {STEPS.map((s, i) => {
                    const Icon = s.icon
                    const done = i < step
                    const active = i === step
                    return (
                      <div key={s.label} className="flex flex-1 flex-col items-center">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${done ? 'border-primary bg-primary text-primary-foreground' : active ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-background text-muted-foreground'}`}>
                          {done ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                        </div>
                        <p className={`mt-2 hidden text-xs font-medium sm:block ${active ? 'text-foreground' : 'text-muted-foreground'}`}>{s.label}</p>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <div className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }} />
                </div>
                <p className="mt-2 text-right text-xs text-muted-foreground">Langkah {step + 1} dari {STEPS.length}</p>
              </div>
            )}

            {/* Card */}
            <div className="rounded-2xl border border-border bg-background p-6 shadow-sm lg:p-8">
              {!submitted && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-foreground">{STEPS[step]?.label}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {step === 0 && 'Data perusahaan untuk pembuatan penawaran resmi (SPK/PO).'}
                    {step === 1 && 'Pilih produk dan kuantitas. Diskon otomatis berdasarkan total unit.'}
                    {step === 2 && 'Detail pengiriman dan syarat pembayaran yang diinginkan.'}
                  </p>
                </div>
              )}
              {step === 0 && !submitted && <Step1 />}
              {step === 1 && !submitted && <Step2 />}
              {step === 2 && !submitted && <Step3 />}
              {submitted && <StepSuccess />}
            </div>

            {!submitted && (
              <p className="mt-6 text-center text-sm text-muted-foreground">
                Sudah punya akun B2B?{' '}
                <Link href="/b2b/portal" className="font-medium text-primary hover:underline">Masuk portal →</Link>
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
