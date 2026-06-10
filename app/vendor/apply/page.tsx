'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Leaf, Building2, Package, FileText, CheckCircle,
  ArrowRight, ArrowLeft, Upload, Star, ShieldCheck,
  TrendingUp, Users, Store,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  // Step 1 — Profil Bisnis
  businessName: string
  ownerName: string
  email: string
  phone: string
  website: string
  address: string
  city: string
  province: string
  businessType: string

  // Step 2 — Informasi Produk
  productCategory: string
  productDescription: string
  estimatedProducts: string
  priceRange: string
  hasExistingCerts: string
  certDetails: string

  // Step 3 — Komitmen Keberlanjutan
  packagingMaterial: string
  carbonOffset: string
  sustainabilityGoal: string
  socialImpact: string
  agreeGuidelines: boolean
  agreeVerification: boolean
}

const INITIAL_DATA: FormData = {
  businessName: '', ownerName: '', email: '', phone: '',
  website: '', address: '', city: '', province: '', businessType: '',
  productCategory: '', productDescription: '', estimatedProducts: '',
  priceRange: '', hasExistingCerts: '', certDetails: '',
  packagingMaterial: '', carbonOffset: '', sustainabilityGoal: '',
  socialImpact: '', agreeGuidelines: false, agreeVerification: false,
}

const BUSINESS_TYPES = ['Usaha Perorangan', 'CV / UD', 'PT', 'Koperasi', 'Lainnya']
const CATEGORIES = ['Kemasan Ramah Lingkungan', 'Dapur & Makan', 'Perawatan Diri', 'Rumah & Kehidupan', 'Perlengkapan Kantor', 'Fashion Berkelanjutan']
const PRICE_RANGES = ['< Rp 50.000', 'Rp 50.000 – 200.000', 'Rp 200.000 – 500.000', '> Rp 500.000']
const PACKAGING_OPTIONS = ['100% daur ulang', 'Dapat dikompos', 'Dapat digunakan ulang', 'Kertas / karton', 'Minimal plastik', 'Campuran berkelanjutan']
const PRODUCT_COUNTS = ['1–5 produk', '6–20 produk', '21–50 produk', '50+ produk']

// ─── Step indicators ──────────────────────────────────────────────────────────
const STEPS = [
  { label: 'Profil Bisnis', icon: Building2 },
  { label: 'Informasi Produk', icon: Package },
  { label: 'Keberlanjutan', icon: Leaf },
  { label: 'Selesai', icon: CheckCircle },
]

// ─── Why Join cards ───────────────────────────────────────────────────────────
const BENEFITS = [
  { icon: Users, title: '50.000+ Pembeli Aktif', desc: 'Jangkau konsumen yang secara khusus mencari produk ramah lingkungan.' },
  { icon: ShieldCheck, title: 'Badge Terverifikasi', desc: 'Dapatkan kepercayaan konsumen dengan badge sertifikasi resmi EcoBox.' },
  { icon: TrendingUp, title: 'Lacak Dampak Nyata', desc: 'Dashboard analitik dampak lingkungan produk Anda secara real-time.' },
  { icon: Star, title: 'Dukungan Penuh', desc: 'Tim EcoBox siap membantu dari onboarding hingga optimasi penjualan.' },
]

