import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Header } from '@/components/header'
import { Hero } from '@/components/hero'

// ─── Above the fold: dirender langsung (statis, tidak ditunda) ────────────────
// Header & Hero dimuat secara sinkron — ini yang pertama dilihat user

// ─── Below the fold: lazy-loaded ─────────────────────────────────────────────
// Komponen ini baru di-load setelah konten utama selesai di-render
// Sehingga First Contentful Paint (FCP) tidak tertahan oleh mereka

const ImpactMetrics = dynamic(() =>
  import('@/components/impact-metrics').then((m) => m.ImpactMetrics), {
  loading: () => <SectionSkeleton />,
})

const FeaturedProducts = dynamic(() =>
  import('@/components/featured-products').then((m) => m.FeaturedProducts), {
  loading: () => <SectionSkeleton tall />,
})

const Categories = dynamic(() =>
  import('@/components/categories').then((m) => m.Categories), {
  loading: () => <SectionSkeleton />,
})

const Testimonials = dynamic(() =>
  import('@/components/testimonials').then((m) => m.Testimonials), {
  loading: () => <SectionSkeleton />,
})

const CTASection = dynamic(() =>
  import('@/components/cta-section').then((m) => m.CTASection), {
  loading: () => <SectionSkeleton />,
})

const Footer = dynamic(() =>
  import('@/components/footer').then((m) => m.Footer), {
  loading: () => <div className="h-64 bg-muted/30" />,
})

// Skeleton ringan untuk placeholder saat lazy-load berlangsung
function SectionSkeleton({ tall = false }: { tall?: boolean }) {
  return (
    <div className={`animate-pulse bg-muted/40 ${tall ? 'h-96' : 'h-48'} w-full`} />
  )
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero dirender langsung — above the fold */}
        <Hero />

        {/* Semua section di bawah dibungkus Suspense untuk streaming SSR */}
        <Suspense fallback={<SectionSkeleton />}>
          <ImpactMetrics />
        </Suspense>

        <Suspense fallback={<SectionSkeleton tall />}>
          <FeaturedProducts />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Categories />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Testimonials />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <CTASection />
        </Suspense>
      </main>

      <Suspense fallback={<div className="h-64 bg-muted/30" />}>
        <Footer />
      </Suspense>
    </div>
  )
}
