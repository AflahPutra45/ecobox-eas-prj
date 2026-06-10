import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/hooks/use-cart'
import { EcoChatWidget } from '@/components/eco-chat-widget'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',        // Hindari render blocking — teks langsung tampil dengan fallback font
  preload: true,
  fallback: ['system-ui', 'arial'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#A4F000',
}

export const metadata: Metadata = {
  title: 'EcoBox - Belanja Berkelanjutan. Ukur Dampak Anda.',
  description: 'Temukan produk ramah lingkungan, lacak dampak lingkungan Anda, dan bergabunglah dengan komunitas yang berkomitmen untuk hidup berkelanjutan.',
  keywords: ['berkelanjutan', 'ramah lingkungan', 'marketplace', 'produk hijau', 'dampak lingkungan'],
  openGraph: {
    title: 'EcoBox - Belanja Berkelanjutan. Ukur Dampak Anda.',
    description: 'Temukan produk ramah lingkungan, lacak dampak lingkungan Anda, dan bergabunglah dengan komunitas yang berkomitmen untuk hidup berkelanjutan.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        <CartProvider>
          {children}
          <EcoChatWidget />
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
