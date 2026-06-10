'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { products } from '@/lib/data'
import { formatRupiah } from '@/lib/utils'
import {
  MessageCircle, X, Send, Leaf, ExternalLink,
  ChevronRight, Minimize2,
} from 'lucide-react'

// ─── Consultant persona ────────────────────────────────────────────────────────
const CONSULTANT = {
  name: 'Hana',
  title: 'Eco-Consultant EcoBox',
  avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop&crop=face',
  whatsapp: '6281234567890',
}

// ─── Quick reply chips ────────────────────────────────────────────────────────
const QUICK_REPLIES = [
  { id: 'starter', label: '🌱 Produk untuk pemula' },
  { id: 'plastic', label: '♻️ Pengganti plastik harian' },
  { id: 'kitchen', label: '🍽️ Dapur eco-friendly' },
  { id: 'zerowaste', label: '🗑️ Tips memulai zero waste' },
  { id: 'budget', label: '💰 Eco produk ramah kantong' },
  { id: 'recommend', label: '⭐ Produk terlaris EcoBox' },
]

// ─── Bot responses ────────────────────────────────────────────────────────────
const BOT_RESPONSES: Record<string, { text: string; productIds?: string[]; followUps?: string[] }> = {
  starter: {
    text: 'Selamat datang di perjalanan eco-friendly kamu! 🌱 Untuk pemula, saya rekomendasikan mulai dari 3 langkah kecil:\n\n1. **Ganti sikat gigi plastik** → sikat gigi bambu\n2. **Ganti kantong belanja** → tote bag organik\n3. **Ganti bungkus plastik** → beeswax wrap\n\nBerikut produk yang cocok untuk kamu:',
    productIds: ['3', '5', '6'],
    followUps: ['plastic', 'kitchen', 'budget'],
  },
  plastic: {
    text: 'Plastik sekali pakai adalah musuh terbesar lingkungan. Berikut penggantinya yang mudah diterapkan sehari-hari:\n\n• 🪥 Sikat gigi plastik → **Bambu biodegradable**\n• 🛍️ Kantong kresek → **Tote bag katun**\n• 🍱 Plastik wrap → **Beeswax wrap** yang bisa dicuci ulang\n• 🧴 Botol sabun plastik → **Kit isi ulang**\n\nSemua tersedia di EcoBox! Mau saya rekomendasikan yang sesuai budget kamu?',
    productIds: ['3', '5', '6', '8'],
    followUps: ['budget', 'kitchen', 'zerowaste'],
  },
  kitchen: {
    text: 'Dapur adalah sumber limbah terbesar di rumah. Yuk transformasi dapur kamu! 🍽️\n\n**Mulai dari yang paling berdampak:**\n• Wadah bambu menggantikan plastik Tupperware\n• Beeswax wrap menggantikan cling wrap\n• Kit semprotan isi ulang menggantikan botol sabun sekali pakai\n\nDengan 3 perubahan ini, kamu bisa kurangi sampah dapur hingga **60%!**',
    productIds: ['1', '6', '8'],
    followUps: ['starter', 'plastic', 'recommend'],
  },
  zerowaste: {
    text: 'Zero waste bukan soal sempurna, tapi soal konsisten! 💚 Inilah framework 5R yang saya rekomendasikan:\n\n1. **Refuse** — tolak yang tidak perlu (struk kertas, sedotan plastik)\n2. **Reduce** — kurangi konsumsi, beli yang tahan lama\n3. **Reuse** — pakai ulang: botol, tas, wadah\n4. **Recycle** — pisahkan sampah, dukung daur ulang\n5. **Rot** — kompos sisa makanan organik\n\n**Tip terbaik:** Mulai dari satu kebiasaan dulu, bukan semua sekaligus. Perjalanan seribu mil dimulai dari satu langkah! 🌿',
    followUps: ['starter', 'plastic', 'recommend'],
  },
  budget: {
    text: 'Eco-friendly tidak harus mahal! 💰 Justru dalam jangka panjang jauh lebih hemat karena produknya tahan lama.\n\n**Contoh penghematan:**\n• Sikat gigi bambu Rp 12.000 vs sikat plastik Rp 8.000 → bambu tahan 3x lebih lama\n• Tote bag sekali beli → hemat ratusan kantong kresek per tahun\n• Beeswax wrap → hemat plastik wrap berulang kali\n\nBerikut produk terjangkau mulai dari Rp 12.000:',
    productIds: ['3', '5', '4'],
    followUps: ['starter', 'recommend', 'plastic'],
  },
  recommend: {
    text: 'Ini dia produk-produk paling populer di EcoBox bulan ini! ⭐ Semua sudah tersertifikasi dan diverifikasi tim kami:',
    productIds: ['1', '3', '5', '8'],
    followUps: ['starter', 'plastic', 'kitchen'],
  },
}

