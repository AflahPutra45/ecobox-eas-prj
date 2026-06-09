'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import {
  Leaf,
  Wind,
  Droplets,
  TrendingUp,
  Award,
  Calendar,
  ArrowUpRight,
  Share2,
} from 'lucide-react'

const impactData = {
  totalPlastic: 12.4,
  totalCarbon: 8.7,
  totalWater: 340,
  ordersCount: 15,
  treesPlanted: 3,
  rank: 'Juara Eco',
}

const monthlyData = [
  { month: 'Jan', plastic: 1.2, carbon: 0.8 },
  { month: 'Feb', plastic: 1.5, carbon: 1.0 },
  { month: 'Mar', plastic: 0.8, carbon: 0.5 },
  { month: 'Apr', plastic: 2.1, carbon: 1.4 },
  { month: 'Mei', plastic: 1.8, carbon: 1.2 },
  { month: 'Jun', plastic: 5.0, carbon: 3.8 },
]

const achievements = [
  {
    id: 1,
    name: 'Pembelian Pertama',
    description: 'Melakukan pembelian ramah lingkungan pertama Anda',
    earned: true,
    icon: Leaf,
  },
  {
    id: 2,
    name: '5kg Bebas Plastik',
    description: 'Mencegah 5kg limbah plastik',
    earned: true,
    icon: TrendingUp,
  },
  {
    id: 3,
    name: '10kg Bebas Plastik',
    description: 'Mencegah 10kg limbah plastik',
    earned: true,
    icon: Award,
  },
  {
    id: 4,
    name: 'Juara Karbon',
    description: 'Menghemat 5kg emisi CO₂',
    earned: true,
    icon: Wind,
  },
  {
    id: 5,
    name: 'Pejuang Air',
    description: 'Menghemat 500L air',
    earned: false,
    icon: Droplets,
  },
  {
    id: 6,
    name: 'Advokat Eco',
    description: 'Mereferensikan 3 teman ke EcoBox',
    earned: false,
    icon: Share2,
  },
]

const recentOrders = [
  {
    id: 'ECO-2024-1234',
    date: '2 Jun 2026',
    items: 4,
    plastic: 5.4,
    carbon: 3.2,
  },
  {
    id: 'ECO-2024-1189',
    date: '15 Mei 2026',
    items: 2,
    plastic: 2.1,
    carbon: 1.5,
  },
  {
    id: 'ECO-2024-1045',
    date: '28 Apr 2026',
    items: 3,
    plastic: 3.2,
    carbon: 2.3,
  },
]

export default function ImpactPage() {
  const maxPlastic = Math.max(...monthlyData.map((d) => d.plastic))

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          {/* Page Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Dashboard Dampak Anda
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Lacak kontribusi lingkungan Anda dari waktu ke waktu
              </p>
            </div>
            <Button variant="outline" className="sm:self-start">
              <Share2 className="mr-2 h-4 w-4" />
              Bagikan Dampak
            </Button>
          </div>

          {/* Impact Stats */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#A4F000]/10">
                  <Leaf className="h-6 w-6 text-[#A4F000]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Plastik Dicegah</p>
                  <p className="text-2xl font-bold text-foreground">
                    {impactData.totalPlastic}kg
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#CC73B3]/10">
                  <Wind className="h-6 w-6 text-[#CC73B3]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Karbon Dihemat</p>
                  <p className="text-2xl font-bold text-foreground">
                    {impactData.totalCarbon}kg
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                  <Droplets className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Air Dihemat</p>
                  <p className="text-2xl font-bold text-foreground">
                    {impactData.totalWater}L
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#A4F000]/30 bg-[#A4F000]/5 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#A4F000]">
                  <Award className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Peringkat Anda</p>
                  <p className="text-xl font-bold text-foreground">
                    {impactData.rank}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* Chart Section */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-border bg-background p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">
                    Dampak Bulanan
                  </h2>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-[#A4F000]" />
                      Plastik (kg)
                    </span>
                    <span className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-[#CC73B3]" />
                      Karbon (kg)
                    </span>
                  </div>
                </div>

                {/* Simple bar chart */}
                <div className="mt-6 flex items-end justify-between gap-2" style={{ height: '200px' }}>
                  {monthlyData.map((data) => (
                    <div key={data.month} className="flex flex-1 flex-col items-center gap-2">
                      <div className="flex w-full items-end justify-center gap-1" style={{ height: '160px' }}>
                        <div
                          className="w-4 rounded-t bg-[#A4F000]"
                          style={{ height: `${(data.plastic / maxPlastic) * 100}%` }}
                        />
                        <div
                          className="w-4 rounded-t bg-[#CC73B3]"
                          style={{ height: `${(data.carbon / maxPlastic) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Orders */}
              <div className="mt-6 rounded-2xl border border-border bg-background p-6">
                <h2 className="text-lg font-semibold text-foreground">
                  Pesanan Terbaru
                </h2>

                <div className="mt-4 divide-y divide-border">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between py-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                          <Calendar className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.date} • {order.items} item
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-[#A4F000]">
                          -{order.plastic}kg plastik
                        </p>
                        <p className="text-sm text-muted-foreground">
                          -{order.carbon}kg CO₂
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div>
              <div className="rounded-2xl border border-border bg-background p-6">
                <h2 className="text-lg font-semibold text-foreground">
                  Pencapaian
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {achievements.filter((a) => a.earned).length} dari {achievements.length} diraih
                </p>

                <div className="mt-6 space-y-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`flex items-center gap-3 rounded-xl p-3 ${
                        achievement.earned
                          ? 'bg-[#A4F000]/10'
                          : 'bg-muted opacity-50'
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          achievement.earned
                            ? 'bg-[#A4F000]'
                            : 'bg-muted-foreground/20'
                        }`}
                      >
                        <achievement.icon
                          className={`h-5 w-5 ${
                            achievement.earned
                              ? 'text-foreground'
                              : 'text-muted-foreground'
                          }`}
                        />
                      </div>
                      <div>
                        <p
                          className={`text-sm font-medium ${
                            achievement.earned
                              ? 'text-foreground'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {achievement.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trees Planted */}
              <div className="mt-6 rounded-2xl border border-[#A4F000]/30 bg-[#A4F000]/5 p-6 text-center">
                <p className="text-5xl font-bold text-[#A4F000]">
                  {impactData.treesPlanted}
                </p>
                <p className="mt-2 font-medium text-foreground">
                  Pohon Ditanam Atas Nama Anda
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Untuk setiap $100 yang dibelanjakan, kami menanam pohon
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 border-[#A4F000]/30 text-foreground hover:bg-[#A4F000]/10"
                >
                  Pelajari Lebih Lanjut
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
