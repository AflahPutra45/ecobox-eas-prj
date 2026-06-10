import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import {
  Calendar, Clock, MapPin, Users, Star, ArrowRight,
  Sparkles, Video, Ticket, Filter, Globe, Leaf,
} from 'lucide-react'

// ─── Event Data ───────────────────────────────────────────────────────────────
export interface EventItem {
  id: string
  title: string
  subtitle: string
  type: 'workshop' | 'webinar' | 'roadshow'
  format: 'online' | 'offline' | 'hybrid'
  instructor: { name: string; title: string; avatar: string }
  date: string
  time: string
  duration: string
  location: string
  price: number
  originalPrice?: number
  capacity: number
  enrolled: number
  tags: string[]
  level: 'Pemula' | 'Menengah' | 'Semua Level'
  rating: number
  reviewCount: number
  image: string
  featured?: boolean
  description: string
  whatYouLearn: string[]
}

export const events: EventItem[] = [
  {
    id: 'ev-001',
    title: 'Workshop Membuat Kompos di Rumah',
    subtitle: 'Ubah sampah dapur menjadi emas hitam untuk tanaman',
    type: 'workshop',
    format: 'offline',
    instructor: {
      name: 'Bimo Satria',
      title: 'Eco Home Specialist · 6 tahun pengalaman',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    },
    date: '22 Jun 2026',
    time: '09:00 – 12:00 WIB',
    duration: '3 jam',
    location: 'EcoHub Surabaya · Jl. Raya Darmo No. 45',
    price: 75000,
    originalPrice: 120000,
    capacity: 30,
    enrolled: 24,
    tags: ['Kompos', 'Dapur', 'Zero Waste'],
    level: 'Pemula',
    rating: 4.9,
    reviewCount: 87,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
    featured: true,
    description: 'Pelajari cara membuat kompos dari sampah organik dapur dan kebun. Anda akan mendapatkan kit starter kompos untuk dibawa pulang.',
    whatYouLearn: ['Jenis sampah yang bisa dikompos', 'Teknik layering yang benar', 'Cara mengatasi kompos bau', 'Menggunakan kompos untuk tanaman'],
  },
  {
    id: 'ev-002',
    title: 'Webinar: Memulai Zero Waste di 30 Hari',
    subtitle: 'Panduan praktis tanpa overwhelm untuk pemula absolute',
    type: 'webinar',
    format: 'online',
    instructor: {
      name: 'Hana Pertiwi',
      title: 'Zero Waste Coach · 4 tahun pengalaman',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face',
    },
    date: '25 Jun 2026',
    time: '19:00 – 20:30 WIB',
    duration: '90 menit',
    location: 'Zoom (link dikirim setelah pendaftaran)',
    price: 35000,
    capacity: 200,
    enrolled: 178,
    tags: ['Zero Waste', 'Lifestyle', 'Pemula'],
    level: 'Pemula',
    rating: 4.8,
    reviewCount: 214,
    image: 'https://images.unsplash.com/photo-1542601906897-ecd708e0ee5c?w=600&h=400&fit=crop',
    featured: true,
    description: 'Webinar interaktif yang akan mengubah cara pandang kamu tentang sampah. Tidak ada teori rumit — hanya langkah nyata yang bisa dilakukan besok.',
    whatYouLearn: ['Framework 5R untuk kehidupan sehari-hari', 'Checklist pengganti plastik terjangkau', 'Cara ajak keluarga ikut serta', 'Tools untuk tracking sampahmu'],
  },
  {
    id: 'ev-003',
    title: 'Kelas Sabun Natural & Skincare Eco',
    subtitle: 'Buat sabun dan losion sendiri tanpa bahan kimia berbahaya',
    type: 'workshop',
    format: 'offline',
    instructor: {
      name: 'Sari Rahayu',
      title: 'Natural Beauty Formulator · 5 tahun pengalaman',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    },
    date: '29 Jun 2026',
    time: '13:00 – 17:00 WIB',
    duration: '4 jam',
    location: 'EcoLab Jakarta · Jl. Kemang Raya No. 12',
    price: 150000,
    originalPrice: 200000,
    capacity: 20,
    enrolled: 19,
    tags: ['Sabun Natural', 'Skincare', 'DIY', 'Perawatan Diri'],
    level: 'Semua Level',
    rating: 5.0,
    reviewCount: 56,
    image: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=600&h=400&fit=crop',
    featured: true,
    description: 'Workshop hands-on membuat sabun cold process dan losion tubuh dari bahan alami. Semua bahan dan alat disediakan. Bawa pulang hasil karyamu!',
    whatYouLearn: ['Dasar formulasi sabun cold process', 'Memilih minyak carrier & essential oil', 'Membuat losion & body butter', 'Pengemasan eco-friendly'],
  },
  {
    id: 'ev-004',
    title: 'EcoBox Community Roadshow – Bandung',
    subtitle: 'Pameran, sharing session & flash sale produk eco',
    type: 'roadshow',
    format: 'offline',
    instructor: {
      name: 'Tim EcoBox',
      title: 'EcoBox Community Team',
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=80&h=80&fit=crop',
    },
    date: '5 Jul 2026',
    time: '10:00 – 17:00 WIB',
    duration: 'Seharian',
    location: 'Dago Pakar, Bandung',
    price: 0,
    capacity: 500,
    enrolled: 342,
    tags: ['Community', 'Pameran', 'Networking', 'Gratis'],
    level: 'Semua Level',
    rating: 4.9,
    reviewCount: 128,
    image: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=600&h=400&fit=crop',
    description: 'Roadshow EcoBox hadir di Bandung! Temui komunitas eco-friendly, ikuti talkshow bersama thought leaders, dan dapatkan flash sale produk pilihan.',
    whatYouLearn: ['Talkshow dengan 5 narasumber', 'Pameran 30+ brand eco lokal', 'Workshop mini gratis', 'Networking sesama Green Starter'],
  },
  {
    id: 'ev-005',
    title: 'Webinar B2B: ESG & Pengadaan Berkelanjutan',
    subtitle: 'Strategi pengadaan hijau untuk memenuhi target ESG korporat',
    type: 'webinar',
    format: 'online',
    instructor: {
      name: 'Dicky Hadi Firmansyah',
      title: 'CEO EcoBox · Sustainability Expert',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face',
    },
    date: '10 Jul 2026',
    time: '14:00 – 16:00 WIB',
    duration: '2 jam',
    location: 'Google Meet (eksklusif peserta terdaftar)',
    price: 200000,
    capacity: 50,
    enrolled: 31,
    tags: ['B2B', 'ESG', 'Korporat', 'Sustainability'],
    level: 'Menengah',
    rating: 4.9,
    reviewCount: 42,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    description: 'Eksklusif untuk tim pengadaan dan sustainability officer. Pelajari strategi praktis membangun rantai pasok hijau dan menyiapkan laporan ESG.',
    whatYouLearn: ['Kerangka ESG reporting Indonesia 2026', 'Vendor screening criteria', 'Studi kasus perusahaan Fortune 500', 'Q&A langsung dengan CEO EcoBox'],
  },
  {
    id: 'ev-006',
    title: 'Workshop Zero Waste untuk Rumah Tangga',
    subtitle: 'Transformasi total rumahmu dalam 1 hari intensif',
    type: 'workshop',
    format: 'hybrid',
    instructor: {
      name: 'Hana Pertiwi',
      title: 'Zero Waste Coach · 4 tahun pengalaman',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face',
    },
    date: '19 Jul 2026',
    time: '08:00 – 15:00 WIB',
    duration: '7 jam intensif',
    location: 'EcoHub Surabaya + Live Stream',
    price: 125000,
    originalPrice: 175000,
    capacity: 40,
    enrolled: 22,
    tags: ['Rumah Tangga', 'Zero Waste', 'Intensif'],
    level: 'Semua Level',
    rating: 4.8,
    reviewCount: 63,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
    description: 'Workshop full-day yang membahas setiap sudut rumah: dapur, kamar mandi, ruang kerja, hingga area laundry. Peserta mendapat eco-starter kit senilai Rp 75.000.',
    whatYouLearn: ['Audit sampah rumah tangga', 'Zero waste dapur & kamar mandi', 'DIY pembersih alami', 'Sistem belanja minim sampah'],
  },
]