export default function VendorApplyPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(INITIAL_DATA)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const update = (field: keyof FormData, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const nextStep = () => setStep((s) => Math.min(s + 1, 3))
  const prevStep = () => setStep((s) => Math.max(s - 1, 0))

  const handleSubmit = async () => {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1800))
    setSubmitting(false)
    setSubmitted(true)
    setStep(3)
  }

  // ── Step 1: Profil Bisnis ─────────────────────────────────────────────────
  const Step1 = () => (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="businessName">Nama Bisnis / Brand *</Label>
          <Input id="businessName" placeholder="cth. EcoKitchen Co." value={form.businessName}
            onChange={(e) => update('businessName', e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ownerName">Nama Pemilik / PIC *</Label>
          <Input id="ownerName" placeholder="Nama lengkap" value={form.ownerName}
            onChange={(e) => update('ownerName', e.target.value)} required />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email Bisnis *</Label>
          <Input id="email" type="email" placeholder="bisnis@email.com" value={form.email}
            onChange={(e) => update('email', e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Nomor Telepon *</Label>
          <Input id="phone" type="tel" placeholder="+62 812 3456 7890" value={form.phone}
            onChange={(e) => update('phone', e.target.value)} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Website / Toko Online (opsional)</Label>
        <Input id="website" type="url" placeholder="https://" value={form.website}
          onChange={(e) => update('website', e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Alamat Bisnis *</Label>
        <Input id="address" placeholder="Jalan, nomor, RT/RW, kelurahan, kecamatan"
          value={form.address} onChange={(e) => update('address', e.target.value)} required />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="city">Kota / Kabupaten *</Label>
          <Input id="city" placeholder="cth. Surabaya" value={form.city}
            onChange={(e) => update('city', e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="province">Provinsi *</Label>
          <Input id="province" placeholder="cth. Jawa Timur" value={form.province}
            onChange={(e) => update('province', e.target.value)} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Jenis Badan Usaha *</Label>
        <div className="flex flex-wrap gap-2">
          {BUSINESS_TYPES.map((type) => (
            <button key={type} type="button"
              onClick={() => update('businessType', type)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                form.businessType === type
                  ? 'border-primary bg-primary/10 text-foreground'
                  : 'border-border text-muted-foreground hover:border-primary/50'
              }`}>
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button
          onClick={nextStep}
          disabled={!form.businessName || !form.ownerName || !form.email || !form.phone || !form.city || !form.businessType}
          className="bg-primary text-primary-foreground hover:bg-[#8BD400]"
        >
          Selanjutnya <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )

  // ── Step 2: Informasi Produk ───────────────────────────────────────────────
  const Step2 = () => (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label>Kategori Produk Utama *</Label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button key={cat} type="button"
              onClick={() => update('productCategory', cat)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                form.productCategory === cat
                  ? 'border-primary bg-primary/10 text-foreground'
                  : 'border-border text-muted-foreground hover:border-primary/50'
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="productDescription">Deskripsi Produk Unggulan *</Label>
        <textarea
          id="productDescription"
          rows={4}
          placeholder="Ceritakan produk unggulan Anda, bahan yang digunakan, manfaat lingkungan, dan apa yang membuatnya unik..."
          value={form.productDescription}
          onChange={(e) => update('productDescription', e.target.value)}
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          required
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Jumlah Produk yang Akan Didaftarkan *</Label>
          <div className="flex flex-wrap gap-2">
            {PRODUCT_COUNTS.map((count) => (
              <button key={count} type="button"
                onClick={() => update('estimatedProducts', count)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                  form.estimatedProducts === count
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border text-muted-foreground hover:border-primary/50'
                }`}>
                {count}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Kisaran Harga Produk *</Label>
          <div className="flex flex-wrap gap-2">
            {PRICE_RANGES.map((range) => (
              <button key={range} type="button"
                onClick={() => update('priceRange', range)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                  form.priceRange === range
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border text-muted-foreground hover:border-primary/50'
                }`}>
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Label>Apakah produk Anda sudah memiliki sertifikasi? *</Label>
        <div className="flex gap-3">
          {['Ya, sudah', 'Belum, tapi sedang proses', 'Belum'].map((opt) => (
            <button key={opt} type="button"
              onClick={() => update('hasExistingCerts', opt)}
              className={`flex-1 rounded-xl border py-3 text-sm font-medium transition-all ${
                form.hasExistingCerts === opt
                  ? 'border-primary bg-primary/10 text-foreground'
                  : 'border-border text-muted-foreground hover:border-primary/50'
              }`}>
              {opt}
            </button>
          ))}
        </div>
      </div>

      {form.hasExistingCerts === 'Ya, sudah' && (
        <div className="space-y-2">
          <Label htmlFor="certDetails">Detail Sertifikasi</Label>
          <Input id="certDetails" placeholder="cth. SNI, ISO 14001, BPOM, Halal MUI..." value={form.certDetails}
            onChange={(e) => update('certDetails', e.target.value)} />
        </div>
      )}

      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={prevStep}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
        </Button>
        <Button
          onClick={nextStep}
          disabled={!form.productCategory || !form.productDescription || !form.estimatedProducts || !form.hasExistingCerts}
          className="bg-primary text-primary-foreground hover:bg-[#8BD400]"
        >
          Selanjutnya <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )

  // ── Step 3: Komitmen Keberlanjutan ─────────────────────────────────────────
  const Step3 = () => (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label>Material Kemasan yang Anda Gunakan * (pilih semua yang sesuai)</Label>
        <div className="flex flex-wrap gap-2">
          {PACKAGING_OPTIONS.map((opt) => {
            const selected = form.packagingMaterial.split(',').map(s => s.trim()).includes(opt)
            return (
              <button key={opt} type="button"
                onClick={() => {
                  const current = form.packagingMaterial ? form.packagingMaterial.split(',').map(s => s.trim()) : []
                  const next = selected ? current.filter(v => v !== opt) : [...current, opt]
                  update('packagingMaterial', next.join(', '))
                }}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                  selected
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border text-muted-foreground hover:border-primary/50'
                }`}>
                {opt}
              </button>
            )
          })}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Apakah bisnis Anda memiliki program offset karbon? *</Label>
        <div className="flex gap-3">
          {['Ya, aktif', 'Sedang direncanakan', 'Belum'].map((opt) => (
            <button key={opt} type="button"
              onClick={() => update('carbonOffset', opt)}
              className={`flex-1 rounded-xl border py-3 text-sm font-medium transition-all ${
                form.carbonOffset === opt
                  ? 'border-primary bg-primary/10 text-foreground'
                  : 'border-border text-muted-foreground hover:border-primary/50'
              }`}>
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sustainabilityGoal">Target Keberlanjutan Bisnis Anda (1–2 tahun ke depan) *</Label>
        <textarea
          id="sustainabilityGoal"
          rows={3}
          placeholder="cth. Mengurangi plastik 100% dari semua kemasan, mendapatkan sertifikasi ISO 14001, mengurangi emisi karbon 30%..."
          value={form.sustainabilityGoal}
          onChange={(e) => update('sustainabilityGoal', e.target.value)}
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="socialImpact">Dampak Sosial Bisnis Anda (opsional)</Label>
        <textarea
          id="socialImpact"
          rows={2}
          placeholder="cth. Memberdayakan pengrajin lokal, mendukung petani organik, memberikan pelatihan daur ulang..."
          value={form.socialImpact}
          onChange={(e) => update('socialImpact', e.target.value)}
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
      </div>

      {/* File upload placeholder */}
      <div className="space-y-2">
        <Label>Dokumen Pendukung (opsional)</Label>
        <div className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/30 p-8 text-center transition-colors hover:border-primary/50 hover:bg-muted/50">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Sertifikat, laporan dampak, atau dokumen pendukung lainnya
          </p>
          <p className="text-xs text-muted-foreground">PDF, JPG, PNG — maks. 10MB per file</p>
          <Button variant="outline" size="sm" type="button" className="mt-1">
            Pilih File
          </Button>
        </div>
      </div>

      {/* Agreement */}
      <div className="space-y-3 rounded-xl border border-border bg-muted/30 p-4">
        <label className="flex cursor-pointer items-start gap-3">
          <div
            onClick={() => update('agreeGuidelines', !form.agreeGuidelines)}
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
              form.agreeGuidelines ? 'border-primary bg-primary' : 'border-border bg-background'
            }`}
          >
            {form.agreeGuidelines && <CheckCircle className="h-3 w-3 text-primary-foreground" />}
          </div>
          <span className="text-sm text-muted-foreground">
            Saya telah membaca dan menyetujui{' '}
            <Link href="/vendor/guidelines" target="_blank" className="text-primary hover:underline font-medium">
              Panduan Vendor EcoBox
            </Link>{' '}
            dan berkomitmen untuk mematuhi seluruh standar yang berlaku. *
          </span>
        </label>

        <label className="flex cursor-pointer items-start gap-3">
          <div
            onClick={() => update('agreeVerification', !form.agreeVerification)}
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
              form.agreeVerification ? 'border-primary bg-primary' : 'border-border bg-background'
            }`}
          >
            {form.agreeVerification && <CheckCircle className="h-3 w-3 text-primary-foreground" />}
          </div>
          <span className="text-sm text-muted-foreground">
            Saya bersedia menjalani proses verifikasi produk oleh tim EcoBox sebelum listing dipublikasikan. *
          </span>
        </label>
      </div>

      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={prevStep}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={
            submitting ||
            !form.packagingMaterial ||
            !form.carbonOffset ||
            !form.sustainabilityGoal ||
            !form.agreeGuidelines ||
            !form.agreeVerification
          }
          className="bg-primary text-primary-foreground hover:bg-[#8BD400] min-w-[160px]"
        >
          {submitting ? (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Mengirim...
            </span>
          ) : (
            <>Kirim Pendaftaran <ArrowRight className="ml-2 h-4 w-4" /></>
          )}
        </Button>
      </div>
    </div>
  )

  // ── Step 4: Sukses ─────────────────────────────────────────────────────────
  const StepSuccess = () => (
    <div className="py-8 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#A4F000]/10">
        <CheckCircle className="h-10 w-10 text-[#A4F000]" />
      </div>
      <h2 className="mt-6 text-2xl font-bold text-foreground">
        Pendaftaran Berhasil Dikirim! 🎉
      </h2>
      <p className="mt-3 text-muted-foreground max-w-md mx-auto">
        Terima kasih, <span className="font-semibold text-foreground">{form.businessName || 'Anda'}</span>!
        Tim EcoBox akan meninjau pendaftaran Anda dan menghubungi melalui email{' '}
        <span className="font-semibold text-foreground">{form.email}</span> dalam{' '}
        <span className="text-primary font-semibold">3–5 hari kerja</span>.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3 text-left max-w-lg mx-auto">
        {[
          { step: '1', label: 'Tinjauan Admin', desc: 'Tim kami memeriksa kelengkapan dokumen' },
          { step: '2', label: 'Verifikasi Produk', desc: 'Sampel produk diuji sesuai standar EcoBox' },
          { step: '3', label: 'Akun Aktif', desc: 'Produk Anda mulai tampil di platform' },
        ].map((item) => (
          <div key={item.step} className="rounded-xl border border-border bg-muted/30 p-4">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {item.step}
            </div>
            <p className="mt-2 text-sm font-semibold text-foreground">{item.label}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button asChild className="bg-primary text-primary-foreground hover:bg-[#8BD400]">
          <Link href="/">Kembali ke Beranda</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/vendor/guidelines">Baca Panduan Vendor</Link>
        </Button>
      </div>
    </div>
  )

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="border-b border-border bg-muted/30 py-12 lg:py-16">
          <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#A4F000]/10">
              <Store className="h-8 w-8 text-[#A4F000]" />
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Daftar Jadi Vendor EcoBox
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Jangkau 50.000+ konsumen peduli lingkungan, dapatkan badge terverifikasi, dan lacak dampak nyata produk Anda.
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="border-b border-border py-10">
          <div className="mx-auto max-w-5xl px-4 lg:px-8">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {BENEFITS.map((b) => (
                <div key={b.title} className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#A4F000]/10">
                    <b.icon className="h-5 w-5 text-[#A4F000]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{b.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-2xl px-4 lg:px-8">

            {/* Step indicators */}
            {!submitted && (
              <div className="mb-10">
                <div className="flex items-center justify-between">
                  {STEPS.map((s, i) => {
                    const Icon = s.icon
                    const done = i < step
                    const active = i === step
                    return (
                      <div key={s.label} className="flex flex-1 flex-col items-center">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                          done ? 'border-primary bg-primary text-primary-foreground'
                            : active ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-background text-muted-foreground'
                        }`}>
                          {done ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                        </div>
                        <p className={`mt-2 hidden text-xs font-medium sm:block ${active ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {s.label}
                        </p>
                        {/* Connector line */}
                        {i < STEPS.length - 1 && (
                          <div className="absolute" style={{ display: 'none' }} />
                        )}
                      </div>
                    )
                  })}
                </div>
                {/* Progress bar */}
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
                  />
                </div>
                <p className="mt-2 text-right text-xs text-muted-foreground">
                  Langkah {step + 1} dari {STEPS.length}
                </p>
              </div>
            )}

            {/* Card */}
            <div className="rounded-2xl border border-border bg-background p-6 shadow-sm lg:p-8">
              {!submitted && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-foreground">{STEPS[step]?.label}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {step === 0 && 'Isi informasi dasar bisnis dan kontak Anda.'}
                    {step === 1 && 'Ceritakan produk yang ingin Anda jual di EcoBox.'}
                    {step === 2 && 'Tunjukkan komitmen keberlanjutan bisnis Anda.'}
                  </p>
                </div>
              )}

              {step === 0 && !submitted && <Step1 />}
              {step === 1 && !submitted && <Step2 />}
              {step === 2 && !submitted && <Step3 />}
              {submitted && <StepSuccess />}
            </div>

            {/* Already have account */}
            {!submitted && (
              <p className="mt-6 text-center text-sm text-muted-foreground">
                Sudah punya akun vendor?{' '}
                <Link href="/vendor/login" className="font-medium text-primary hover:underline">
                  Masuk di sini
                </Link>
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
