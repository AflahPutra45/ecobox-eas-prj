import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Truck, Clock, Leaf, MapPin, PackageCheck, ShieldCheck, CheckCircle, HelpCircle } from 'lucide-react'

const shippingMethods = [
    {
        name: 'Eco Standar',
        duration: '5–7 hari kerja',
        price: 'Gratis untuk semua pesanan',
        icon: Truck,
        desc: 'Pengiriman standa dengan offset karbon penuh. Semua pesanan EcoBox otomatis mendapatkan pilihan ini tanpa biaya tambahan.',
        badge: 'Paling Populer',
        badgeColor: 'bg-[#A4F000]/20 text-[#5a8500]',
    },
    {
        name: 'Eco Express',
        duration: '2–3 hari kerja',
        price: 'Rp 45.000',
        icon: Clock,
        desc: 'Pengiriman lebih cepat menggunakan mitra logistik bertenaga terbarukan. Cocok untuk kebutuhan mendesak.',
        badge: 'Lebih Cepat',
        badgeColor: 'bg-blue-100 text-blue-700',
    },
    {
        name: 'Eco Sameday',
        duration: 'Hari yang sama (pesan sebelum 11.00 WIB)',
        price: 'Rp 75.000',
        icon: MapPin,
        desc: 'Tersedia untuk area Jabodetabek, Surabaya, dan Bali. Kurir menggunakan kendaraan listrik & sepeda.',
        badge: 'Ramah Lingkungan',
        badgeColor: 'bg-[#CC73B3]/20 text-[#8B3F78]',
    },
]

const carbonInfo = [
    { title: 'Offset Karbon Otomatis', desc: 'Setiap pengiriman EcoBox secara otomatis di-offset melalui program penanaman pohon dan energi terbarukan.' },
    { title: 'Kurir Hijau', desc: 'Kami bermitra dengan logistik yang menggunakan kendaraan listrik, hybrid, dan sepeda untuk pengiriman terakhir.' },
    { title: 'Kemasan Minimal', desc: 'Tidak ada styrofoam, bubble wrap plastik, atau pengemasan berlebihan. Semua kotak bisa didaur ulang.' },
]

const faqs = [
    { q: 'Apakah ada minimum pembelian untuk gratis ongkir?', a: 'Tidak! Semua pesanan EcoBox mendapatkan pengiriman Eco Standar gratis tanpa minimum pembelian.' },
    { q: 'Apakah bisa mengirim ke seluruh Indonesia?', a: 'Ya, kami mengirim ke seluruh wilayah Indonesia. Untuk daerah terpencil, estimasi waktu bisa lebih panjang (7–14 hari kerja).' },
    { q: 'Bagaimana cara melacak pesanan saya?', a: 'Setelah pesanan diproses, Anda akan menerima email berisi nomor resi dan link pelacakan real-time.' },
    { q: 'Apakah pengiriman internasional tersedia?', a: 'Saat ini kami belum melayani pengiriman internasional, namun sedang dalam pengembangan untuk 2026–2027.' },
]

export default function ShippingPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                {/* Hero */}
                <section className="border-b border-border bg-muted/30 py-12 lg:py-16">
                    <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#A4F000]/10">
                            <Truck className="h-8 w-8 text-[#A4F000]" />
                        </div>
                        <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground">
                            Info Pengiriman
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Semua pengiriman EcoBox gratis ongkir, dioffset karbonnya, dan menggunakan kemasan
                            yang 100% bebas plastik.
                        </p>
                    </div>
                </section>

                {/* Methods */}
                <section className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
                    <h2 className="text-2xl font-bold text-foreground">Pilihan Pengiriman</h2>
                    <div className="mt-6 space-y-4">
                        {shippingMethods.map((method) => (
                            <div key={method.name} className="rounded-2xl border border-border bg-background p-6">
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#A4F000]/10">
                                            <method.icon className="h-5 w-5 text-[#A4F000]" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold text-foreground">{method.name}</h3>
                                                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${method.badgeColor}`}>
                                                    {method.badge}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{method.duration}</p>
                                        </div>
                                    </div>
                                    <span className="rounded-lg bg-muted px-3 py-1.5 text-sm font-semibold text-foreground">
                                        {method.price}
                                    </span>
                                </div>
                                <p className="mt-3 text-sm text-muted-foreground">{method.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Carbon Neutral Info */}
                <section className="border-t border-[#A4F000]/20 bg-[#A4F000]/5 py-12 lg:py-16">
                    <div className="mx-auto max-w-4xl px-4 lg:px-8">
                        <div className="flex items-center gap-2">
                            <Leaf className="h-6 w-6 text-[#A4F000]" />
                            <h2 className="text-2xl font-bold text-foreground">Pengiriman Netral Karbon</h2>
                        </div>
                        <p className="mt-2 text-muted-foreground">
                            Kami berkomitmen bahwa setiap paket yang dikirim tidak meninggalkan jejak karbon.
                        </p>
                        <div className="mt-6 grid gap-4 sm:grid-cols-3">
                            {carbonInfo.map((item) => (
                                <div key={item.title} className="rounded-2xl border border-[#A4F000]/30 bg-background p-5">
                                    <CheckCircle className="h-5 w-5 text-[#A4F000]" />
                                    <h3 className="mt-2 font-semibold text-foreground">{item.title}</h3>
                                    <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
                    <div className="flex items-center gap-2">
                        <HelpCircle className="h-6 w-6 text-muted-foreground" />
                        <h2 className="text-2xl font-bold text-foreground">Pertanyaan Umum</h2>
                    </div>
                    <div className="mt-6 space-y-4">
                        {faqs.map((faq) => (
                            <div key={faq.q} className="rounded-2xl border border-border bg-background p-5">
                                <h3 className="font-medium text-foreground">{faq.q}</h3>
                                <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