// ─── Format helpers ───────────────────────────────────────────────────────────
function formatRupiah(n: number) {
  if (n === 0) return 'GRATIS'
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)
}

const TYPE_LABELS: Record<string, string> = {
  workshop: '🛠️ Workshop',
  webinar: '💻 Webinar',
  roadshow: '🚌 Roadshow',
}

const FORMAT_BADGE: Record<string, { label: string; color: string }> = {
  online: { label: 'Online', color: 'bg-blue-100 text-blue-700' },
  offline: { label: 'Offline', color: 'bg-[#A4F000]/20 text-[#5a8500]' },
  hybrid: { label: 'Hybrid', color: 'bg-[#CC73B3]/10 text-[#CC73B3]' },
}

const LEVEL_COLOR: Record<string, string> = {
  'Pemula': 'bg-emerald-100 text-emerald-700',
  'Menengah': 'bg-amber-100 text-amber-700',
  'Semua Level': 'bg-muted text-muted-foreground',
}

const FILTERS = ['Semua', 'Workshop', 'Webinar', 'Roadshow', 'Online', 'Gratis']

export default function EventsPage() {
  const featured = events.filter((e) => e.featured)
  const upcoming = events.slice(3)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-foreground py-20 lg:py-24">
          <div className="absolute inset-0 -z-10">
            <div className="absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/4 translate-x-1/4 rounded-full bg-[#A4F000]/15 blur-3xl" />
            <div className="absolute left-0 bottom-0 h-[400px] w-[400px] translate-y-1/4 -translate-x-1/4 rounded-full bg-[#CC73B3]/15 blur-3xl" />
          </div>
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#A4F000]/30 bg-[#A4F000]/10 px-4 py-1.5 text-sm font-medium text-[#A4F000]">
                <Ticket className="h-4 w-4" />
                E-Workshop & Event Ticketing
              </div>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-background sm:text-5xl lg:text-6xl">
                Belajar,{' '}
                <span className="text-[#A4F000]">Tumbuh,</span>{' '}
                Berdampak
              </h1>
              <p className="mt-6 text-lg text-background/75">
                Workshop, webinar, dan community event eksklusif EcoBox — dari kelas membuat kompos, sabun natural, hingga zero waste untuk rumah tangga. Jadikan gaya hidup hijau keahlian nyata.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-background/70">
                {[
                  { icon: Video, label: '6 Event Aktif' },
                  { icon: Users, label: '800+ Peserta' },
                  { icon: Star, label: 'Rating 4.9/5' },
                  { icon: Globe, label: 'Online & Offline' },
                ].map((b) => (
                  <div key={b.label} className="flex items-center gap-2">
                    <b.icon className="h-4 w-4 text-[#A4F000]" />
                    <span>{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats bar ────────────────────────────────────────────────────── */}
        <section className="border-b border-border bg-background py-6">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 text-center">
              {[
                { value: '6+', label: 'Event Tersedia' },
                { value: 'Rp 0', label: 'Tiket Termurah' },
                { value: '4 Kota', label: 'Lokasi Roadshow' },
                { value: '100%', label: 'Sertifikat Digital' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-[#A4F000]">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured Events ───────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Event Unggulan</h2>
                <p className="mt-2 text-muted-foreground">Pilihan terbaik minggu ini — kursi terbatas!</p>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#A4F000]" />
                <span className="text-sm font-medium text-muted-foreground">Pendaftaran dibuka</span>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {featured.map((event) => {
                const slotsLeft = event.capacity - event.enrolled
                const almostFull = slotsLeft <= 5
                const isFull = slotsLeft <= 0
                const fmt = FORMAT_BADGE[event.format]

                return (
                  <Link key={event.id} href={`/events/${event.id}`}
                    className="group flex flex-col rounded-2xl border border-border bg-background overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all duration-200">
                    {/* Image */}
                    <div className="relative h-44 overflow-hidden bg-muted">
                      <img src={event.image} alt={event.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      {/* Badges overlay */}
                      <div className="absolute left-3 top-3 flex gap-2">
                        <span className="rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
                          {TYPE_LABELS[event.type]}
                        </span>
                      </div>
                      <div className="absolute right-3 top-3">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur-sm ${fmt.color}`}>
                          {fmt.label}
                        </span>
                      </div>
                      {almostFull && !isFull && (
                        <div className="absolute bottom-3 left-3 rounded-full bg-amber-500/90 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                          🔥 Sisa {slotsLeft} kursi
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{event.date}</span>
                        <span>·</span>
                        <Clock className="h-3.5 w-3.5" />
                        <span>{event.duration}</span>
                      </div>

                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {event.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{event.subtitle}</p>

                      {/* Instructor */}
                      <div className="mt-3 flex items-center gap-2">
                        <img src={event.instructor.avatar} alt={event.instructor.name}
                          className="h-6 w-6 rounded-full object-cover" />
                        <span className="text-xs text-muted-foreground">{event.instructor.name}</span>
                        <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          {event.rating}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>{event.enrolled} / {event.capacity} terdaftar</span>
                          <span className={LEVEL_COLOR[event.level] + ' rounded-full px-2 py-0.5'}>
                            {event.level}
                          </span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full rounded-full transition-all ${almostFull ? 'bg-amber-500' : 'bg-primary'}`}
                            style={{ width: `${(event.enrolled / event.capacity) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Price + CTA */}
                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          <span className="text-xl font-bold text-foreground">{formatRupiah(event.price)}</span>
                          {event.originalPrice && (
                            <span className="ml-2 text-sm text-muted-foreground line-through">{formatRupiah(event.originalPrice)}</span>
                          )}
                        </div>
                        <span className="rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          Daftar →
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── All Events ────────────────────────────────────────────────────── */}
        <section className="border-t border-border bg-muted/30 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">Semua Event</h2>
              {/* Filter chips (visual only) */}
              <div className="flex flex-wrap gap-2">
                {FILTERS.map((f, i) => (
                  <span key={f}
                    className={`cursor-pointer rounded-full border px-3 py-1 text-sm font-medium transition-colors ${i === 0
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground hover:border-primary/40'}`}>
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {events.map((event) => {
                const slotsLeft = event.capacity - event.enrolled
                const almostFull = slotsLeft <= 5
                const fmt = FORMAT_BADGE[event.format]

                return (
                  <Link key={event.id} href={`/events/${event.id}`}
                    className="group grid gap-4 rounded-2xl border border-border bg-background p-5 hover:border-primary/40 hover:shadow-sm transition-all sm:grid-cols-[auto_1fr_auto]">
                    {/* Thumbnail */}
                    <div className="relative h-24 w-full overflow-hidden rounded-xl bg-muted sm:h-24 sm:w-36">
                      <img src={event.image} alt={event.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>

                    {/* Info */}
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${fmt.color}`}>{fmt.label}</span>
                        <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{TYPE_LABELS[event.type]}</span>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${LEVEL_COLOR[event.level]}`}>{event.level}</span>
                      </div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{event.title}</h3>
                      <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {event.date}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {event.duration}</span>
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {event.format === 'online' ? 'Online' : event.location.split('·')[0].trim()}</span>
                        <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {event.enrolled}/{event.capacity}</span>
                      </div>
                      {almostFull && (
                        <p className="mt-1.5 text-xs font-semibold text-amber-600">🔥 Sisa {slotsLeft} kursi tersedia!</p>
                      )}
                    </div>

                    {/* Price + CTA */}
                    <div className="flex flex-row items-center gap-4 sm:flex-col sm:items-end sm:justify-between">
                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground">{formatRupiah(event.price)}</p>
                        {event.originalPrice && (
                          <p className="text-xs text-muted-foreground line-through">{formatRupiah(event.originalPrice)}</p>
                        )}
                      </div>
                      <span className="shrink-0 rounded-xl bg-primary/10 px-4 py-2 text-sm font-semibold text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {event.price === 0 ? 'Daftar Gratis' : 'Beli Tiket'}
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Host an Event CTA ─────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#A4F000]/10">
              <Leaf className="h-8 w-8 text-[#A4F000]" />
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
              Punya Keahlian Eco? Jadilah Instruktur!
            </h2>
            <p className="mt-4 text-muted-foreground">
              EcoBox membuka kesempatan bagi pakar dan praktisi eco-friendly untuk menyelenggarakan workshop dan webinar. Jangkau ribuan Green Starter di seluruh Indonesia.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-[#8BD400]" asChild>
                <Link href="/vendor/apply">Daftar sebagai Instruktur <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/b2b">Selenggarakan untuk Tim Korporat</Link>
              </Button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
