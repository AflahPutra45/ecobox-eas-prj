import { Leaf, Wind, Store, Users } from 'lucide-react'

const stats = [
  {
    icon: Leaf,
    value: '2,4M',
    unit: 'kg',
    label: 'Plastik Dicegah',
    description: 'Plastik sekali pakai dialihkan dari tempat pembuangan',
    color: 'text-[#A4F000]',
    bgColor: 'bg-[#A4F000]/10',
  },
  {
    icon: Wind,
    value: '850K',
    unit: 'kg CO₂',
    label: 'Karbon Dihemat',
    description: 'Emisi gas rumah kaca dikurangi',
    color: 'text-[#CC73B3]',
    bgColor: 'bg-[#CC73B3]/10',
  },
  {
    icon: Store,
    value: '1.200+',
    unit: '',
    label: 'Vendor Terverifikasi',
    description: 'Bisnis berkelanjutan tersertifikasi',
    color: 'text-[#A4F000]',
    bgColor: 'bg-[#A4F000]/10',
  },
  {
    icon: Users,
    value: '50K+',
    unit: '',
    label: 'Anggota Komunitas',
    description: 'Pembeli peduli lingkungan di seluruh dunia',
    color: 'text-[#CC73B3]',
    bgColor: 'bg-[#CC73B3]/10',
  },
]

export function ImpactMetrics() {
  return (
    <section className="border-y border-border bg-muted/50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Dampak Kolektif Kita
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Bersama-sama, komunitas kita membuat perbedaan yang terukur untuk planet ini.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl border border-border bg-background p-6 transition-all hover:border-[#A4F000]/50 hover:shadow-lg"
            >
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight text-foreground">
                  {stat.value}
                </span>
                {stat.unit && (
                  <span className="text-sm font-medium text-muted-foreground">
                    {stat.unit}
                  </span>
                )}
              </div>
              
              <p className="mt-2 text-base font-semibold text-foreground">{stat.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.description}</p>

              {/* Decorative element */}
              <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full ${stat.bgColor} opacity-50 transition-transform group-hover:scale-150`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
