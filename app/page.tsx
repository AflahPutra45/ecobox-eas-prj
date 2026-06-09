import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { ImpactMetrics } from '@/components/impact-metrics'
import { FeaturedProducts } from '@/components/featured-products'
import { Categories } from '@/components/categories'
import { Testimonials } from '@/components/testimonials'
import { CTASection } from '@/components/cta-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <ImpactMetrics />
        <FeaturedProducts />
        <Categories />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
