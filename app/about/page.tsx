import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Leaf, Users, Globe, Award, ArrowRight, Heart } from 'lucide-react'

const stats = [
  { value: '2,4M+', label: 'kg Plastik Dicegah' },
  { value: '50K+', label: 'Anggota Komunitas' },
  { value: '1.200+', label: 'Vendor Terverifikasi' },
  { value: '35+', label: 'Negara Dijangkau' },
]

const values = [
  {
    icon: Leaf,
    title: 'Keberlanjutan Utama',
    description:
      'Setiap produk di platform kami memenuhi standar keberlanjutan yang ketat. Kami memverifikasi sertifikasi dan melakukan audit secara berkala.',
  },
  {
    icon: Users,
    title: 'Berbasis Komunitas',
    description:
      'Komunitas pembeli dan vendor peduli lingkungan kami bekerja sama untuk menciptakan masa depan yang lebih berkelanjutan.',
  },
  {
    icon: Globe,
    title: 'Dampak Transparan',
    description:
      'Lacak dampak lingkungan Anda secara real-time. Ketahui dengan pasti bagaimana pembelian Anda berkontribusi pada planet yang lebih sehat.',
  },
  {
    icon: Heart,
    title: 'Bisnis Etis',
    description:
      'Kami hanya bermitra dengan vendor yang berbagi komitmen kami terhadap praktik kerja yang adil dan tanggung jawab lingkungan.',
  },
]

const team = [
  {
    name: 'Sarah Chen',
    role: 'CEO & Co-founder',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
  },
  {
    name: 'Marcus Johnson',
    role: 'CTO & Co-founder',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
  },
  {
    name: 'Emma Williams',
    role: 'Kepala Keberlanjutan',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
  },
  {
    name: 'David Park',
    role: 'Kepala Operasional',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
  },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-foreground py-24 lg:py-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/4 rounded-full bg-[#A4F000]/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-[400px] w-[400px] translate-y-1/2 -translate-x-1/4 rounded-full bg-[#CC73B3]/20 blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-background sm:text-5xl lg:text-6xl">
              Membangun Masa Depan yang Lebih{' '}
              <span className="text-[#A4F000]">Berkelanjutan</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-background/80 lg:text-xl">
              EcoBox menghubungkan konsumen peduli lingkungan dengan produk
              berkelanjutan terverifikasi, memudahkan belanja secara bertanggung jawab dan
              melacak dampak lingkungan Anda.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-border bg-background py-12">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold text-[#A4F000] lg:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Misi Kami
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  Kami percaya bahwa perubahan kecil dapat membuat perbedaan besar. EcoBox
                  didirikan dengan misi sederhana: membuat belanja berkelanjutan
                  mudah diakses, transparan, dan berdampak.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  Setiap produk di platform kami diverifikasi untuk keberlanjutan,
                  setiap pesanan dikirim dalam kemasan ramah lingkungan, dan setiap pembelian
                  berkontribusi pada dampak lingkungan yang terukur.
                </p>
                <Button
                  className="mt-8 bg-primary text-primary-foreground hover:bg-[#8BD400]"
                  asChild
                >
                  <Link href="/shop">
                    Mulai Belanja
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-muted lg:aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=600&fit=crop"
                  alt="Hidup berkelanjutan"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="border-t border-border bg-muted/30 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Nilai-Nilai Kami
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Prinsip-prinsip yang memandu semua yang kami lakukan
              </p>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-2xl border border-border bg-background p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#A4F000]/10">
                    <value.icon className="h-6 w-6 text-[#A4F000]" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Kenali Tim Kami
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Individu bersemangat yang bekerja untuk menjadikan belanja berkelanjutan sebagai
                norma
              </p>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full bg-muted">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-muted/30 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#A4F000]/30 bg-[#A4F000]/10 px-4 py-1.5 text-sm font-medium">
              <Award className="h-4 w-4 text-[#A4F000]" />
              <span>Bergabunglah dengan misi kami</span>
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Siap Membuat Perbedaan?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Bergabunglah dengan ribuan pembeli peduli lingkungan dan mulai membuat
              dampak yang terukur hari ini.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-[#8BD400]"
                asChild
              >
                <Link href="/shop">
                  Mulai Belanja
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/vendor/apply">Jadi Vendor</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
