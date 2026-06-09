import Image from 'next/image'
import { Star, Quote } from 'lucide-react'
import { testimonials } from '@/lib/data'

export function Testimonials() {
  return (
    <section className="border-t border-border bg-muted/30 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Dicintai Pembeli Peduli Lingkungan
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Lihat apa yang komunitas kami katakan tentang pengalaman EcoBox mereka
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative rounded-2xl border border-border bg-background p-6 transition-all hover:shadow-lg"
            >
              <Quote className="absolute right-6 top-6 h-8 w-8 text-[#A4F000]/20" />
              
              {/* Rating */}
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Content */}
              <p className="mt-4 text-pretty leading-relaxed text-foreground">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
