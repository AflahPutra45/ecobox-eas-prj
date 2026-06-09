'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    RotateCcw, CheckCircle, Clock, AlertCircle, Leaf,
    ArrowRight, Package, PhoneCall,
} from 'lucide-react'

const reasons = [
    'Produk rusak / cacat saat tiba',
    'Produk tidak sesuai deskripsi',
    'Ukuran / warna salah',
    'Pesanan tidak lengkap',
    'Produk tidak pernah tiba',
    'Lainnya',
]

const steps = [
    { icon: Package, title: 'Ajukan Pengembalian', desc: 'Isi formulir di bawah ini dalam 14 hari setelah menerima produk.' },
    { icon: CheckCircle, title: 'Persetujuan & Label', desc: 'Tim kami akan merespons dalam 1–2 hari kerja dan mengirim label pengembalian gratis.' },
    { icon: RotateCcw, title: 'Kirim Barang Kembali', desc: 'Gunakan kemasan ramah lingkungan asli atau alternatif daur ulang untuk mengirim balik produk.' },
    { icon: Leaf, title: 'Refund / Penggantian', desc: 'Dalam 3–5 hari kerja setelah produk diterima, refund atau penggantian diproses.' },
]

export default function ReturnsPage() {
    const [submitted, setSubmitted] = useState(false)
    const [orderId, setOrderId] = useState('')
    const [reason, setReason] = useState('')
    const [detail, setDetail] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                {/* Hero */}
                <section className="border-b border-border bg-muted/30 py-12 lg:py-16">
                    <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#A4F000]/10">
                            <RotateCcw className="h-8 w-8 text-[#A4F000]" />
                        </div>
                        <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground">
                            Pengembalian Barang
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Tidak puas dengan produk Anda? Kami menawarkan pengembalian mudah selama <strong>14 hari</strong>,
                            dengan proses label gratis dan ramah lingkungan.
                        </p>
                    </div>
                </section>

                {/* Policy Highlights */}
                <div className="mx-auto max-w-4xl px-4 pt-8 lg:px-8">
                    <div className="grid gap-4 sm:grid-cols-3">
                        {[
                            { icon: Clock, text: '14 Hari untuk mengajukan pengembalian' },
                            { icon: CheckCircle, text: 'Label pengiriman gratis disediakan' },
                            { icon: Leaf, text: 'Proses pengembalian ramah lingkungan' },
                        ].map((item) => (
                            <div key={item.text} className="flex items-center gap-3 rounded-xl border border-border bg-background p-4">
                                <item.icon className="h-5 w-5 shrink-0 text-[#A4F000]" />
                                <p className="text-sm font-medium text-foreground">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Process Steps */}
                <section className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
                    <h2 className="text-2xl font-bold text-foreground">Proses Pengembalian</h2>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {steps.map((step, idx) => (
                            <div key={step.title} className="relative rounded-2xl border border-border bg-background p-5">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#A4F000]/10">
                                    <step.icon className="h-5 w-5 text-[#A4F000]" />
                                </div>
                                <span className="absolute right-4 top-4 text-xs font-bold text-muted-foreground">
                                    {idx + 1}
                                </span>
                                <h3 className="mt-3 font-semibold text-foreground">{step.title}</h3>
                                <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Return Form */}
                <section className="border-t border-border bg-muted/30 py-12 lg:py-16">
                    <div className="mx-auto max-w-2xl px-4 lg:px-8">
                        <h2 className="text-2xl font-bold text-foreground">Formulir Pengembalian</h2>
                        <p className="mt-2 text-muted-foreground">
                            Isi formulir berikut untuk memulai proses pengembalian barang.
                        </p>

                        {submitted ? (
                            <div className="mt-8 rounded-2xl border border-[#A4F000]/30 bg-[#A4F000]/5 p-8 text-center">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#A4F000]">
                                    <CheckCircle className="h-8 w-8 text-foreground" />
                                </div>
                                <h3 className="mt-4 text-xl font-bold text-foreground">Pengajuan Diterima!</h3>
                                <p className="mt-2 text-muted-foreground">
                                    Kami akan menghubungi Anda dalam 1–2 hari kerja dengan instruksi selanjutnya dan label pengiriman gratis.
                                </p>
                                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                                    <Button asChild className="bg-primary text-primary-foreground hover:bg-[#8BD400]">
                                        <Link href="/shop">Lanjut Belanja <ArrowRight className="ml-2 h-4 w-4" /></Link>
                                    </Button>
                                    <Button variant="outline" onClick={() => { setSubmitted(false); setOrderId(''); setReason(''); setDetail('') }}>
                                        Ajukan Pengembalian Lain
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-2xl border border-border bg-background p-6">
                                <div>
                                    <Label htmlFor="order-id">Nomor Pesanan</Label>
                                    <Input
                                        id="order-id"
                                        placeholder="ECO-2024-XXXX"
                                        value={orderId}
                                        onChange={(e) => setOrderId(e.target.value)}
                                        className="mt-1.5"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="reason">Alasan Pengembalian</Label>
                                    <select
                                        id="reason"
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        required
                                    >
                                        <option value="">Pilih alasan...</option>
                                        {reasons.map((r) => (
                                            <option key={r} value={r}>{r}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <Label htmlFor="detail">Detail Masalah</Label>
                                    <textarea
                                        id="detail"
                                        rows={4}
                                        placeholder="Jelaskan masalah yang Anda alami secara detail..."
                                        value={detail}
                                        onChange={(e) => setDetail(e.target.value)}
                                        className="mt-1.5 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                                        required
                                    />
                                </div>

                                <div className="flex items-start gap-2 rounded-xl bg-muted/50 p-3 text-xs text-muted-foreground">
                                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                                    Dengan mengajukan pengembalian, Anda menyetujui kebijakan pengembalian EcoBox. Produk harus dalam kondisi asli dan belum digunakan (kecuali cacat produksi).
                                </div>

                                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-[#8BD400]">
                                    Kirim Pengajuan <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>

                                <p className="text-center text-xs text-muted-foreground">
                                    Butuh bantuan?{' '}
                                    <Link href="/contact" className="text-primary hover:underline">Hubungi layanan pelanggan</Link>
                                </p>
                            </form>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
