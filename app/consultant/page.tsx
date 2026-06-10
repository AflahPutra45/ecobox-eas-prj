import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import {
  MessageCircle, ArrowRight, Leaf, Sparkles,
  Clock, Shield, Star, CheckCircle, Users,
  BookOpen, Zap, Heart,
} from 'lucide-react'

// ─── Consultants ──────────────────────────────────────────────────────────────
const CONSULTANTS = [
  {
    name: 'Hana Pertiwi',
    specialty: 'Zero Waste Living & Personal Care',
    experience: '4 tahun',
    rating: 4.9,
    reviews: 312,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
    badge: '🌿 Spesialis Pemula',
    tags: ['Zero Waste', 'Produk Perawatan Diri', 'Pengganti Plastik'],
    available: true,
  },
  {
    name: 'Bimo Satria',
    specialty: 'Eco Kitchen & Sustainable Home',
    experience: '6 tahun',
    rating: 4.8,
    reviews: 489,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    badge: '🏠 Ahli Rumah Eco',
    tags: ['Dapur Eco', 'Rumah Berkelanjutan', 'Kompos'],
    available: true,
  },
  {
    name: 'Sari Rahayu',
    specialty: 'Sustainable Fashion & Packaging',
    experience: '5 tahun',
    rating: 4.9,
    reviews: 276,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    badge: '👗 Fashion Eco Expert',
    tags: ['Fashion Berkelanjutan', 'Kemasan Hijau', 'Thrifting'],
    available: false,
  },
]

// ─── Topics / guides ──────────────────────────────────────────────────────────
const TOPICS = [
  { icon: '🌱', title: 'Mulai dari Nol', desc: 'Panduan lengkap untuk Green Starters yang baru mulai perjalanan eco-friendly.', time: '5 menit' },
  { icon: '♻️', title: 'Pengganti Plastik Harian', desc: 'Alternatif ramah lingkungan untuk 20 produk plastik yang paling sering digunakan.', time: '8 menit' },
  { icon: '🍽️', title: 'Dapur Minim Sampah', desc: 'Transformasi dapur kamu menjadi zona zero waste dengan langkah mudah.', time: '6 menit' },
  { icon: '💰', title: 'Eco di Budget Terbatas', desc: 'Bukti bahwa gaya hidup hijau tidak harus mahal — tips hemat dan efektif.', time: '4 menit' },
  { icon: '🏢', title: 'Eco Office Challenge', desc: 'Tantangan 30 hari untuk membuat kantor kamu lebih ramah lingkungan.', time: '10 menit' },
  { icon: '👨‍👩‍👧', title: 'Zero Waste untuk Keluarga', desc: 'Cara mengajak seluruh anggota keluarga, termasuk anak-anak, untuk hidup berkelanjutan.', time: '7 menit' },
]

// ─── Features ─────────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: Zap, title: 'Respons Instan', desc: 'Chatbot eco-consultant siap menjawab pertanyaanmu 24/7 tanpa menunggu.', color: 'bg-[#A4F000]/10 text-[#A4F000]' },
  { icon: Users, title: 'Konsultan Manusia', desc: 'Eskalasi ke konsultan berpengalaman via WhatsApp untuk konsultasi mendalam.', color: 'bg-[#CC73B3]/10 text-[#CC73B3]' },
  { icon: Sparkles, title: 'Rekomendasi Personal', desc: 'Saran produk disesuaikan dengan kebutuhan, budget, dan tahap gaya hidupmu.', color: 'bg-blue-50 text-blue-600' },
  { icon: BookOpen, title: 'Panduan & Artikel', desc: 'Akses perpustakaan panduan eco-friendly yang dikurasi oleh tim konsultan kami.', color: 'bg-amber-50 text-amber-600' },
  { icon: Shield, title: 'Privasi Terjaga', desc: 'Percakapan konsultasimu aman dan tidak dibagikan kepada pihak ketiga.', color: 'bg-purple-50 text-purple-600' },
  { icon: Heart, title: 'Komunitas Hijau', desc: 'Terhubung dengan sesama Green Starter untuk berbagi pengalaman dan inspirasi.', color: 'bg-emerald-50 text-emerald-600' },
]

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    text: 'Saya tidak tahu harus mulai dari mana. Setelah chat dengan Hana selama 20 menit, saya langsung punya rencana 3 bulan yang jelas. Sangat membantu!',
    name: 'Dina Kusuma',
    role: 'Ibu rumah tangga, Bekasi',
    rating: 5,
  },
  {
    text: 'Rekomendasi produk dari konsultan EcoBox selalu tepat sasaran. Tidak pernah salah beli. Kualitas bagus dan sesuai budget saya.',
    name: 'Reza Firmansyah',
    role: 'Mahasiswa, Yogyakarta',
    rating: 5,
  },
  {
    text: 'Yang saya suka, konsultannya tidak menghakimi. Mereka paham bahwa setiap orang punya pace-nya sendiri. Sangat supportif!',
    name: 'Anisa Wijaya',
    role: 'Karyawan swasta, Jakarta',
    rating: 5,
  },
]

