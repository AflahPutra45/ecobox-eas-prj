import { Button } from '@/components/ui/button'
import { ArrowRight, TrendingUp, Shield, Package } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-foreground p-8 lg:p-16">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute right-0 top-0 h-[400px] w-[400px] -translate-y-1/2 translate-x-1/2 rounded-full bg-[#A4F000]/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-[300px] w-[300px] translate-y-1/2 -translate-x-1/2 rounded-full bg-[#CC73B3]/20 blur-3xl" />
          </div>

          <div className="relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-background sm:text-4xl lg:text-5xl">
                Siap Membuat Perbedaan?
              </h2>
              <p className="mt-4 text-pretty text-lg text-background/80">
                Bergabunglah dengan ribuan bisnis dan konsumen yang memilih produk 
                berkelanjutan dan membuat dampak yang terukur untuk planet kita.
              </p>
              
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-[#8BD400]">
                  Mulai Belanja
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-background/30 bg-transparent text-background hover:bg-background/10"
                >
                  Jadi Vendor
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl bg-background/10 p-6 backdrop-blur-sm">
                <TrendingUp className="h-8 w-8 text-[#A4F000]" />
                <h3 className="mt-4 font-semibold text-background">Lacak Dampak Anda</h3>
                <p className="mt-2 text-sm text-background/70">
                  Dashboard real-time menunjukkan kontribusi lingkungan Anda
                </p>
              </div>
              <div className="rounded-2xl bg-background/10 p-6 backdrop-blur-sm">
                <Shield className="h-8 w-8 text-[#A4F000]" />
                <h3 className="mt-4 font-semibold text-background">Produk Terverifikasi</h3>
                <p className="mt-2 text-sm text-background/70">
                  Setiap produk tersertifikasi standar keberlanjutan
                </p>
              </div>
              <div className="rounded-2xl bg-background/10 p-6 backdrop-blur-sm sm:col-span-2">
                <Package className="h-8 w-8 text-[#CC73B3]" />
                <h3 className="mt-4 font-semibold text-background">Kemasan Ramah Lingkungan Terjamin</h3>
                <p className="mt-2 text-sm text-background/70">
                  Semua pesanan dikirim dalam kemasan 100% dapat dikompos, bebas plastik
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
