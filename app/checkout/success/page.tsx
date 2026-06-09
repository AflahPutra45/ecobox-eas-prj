import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Check, Leaf, Package, Truck, ArrowRight } from 'lucide-react'

export default function CheckoutSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center lg:px-8 lg:py-24">
          {/* Success Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#A4F000]">
            <Check className="h-10 w-10 text-foreground" />
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Pesanan Dikonfirmasi!
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Terima kasih telah berbelanja berkelanjutan. Pesanan Anda #ECO-2024-1234 telah ditempatkan.
          </p>

          {/* Impact Summary */}
          <div className="mt-10 rounded-2xl border border-[#A4F000]/30 bg-[#A4F000]/5 p-8">
            <div className="flex items-center justify-center gap-2">
              <Leaf className="h-6 w-6 text-[#A4F000]" />
              <h2 className="text-xl font-semibold text-foreground">
                Dampak Lingkungan Anda
              </h2>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              <div>
                <p className="text-3xl font-bold text-[#A4F000]">5,4kg</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Plastik Dicegah
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#A4F000]">3,2kg</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Emisi CO₂ Dihemat
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#A4F000]">100%</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Kemasan Dapat Dikompos
                </p>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="mt-10 rounded-2xl border border-border bg-background p-8">
            <h3 className="text-lg font-semibold text-foreground">
              Langkah Selanjutnya?
            </h3>

            <div className="mt-6 space-y-6">
              <div className="flex items-start gap-4 text-left">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#A4F000]/10">
                  <Check className="h-5 w-5 text-[#A4F000]" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Pesanan Dikonfirmasi</p>
                  <p className="text-sm text-muted-foreground">
                    Kami telah menerima pesanan Anda dan sedang diproses
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-left">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Package className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Pengemasan Eco</p>
                  <p className="text-sm text-muted-foreground">
                    Item Anda sedang dikemas dengan hati-hati dalam bahan berkelanjutan
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-left">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Pengiriman Netral Karbon</p>
                  <p className="text-sm text-muted-foreground">
                    Perkiraan pengiriman: 8-10 Juni 2026
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Email konfirmasi telah dikirim ke alamat email Anda dengan detail pelacakan.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-[#8BD400]">
              <Link href="/impact">
                Lihat Dashboard Dampak Anda
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/shop">Lanjut Belanja</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
