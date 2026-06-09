import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import {
    ClipboardList, Search, FlaskConical, ShieldCheck, Award,
    CheckCircle, ArrowRight, Clock,
} from 'lucide-react'

const steps = [
    {
        step: 1,
        icon: ClipboardList,
        title: 'Daftar & Lengkapi Profil',
        duration: '1-2 hari',
        description:
            'Buat akun vendor dan lengkapi profil bisnis Anda. Masukkan informasi perusahaan, NPWP, dan dokumen legalitas usaha.',
        items: ['KTP / Akta Perusahaan', 'NPWP', 'SIUP / NIB', 'Rekening Bank Perusahaan'],
    },
    {
        step: 2,
        icon: Search,
        title: 'Pengajuan & Review Dokumen',
        duration: '3-5 hari kerja',
        description:
            'Tim verifikasi kami akan meninjau semua dokumen yang Anda ajukan. Proses ini memastikan kepatuhan terhadap standar sustainability EcoBox.',
        items: ['Verifikasi identitas bisnis', 'Pemeriksaan legalitas usaha', 'Evaluasi awal produk'],
    },
    {
        step: 3,
        icon: FlaskConical,
        title: 'Audit Produk & Keberlanjutan',
        duration: '7-14 hari kerja',
        description:
            'Produk Anda akan diaudit oleh mitra sertifikasi kami. Kami menilai bahan baku, proses produksi, dampak lingkungan, dan klaim keberlanjutan.',
        items: [
            'Analisis komposisi bahan',
            'Evaluasi rantai pasok',
            'Perhitungan jejak karbon',
            'Uji kompostabilitas / biodegradabilitas',
        ],
    },
    {
        step: 4,
        icon: ShieldCheck,
        title: 'Review & Keputusan Akhir',
        duration: '2-3 hari kerja',
        description:
            'Berdasarkan hasil audit, tim kami membuat keputusan sertifikasi. Anda akan menerima laporan detail terlepas dari hasilnya.',
        items: ['Laporan audit lengkap', 'Feedback perbaikan (jika diperlukan)', 'Keputusan sertifikasi resmi'],
    },
    {
        step: 5,
        icon: Award,
        title: 'Onboarding & Publikasi Produk',
        duration: '1-2 hari',
        description:
            'Selamat! Produk Anda mendapat badge "Berkelanjutan Terverifikasi" dan siap tampil di marketplace EcoBox untuk jutaan konsumen.',
        items: ['Badge terverifikasi di produk', 'Akses dashboard vendor', 'Dukungan tim EcoBox'],
    },
]

const certLevels = [
    { name: 'Eco Basic', color: 'bg-amber-100 text-amber-800', score: '60–74', desc: 'Memenuhi standar keberlanjutan dasar EcoBox' },
    { name: 'Eco Certified', color: 'bg-[#A4F000]/20 text-[#5a8500]', score: '75–89', desc: 'Produk dengan dampak lingkungan yang signifikan' },
    { name: 'Eco Premium', color: 'bg-[#CC73B3]/20 text-[#8B3F78]', score: '90–100', desc: 'Standar tertinggi keberlanjutan di platform kami' },
]

export default function CertificationPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                {/* Hero */}
                <section className="border-b border-border bg-muted/30 py-12 lg:py-16">
                    <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#A4F000]/10">
                            <Award className="h-8 w-8 text-[#A4F000]" />
                        </div>
                        <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground">
                            Proses Sertifikasi Vendor
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Menjadi vendor terverifikasi EcoBox berarti Anda berkomitmen pada transparansi dan dampak
                            lingkungan yang nyata. Berikut proses lengkapnya.
                        </p>
                        <Button asChild className="mt-8 bg-primary text-primary-foreground hover:bg-[#8BD400]">
                            <Link href="/vendor/apply">
                                Mulai Proses Sertifikasi <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </section>

                {/* Steps */}
                <section className="mx-auto max-w-4xl px-4 py-12 lg:px-8 lg:py-16">
                    <h2 className="text-2xl font-bold text-foreground">Langkah-Langkah Sertifikasi</h2>
                    <p className="mt-2 text-muted-foreground">Total estimasi waktu: 14–26 hari kerja</p>

                    <div className="mt-8 space-y-6">
                        {steps.map((s) => (
                            <div key={s.step} className="flex gap-6 rounded-2xl border border-border bg-background p-6">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#A4F000]/10">
                                    <s.icon className="h-6 w-6 text-[#A4F000]" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-xs font-medium text-muted-foreground">Langkah {s.step}</span>
                                        <span className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                                            <Clock className="h-3 w-3" /> {s.duration}
                                        </span>
                                    </div>
                                    <h3 className="mt-1 text-lg font-semibold text-foreground">{s.title}</h3>
                                    <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                                    <ul className="mt-3 space-y-1">
                                        {s.items.map((item) => (
                                            <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <CheckCircle className="h-4 w-4 shrink-0 text-[#A4F000]" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Certification Levels */}
                <section className="border-t border-border bg-muted/30 py-12 lg:py-16">
                    <div className="mx-auto max-w-4xl px-4 lg:px-8">
                        <h2 className="text-2xl font-bold text-foreground">Level Sertifikasi</h2>
                        <p className="mt-2 text-muted-foreground">
                            Setiap produk diberi skor 0–100 berdasarkan Sustainability Score kami.
                        </p>
                        <div className="mt-6 grid gap-4 sm:grid-cols-3">
                            {certLevels.map((level) => (
                                <div key={level.name} className="rounded-2xl border border-border bg-background p-5">
                                    <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${level.color}`}>
                                        {level.name}
                                    </span>
                                    <p className="mt-3 text-2xl font-bold text-foreground">{level.score}</p>
                                    <p className="text-sm text-muted-foreground">Skor</p>
                                    <p className="mt-2 text-sm text-muted-foreground">{level.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 rounded-2xl border border-border bg-background p-6 text-center">
                            <h3 className="font-semibold text-foreground">Siap bergabung?</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Hubungi tim kami atau mulai proses pendaftaran langsung melalui portal vendor.
                            </p>
                            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
                                <Button asChild className="bg-primary text-primary-foreground hover:bg-[#8BD400]">
                                    <Link href="/vendor/apply">Daftar Jadi Vendor</Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/vendor/guidelines">Lihat Panduan Vendor</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