const DEFAULT_WELCOME = {
  text: 'Halo! Saya Hana, Eco-Consultant EcoBox 🌿 Saya siap membantu kamu memulai atau melanjutkan perjalanan gaya hidup ramah lingkungan!\n\nAda yang ingin kamu tanyakan? Pilih topik di bawah atau ketik pertanyaanmu:',
  followUps: ['starter', 'plastic', 'kitchen', 'zerowaste', 'budget', 'recommend'],
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
  id: string
  role: 'user' | 'bot'
  text: string
  productIds?: string[]
  followUps?: string[]
  time: string
}

function getTime() {
  return new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

// ─── Product mini-card ────────────────────────────────────────────────────────
function ProductMiniCard({ productId }: { productId: string }) {
  const p = products.find((x) => x.id === productId)
  if (!p) return null
  return (
    <Link href={`/product/${p.id}`}
      className="flex items-center gap-2 rounded-xl border border-border bg-background p-2 hover:border-primary/40 transition-colors group">
      <img src={p.image} alt={p.name}
        className="h-10 w-10 rounded-lg object-cover shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-foreground line-clamp-1">{p.name}</p>
        <p className="text-xs text-primary font-bold">{formatRupiah(p.price)}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
    </Link>
  )
}

// ─── Main Widget ──────────────────────────────────────────────────────────────
export function EcoChatWidget() {
  const [open, setOpen] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'bot',
      text: DEFAULT_WELCOME.text,
      followUps: DEFAULT_WELCOME.followUps,
      time: getTime(),
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [hasUnread, setHasUnread] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    if (open) setHasUnread(false)
  }, [open, messages])

  const addBotMessage = (responseKey: string, delay = 1200) => {
    setTyping(true)
    setTimeout(() => {
      const response = BOT_RESPONSES[responseKey]
      if (!response) return
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'bot',
          text: response.text,
          productIds: response.productIds,
          followUps: response.followUps,
          time: getTime(),
        },
      ])
      setTyping(false)
    }, delay)
  }

  const handleQuickReply = (chipId: string) => {
    const chip = QUICK_REPLIES.find((c) => c.id === chipId)
    if (!chip) return
    setMessages((prev) => [...prev, {
      id: `user-${Date.now()}`,
      role: 'user',
      text: chip.label,
      time: getTime(),
    }])
    addBotMessage(chipId)
  }

  const handleSend = () => {
    const text = input.trim()
    if (!text) return
    setMessages((prev) => [...prev, {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      time: getTime(),
    }])
    setInput('')

    // Simple keyword matching for free text
    const lower = text.toLowerCase()
    let key = 'starter'
    if (lower.includes('plastik') || lower.includes('kantong') || lower.includes('sedotan')) key = 'plastic'
    else if (lower.includes('dapur') || lower.includes('masak') || lower.includes('makan')) key = 'kitchen'
    else if (lower.includes('zero') || lower.includes('sampah') || lower.includes('limbah')) key = 'zerowaste'
    else if (lower.includes('murah') || lower.includes('budget') || lower.includes('harga')) key = 'budget'
    else if (lower.includes('populer') || lower.includes('terlaris') || lower.includes('rekomen')) key = 'recommend'

    addBotMessage(key)
  }

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      {open && !minimized && (
        <div className="flex h-[520px] w-[340px] sm:w-[380px] flex-col rounded-2xl border border-border bg-background shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="flex items-center gap-3 bg-foreground px-4 py-3">
            <div className="relative">
              <img src={CONSULTANT.avatar} alt={CONSULTANT.name}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-[#A4F000]/40" />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#A4F000] ring-2 ring-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-background">{CONSULTANT.name}</p>
              <p className="text-xs text-background/60">{CONSULTANT.title}</p>
            </div>
            <div className="flex items-center gap-2">
              {/* WhatsApp button */}
              <a
                href={`https://wa.me/${CONSULTANT.whatsapp}?text=Halo%20Hana%2C%20saya%20butuh%20konsultasi%20eco-friendly%20di%20EcoBox!`}
                target="_blank" rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 transition-colors"
                title="Lanjut via WhatsApp"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <button onClick={() => setMinimized(true)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-background/60 hover:bg-background/10 transition-colors">
                <Minimize2 className="h-4 w-4" />
              </button>
              <button onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-background/60 hover:bg-background/10 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {msg.role === 'bot' && (
                  <img src={CONSULTANT.avatar} alt="Hana"
                    className="h-7 w-7 rounded-full object-cover shrink-0 mt-1" />
                )}
                <div className={`max-w-[80%] space-y-2 ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                  {/* Bubble */}
                  <div className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${msg.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-tr-sm'
                    : 'bg-background border border-border text-foreground rounded-tl-sm'}`}>
                    <p style={{ whiteSpace: 'pre-line' }}
                      dangerouslySetInnerHTML={{
                        __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      }}
                    />
                  </div>
                  {/* Products */}
                  {msg.productIds && msg.productIds.length > 0 && (
                    <div className="w-full space-y-1.5">
                      {msg.productIds.map((id) => (
                        <ProductMiniCard key={id} productId={id} />
                      ))}
                    </div>
                  )}
                  {/* Quick reply chips */}
                  {msg.followUps && msg.role === 'bot' && (
                    <div className="flex flex-wrap gap-1.5">
                      {msg.followUps.map((key) => {
                        const chip = QUICK_REPLIES.find((c) => c.id === key)
                        if (!chip) return null
                        return (
                          <button key={key} onClick={() => handleQuickReply(key)}
                            className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:border-primary/50 hover:text-primary transition-colors">
                            {chip.label}
                          </button>
                        )
                      })}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">{msg.time}</p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex gap-2">
                <img src={CONSULTANT.avatar} alt="Hana" className="h-7 w-7 rounded-full object-cover shrink-0 mt-1" />
                <div className="bg-background border border-border rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border bg-background p-3">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ketik pertanyaan eco-mu..."
                className="flex-1 rounded-xl border border-input bg-muted/30 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button onClick={handleSend}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground hover:bg-[#8BD400] transition-colors disabled:opacity-50"
                disabled={!input.trim() || typing}>
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Konsultasi penuh →{' '}
              <Link href="/consultant" className="font-medium text-primary hover:underline" onClick={() => setOpen(false)}>
                Halaman Konsultan
              </Link>
            </p>
          </div>
        </div>
      )}

      {/* Minimized bar */}
      {open && minimized && (
        <button
          onClick={() => setMinimized(false)}
          className="flex items-center gap-3 rounded-2xl bg-foreground px-4 py-3 shadow-xl hover:opacity-90 transition-opacity animate-in slide-in-from-bottom-2"
        >
          <img src={CONSULTANT.avatar} alt="Hana" className="h-8 w-8 rounded-full object-cover" />
          <div className="text-left">
            <p className="text-sm font-semibold text-background">{CONSULTANT.name} · EcoBox</p>
            <p className="text-xs text-background/60">Klik untuk lanjut chat</p>
          </div>
          <ChevronRight className="h-4 w-4 text-background/60" />
        </button>
      )}

      {/* Trigger FAB */}
      {!open && (
        <div className="relative">
          <button
            onClick={() => setOpen(true)}
            className="group flex h-14 w-14 items-center justify-center rounded-full bg-foreground shadow-xl hover:scale-105 transition-transform"
          >
            <MessageCircle className="h-6 w-6 text-[#A4F000]" />
          </button>
          {/* Unread badge */}
          {hasUnread && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#CC73B3] text-xs font-bold text-white">
              1
            </span>
          )}
          {/* Tooltip */}
          <div className="absolute bottom-16 right-0 hidden w-max max-w-[180px] rounded-xl bg-foreground px-3 py-2 text-xs text-background shadow-lg group-hover:block">
            💬 Tanya Hana, konsultan eco kamu!
            <div className="absolute -bottom-1.5 right-4 h-3 w-3 rotate-45 bg-foreground" />
          </div>
        </div>
      )}
    </div>
  )
}
