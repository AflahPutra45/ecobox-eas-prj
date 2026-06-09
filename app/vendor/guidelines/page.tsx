import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import {
    BookOpen, Leaf, Package, FileText, BarChart2,
    ShieldCheck, CheckCircle, ArrowRight, AlertCircle,
} from 'lucide-react'

const sections = [
    {
        icon: ShieldCheck,
        title: 'Standar Produk EcoBox',
        description: 'Semua produk yang terdaftar harus memenuhi kriteria keberlanjutan minimum.',
        rules: [
            'Bebas dari bahan kimia berbahaya (termasuk BPA, ftalat, formaldehida)',
            'Kemasan produk minimal 50% dari bahan daur ulang atau dapat terurai',
            'Tersedia informasi komposisi bahan yang transparan',
            'Mendukung klaim ramah lingkungan dengan sertifikat atau data terverifikasi',
            'Skor keberlanjutan minimum 60/100 untuk dapat dipublikasikan',
        ],
    },
    {
        icon: Package,
        title: 'Panduan Pengemasan & Pengiriman',
        description: 'Vendor bertanggung jawab atas pengemasan yang sesuai standar EcoBox.',
        rules: [
            'Gunakan kemasan bebas plastik sekali pakai untuk pengiriman',
            'Pilih bahan pengisi ramah lingkungan (kertas cacah, bahan pati, dll.)',
            'Cantumkan instruksi daur ulang / kompos pada setiap paket',
            'Ukuran kotak sesuai produk untuk mengurangi material berlebih',
            'Gunakan tinta berbasis air atau kedelai untuk label dan cetakan',
        ],
    },
    {
        icon: FileText,
        title: 'Manajemen Produk & Listing',
        description: 'Panduan untuk membuat halaman produk yang informatif dan jujur.',
        rules: [
            'Foto produk nyata, tidak dimanipulasi berlebihan',
            'Deskripsi produk menjelaskan bahan, ukuran, dan cara penggunaan',
            'Klaim "eco-friendly" harus didukung bukti nyata',
            'Cantumkan negara asal dan informasi manufaktur',
            'Perbarui stok secara real-time untuk menghindari overselling',
        ],
    },
    {
        icon: BarChart2,
        title: 'Pelaporan Dampak',
        description: 'Vendor diminta melaporkan data dampak lingkungan secara berkala.',
        rules: [
            'Laporan dampak tahunan wajib diserahkan kepada tim EcoBox',
            'Informasi plastik dicegah, CO₂ dihemat, dan air dihemat per produk',
            'Transparansi rantai pasok (siapa saja pemasok bahan baku)',
            'Update sertifikasi ketika ada perubahan komposisi produk',
        ],
    },
    {
        icon: Leaf,
        title: 'Etika Bisnis & Komunitas',
        description: 'EcoBox berkomitmen pada ekosistem bisnis yang adil dan beretika.',
        rules: [
            'Tidak ada klaim green-washing tanpa bukti',
            'Harga yang adil dan transparan — tidak ada biaya tersembunyi',
            'Respon pesan pelanggan dalam 24 jam kerja',
            'Proses pengembalian barang yang mudah dan jelas',
            'Dilarang menjual produk yang melanggar hak satwa atau lingkungan',
        ],
    },
]

export default function VendorGuidelinesPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                {/* Hero */}
                <section className="border-b border-border bg-muted/30 py-12 lg:py-16">
                    <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#A4F000]/10">
                            <BookOpen className="h-8 w-8 text-[#A4F000]" />
                        </div>
                        <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground">
                            Panduan Vendor EcoBox
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Panduan lengkap untuk memastikan produk dan operasional Anda memenuhi standar
                            keberlanjutan EcoBox dan memberikan pengalaman terbaik bagi pelanggan.
                        </p>
                    </div>
                </section>

                {/* Alert */}
                <div className="mx-auto max-w-4xl px-4 pt-8 lg:px-8">
                    <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                        <div>
                            <p className="font-semibold">Penting</p>
                            <p>
                                Melanggar panduan ini dapat mengakibatkan penangguhan atau penghapusan akun vendor.
                                Baca dan pahami setiap bagian sebelum mendaftarkan produk.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sections */}
                <section className="mx-auto max-w-4xl px-4 py-8 lg:px-8 lg:py-12">
                    <div className="space-y-6">
                        {sections.map((section, idx) => (
                            <div key={idx} className="rounded-2xl border border-border bg-background p-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#A4F000]/10">
                                        <section.icon className="h-5 w-5 text-[#A4F000]" />
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-foreground">{section.title}</h2>
                                        <p className="text-sm text-muted-foreground">{section.description}</p>
                                    </div>
                                </div>
                                <ul className="mt-4 space-y-2">
                                    {section.rules.map((rule) => (
                                        <li key={rule} className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#A4F000]" />
                                            {rule}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-8 rounded-2xl border border-[#A4F000]/30 bg-[#A4F000]/5 p-6 text-center">
                        <h3 className="font-semibold text-foreground">Sudah siap menjadi vendor?</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Daftar sekarang dan mulai proses sertifikasi untuk menjangkau jutaan konsumen peduli lingkungan.
                        </p>
                        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <Button asChild className="bg-primary text-primary-foreground hover:bg-[#8BD400]">
                                <Link href="/vendor/apply">
                                    Daftar Sekarang <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/certification">Proses Sertifikasi</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