export default function ConsultantPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-foreground py-20 lg:py-28">
          <div className="absolute inset-0 -z-10">
            <div className="absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/3 translate-x-1/3 rounded-full bg-[#A4F000]/15 blur-3xl" />
            <div className="absolute left-0 bottom-0 h-[400px] w-[400px] translate-y-1/3 -translate-x-1/3 rounded-full bg-[#CC73B3]/15 blur-3xl" />
          </div>
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#A4F000]/30 bg-[#A4F000]/10 px-4 py-1.5 text-sm font-medium text-[#A4F000]">
                  <MessageCircle className="h-4 w-4" />
                  Personalized Eco-Consultant
                </div>
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-background sm:text-5xl lg:text-6xl">
                  Teman Perjalanan{' '}
                  <span className="text-[#A4F000]">Hidup Hijau</span>{' '}
                  Kamu
                </h1>
                <p className="mt-6 text-lg text-background/75">
                  Tidak perlu bingung mulai dari mana. Konsultan eco-friendly EcoBox siap memandu kamu — dari memilih produk yang tepat, tips zero waste bertahap, hingga rekomendasi personal sesuai gaya hidup dan budget.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-[#8BD400]"
                    asChild
                  >
                    <a href="#chat-now">
                      <MessageCircle className="mr-2 h-5 w-5" /> Chat Sekarang — Gratis
                    </a>
                  </Button>
                  <Button size="lg" variant="outline"
                    className="border-background/30 text-background hover:bg-background/10"
                    asChild>
                    <a href={`https://wa.me/6281234567890?text=Halo%20saya%20ingin%20konsultasi%20eco-friendly%20di%20EcoBox!`}
                      target="_blank" rel="noopener noreferrer">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="mr-2 h-5 w-5 text-[#25D366]">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Konsultasi via WhatsApp
                    </a>
                  </Button>
                </div>
                <div className="mt-8 flex flex-wrap gap-6 text-sm text-background/70">
                  {[
                    { icon: CheckCircle, label: 'Gratis selamanya' },
                    { icon: Clock, label: 'Respons dalam menit' },
                    { icon: Shield, label: 'Privasi terjaga' },
                  ].map((b) => (
                    <div key={b.label} className="flex items-center gap-2">
                      <b.icon className="h-4 w-4 text-[#A4F000]" />
                      <span>{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats card */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '10K+', label: 'Konsultasi Selesai', icon: '💬' },
                  { value: '4.9★', label: 'Rating Kepuasan', icon: '⭐' },
                  { value: '3 Min', label: 'Rata-rata Respons', icon: '⚡' },
                  { value: '100%', label: 'Gratis Selamanya', icon: '🎁' },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-background/10 bg-background/5 p-5 backdrop-blur-sm text-center">
                    <p className="text-3xl">{s.icon}</p>
                    <p className="mt-2 text-2xl font-bold text-[#A4F000]">{s.value}</p>
                    <p className="text-sm text-background/70">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Features ──────────────────────────────────────────────────────── */}
        <section className="border-b border-border py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">
              Kenapa Konsultan EcoBox Berbeda?
            </h2>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <div key={f.title} className="rounded-2xl border border-border bg-background p-5">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${f.color}`}>
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Chat now CTA ──────────────────────────────────────────────────── */}
        <section id="chat-now" className="bg-muted/30 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <div className="rounded-3xl bg-foreground p-8 lg:p-12">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Leaf className="h-6 w-6 text-[#A4F000]" />
                    <span className="text-sm font-semibold text-[#A4F000]">In-App Chat · Aktif Sekarang</span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-background">
                    Mulai Chat dengan Hana
                  </h2>
                  <p className="mt-3 text-background/70">
                    Eco-consultant AI kami siap menjawab pertanyaanmu sekarang juga — 24 jam, 7 hari seminggu. Tidak perlu daftar atau login.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-background/70">
                    {[
                      'Rekomendasi produk personal',
                      'Tips zero waste bertahap',
                      'Pengganti plastik sehari-hari',
                      'Estimasi penghematan lingkungan',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-[#A4F000] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="rounded-2xl border border-background/10 bg-background/5 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-background/50 mb-3">
                      Topik Populer
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['🌱 Produk untuk pemula', '♻️ Pengganti plastik', '🍽️ Dapur eco-friendly', '💰 Eco hemat', '⭐ Terlaris EcoBox'].map((t) => (
                        <span key={t} className="rounded-full bg-background/10 px-3 py-1 text-sm text-background cursor-pointer hover:bg-background/20 transition-colors">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-center text-sm text-background/60">
                    Klik ikon 💬 di pojok kanan bawah layar untuk mulai chat!
                  </p>
                  <Button
                    size="lg"
                    className="w-full bg-primary text-primary-foreground hover:bg-[#8BD400]"
                    asChild
                  >
                    <a href={`https://wa.me/6281234567890`} target="_blank" rel="noopener noreferrer">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="mr-2 h-5 w-5">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Lanjut via WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Consultants ───────────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Tim Konsultan Kami</h2>
              <p className="mt-3 text-muted-foreground">Semua konsultan EcoBox adalah praktisi eco-friendly berpengalaman</p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {CONSULTANTS.map((c) => (
                <div key={c.name}
                  className={`rounded-2xl border bg-background p-6 ${c.available ? 'border-border' : 'border-border opacity-70'}`}>
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <img src={c.avatar} alt={c.name}
                        className="h-16 w-16 rounded-2xl object-cover" />
                      <span className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full ring-2 ring-background ${c.available ? 'bg-[#A4F000]' : 'bg-muted-foreground'}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.specialty}</p>
                      <span className="mt-1 inline-block rounded-full bg-[#A4F000]/10 px-2 py-0.5 text-xs font-medium text-[#5a8500]">
                        {c.badge}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-foreground">{c.rating}</span>
                      <span className="text-muted-foreground">({c.reviews})</span>
                    </div>
                    <span className="text-muted-foreground">Pengalaman {c.experience}</span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {c.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={`https://wa.me/6281234567890?text=Halo%20${encodeURIComponent(c.name)}%2C%20saya%20ingin%20konsultasi%20eco-friendly!`}
                    target="_blank" rel="noopener noreferrer"
                    className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-2 text-sm font-medium transition-colors ${c.available
                      ? 'bg-[#25D366]/10 text-[#1a9a48] hover:bg-[#25D366]/20'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'}`}
                  >
                    {c.available ? (
                      <><span className="h-2 w-2 rounded-full bg-[#A4F000]" /> Tersedia — Chat via WhatsApp</>
                    ) : (
                      <><Clock className="h-4 w-4" /> Sedang Tidak Tersedia</>
                    )}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Guides ────────────────────────────────────────────────────────── */}
        <section className="border-t border-border bg-muted/30 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Panduan Eco dari Konsultan</h2>
                <p className="mt-2 text-muted-foreground">Bacaan singkat yang dikurasi khusus oleh tim konsultan kami</p>
              </div>
              <Button variant="outline" className="hidden sm:flex">
                Lihat Semua <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TOPICS.map((t) => (
                <div key={t.title}
                  className="group rounded-2xl border border-border bg-background p-5 cursor-pointer hover:border-primary/40 hover:shadow-sm transition-all">
                  <p className="text-3xl">{t.icon}</p>
                  <h3 className="mt-3 font-semibold text-foreground group-hover:text-primary transition-colors">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
                  <p className="mt-3 text-xs text-muted-foreground">📖 {t.time} baca</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ──────────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">
              Cerita Nyata dari Pengguna
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="rounded-2xl border border-border bg-background p-6">
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
                  <div className="mt-5 border-t border-border pt-4">
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
