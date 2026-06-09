import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Leaf, Shield, TrendingUp } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/4 translate-x-1/4 rounded-full bg-[#A4F000]/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] translate-y-1/4 -translate-x-1/4 rounded-full bg-[#CC73B3]/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-24 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Content */}
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#A4F000]/30 bg-[#A4F000]/10 px-4 py-1.5 text-sm font-medium text-foreground">
              <Leaf className="h-4 w-4 text-[#A4F000]" />
              <span>Bergabung dengan 50.000+ pembeli peduli lingkungan</span>
            </div>
            
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Belanja Berkelanjutan.{' '}
              <span className="text-[#A4F000]">Ukur Dampak Anda.</span>
            </h1>
            
            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground lg:text-xl">
              Temukan produk ramah lingkungan terverifikasi dari vendor terpercaya. Lacak dampak 
              lingkungan Anda dengan setiap pembelian dan bergabunglah dengan komunitas yang berkomitmen untuk hidup berkelanjutan.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-[#8BD400]">
                Mulai Belanja
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-border hover:bg-muted">
                Pelajari Lebih Lanjut
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#A4F000]/10">
                  <Shield className="h-5 w-5 text-[#A4F000]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Terverifikasi</p>
                  <p className="text-xs text-muted-foreground">Produk</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#CC73B3]/10">
                  <Leaf className="h-5 w-5 text-[#CC73B3]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Kemasan</p>
                  <p className="text-xs text-muted-foreground">Ramah Lingkungan</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#A4F000]/10">
                  <TrendingUp className="h-5 w-5 text-[#A4F000]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Lacak</p>
                  <p className="text-xs text-muted-foreground">Dampak</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-square">
              {/* Main card */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#A4F000]/20 to-[#CC73B3]/20 p-1">
                <div className="h-full w-full rounded-3xl bg-background p-8">
                  <div className="flex h-full flex-col items-center justify-center">
                    {/* Impact visualization */}
                    <div className="mb-8 text-center">
                      <p className="text-sm font-medium text-muted-foreground">Dampak Anda Hari Ini</p>
                      <p className="mt-2 text-5xl font-bold text-[#A4F000]">2,4M kg</p>
                      <p className="mt-1 text-sm text-muted-foreground">plastik dicegah</p>
                    </div>
                    
                    {/* Mini stats */}
                    <div className="grid w-full grid-cols-2 gap-4">
                      <div className="rounded-xl bg-muted p-4 text-center">
                        <p className="text-2xl font-bold text-foreground">850K</p>
                        <p className="text-xs text-muted-foreground">kg CO₂ dihemat</p>
                      </div>
                      <div className="rounded-xl bg-muted p-4 text-center">
                        <p className="text-2xl font-bold text-foreground">1.200+</p>
                        <p className="text-xs text-muted-foreground">vendor terverifikasi</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -left-4 top-1/4 rounded-xl border border-border bg-background p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-[#A4F000]" />
                  <div>
                    <p className="text-xs font-medium">Berkelanjutan Terverifikasi</p>
                    <p className="text-xs text-muted-foreground">100% tersertifikasi</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -right-4 bottom-1/3 rounded-xl border border-border bg-background p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-[#CC73B3]" />
                  <div>
                    <p className="text-xs font-medium">Netral Karbon</p>
                    <p className="text-xs text-muted-foreground">Pengiriman termasuk</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
