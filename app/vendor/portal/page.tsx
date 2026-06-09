'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Package, TrendingUp, Star, ShoppingBag, Leaf, CheckCircle,
    Clock, BarChart2, LogOut, Plus, Eye, ArrowRight,
} from 'lucide-react'
import { formatRupiah } from '@/lib/utils'

// Dummy portal data
const DUMMY_ORDERS = [
    { id: 'ORD-001', product: 'Set Wadah Makanan Bambu', customer: 'Budi S.', amount: 1098000, status: 'Diproses', date: '8 Jun 2026' },
    { id: 'ORD-002', product: 'Set Bungkus Makanan Lilin Lebah', customer: 'Ani R.', amount: 369000, status: 'Dikirim', date: '7 Jun 2026' },
    { id: 'ORD-003', product: 'Set Wadah Makanan Bambu', customer: 'Citra M.', amount: 549000, status: 'Selesai', date: '6 Jun 2026' },
]

const DUMMY_PRODUCTS = [
    { id: '1', name: 'Set Wadah Makanan Bambu', price: 549000, stock: 45, sold: 234, status: 'Aktif' },
    { id: '6', name: 'Set Bungkus Makanan Lilin Lebah', price: 369000, stock: 12, sold: 445, status: 'Aktif' },
]

const statusColors: Record<string, string> = {
    'Diproses': 'bg-amber-100 text-amber-700',
    'Dikirim': 'bg-blue-100 text-blue-700',
    'Selesai': 'bg-[#A4F000]/20 text-[#5a8500]',
}

export default function VendorPortalPage() {
    const router = useRouter()
    const [vendorName, setVendorName] = useState('')
    const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products'>('dashboard')

    useEffect(() => {
        const session = localStorage.getItem('vendor-session')
        if (!session) {
            router.push('/vendor/login')
            return
        }
        const { name } = JSON.parse(session)
        setVendorName(name)
    }, [router])

    const handleLogout = () => {
        localStorage.removeItem('vendor-session')
        router.push('/vendor/login')
    }

    if (!vendorName) return null

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 bg-muted/30">
                <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
                    {/* Portal Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">Selamat datang, {vendorName} 👋</h1>
                            <p className="text-sm text-muted-foreground">Portal Vendor EcoBox</p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/vendor/guidelines">
                                    <Leaf className="mr-2 h-4 w-4" /> Panduan
                                </Link>
                            </Button>
                            <Button variant="ghost" size="sm" onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" /> Keluar
                            </Button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="mt-6 flex gap-1 rounded-xl border border-border bg-background p-1">
                        {(['dashboard', 'orders', 'products'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${activeTab === tab
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                {tab === 'dashboard' ? 'Dashboard' : tab === 'orders' ? 'Pesanan' : 'Produk'}
                            </button>
                        ))}
                    </div>

                    {/* Dashboard Tab */}
                    {activeTab === 'dashboard' && (
                        <div className="mt-6 space-y-6">
                            {/* Stats */}
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                {[
                                    { label: 'Total Penjualan', value: 'Rp 12,4jt', icon: TrendingUp, color: 'text-[#A4F000]' },
                                    { label: 'Pesanan Bulan Ini', value: '47', icon: ShoppingBag, color: 'text-[#CC73B3]' },
                                    { label: 'Rating Rata-rata', value: '4.8 ★', icon: Star, color: 'text-amber-500' },
                                    { label: 'Produk Aktif', value: '2', icon: Package, color: 'text-blue-500' },
                                ].map((stat) => (
                                    <div key={stat.label} className="rounded-2xl border border-border bg-background p-5">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                                            <stat.icon className={`h-5 w-5 ${stat.color}`} />
                                        </div>
                                        <p className="mt-2 text-2xl font-bold text-foreground">{stat.value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Eco Impact */}
                            <div className="rounded-2xl border border-[#A4F000]/30 bg-[#A4F000]/5 p-6">
                                <div className="flex items-center gap-2">
                                    <Leaf className="h-5 w-5 text-[#A4F000]" />
                                    <h2 className="font-semibold text-foreground">Dampak Lingkungan Produk Anda</h2>
                                    <Badge className="bg-[#A4F000]/20 text-[#5a8500]">
                                        <CheckCircle className="mr-1 h-3 w-3" /> Vendor Terverifikasi
                                    </Badge>
                                </div>
                                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                                    {[
                                        { label: 'Plastik Dicegah', value: '1,2 ton' },
                                        { label: 'CO₂ Dihemat', value: '560kg' },
                                        { label: 'Produk Terjual', value: '679 unit' },
                                    ].map((item) => (
                                        <div key={item.label}>
                                            <p className="text-2xl font-bold text-[#A4F000]">{item.value}</p>
                                            <p className="text-sm text-muted-foreground">{item.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Orders */}
                            <div className="rounded-2xl border border-border bg-background p-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-semibold text-foreground">Pesanan Terbaru</h2>
                                    <Button variant="ghost" size="sm" onClick={() => setActiveTab('orders')}>
                                        Lihat semua <ArrowRight className="ml-1 h-3 w-3" />
                                    </Button>
                                </div>
                                <div className="mt-4 divide-y divide-border">
                                    {DUMMY_ORDERS.slice(0, 2).map((order) => (
                                        <div key={order.id} className="flex items-center justify-between py-3">
                                            <div>
                                                <p className="text-sm font-medium text-foreground">{order.id}</p>
                                                <p className="text-xs text-muted-foreground">{order.product}</p>
                                            </div>
                                            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[order.status]}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Orders Tab */}
                    {activeTab === 'orders' && (
                        <div className="mt-6 rounded-2xl border border-border bg-background">
                            <div className="border-b border-border p-5">
                                <h2 className="font-semibold text-foreground">Semua Pesanan</h2>
                            </div>
                            <div className="divide-y divide-border">
                                {DUMMY_ORDERS.map((order) => (
                                    <div key={order.id} className="flex flex-wrap items-center gap-4 p-5">
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-foreground">{order.id}</p>
                                            <p className="text-sm text-muted-foreground">{order.product}</p>
                                            <p className="text-xs text-muted-foreground">oleh {order.customer} · {order.date}</p>
                                        </div>
                                        <span className="font-semibold text-foreground">{formatRupiah(order.amount)}</span>
                                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[order.status]}`}>
                                            {order.status}
                                        </span>
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-3 w-3 mr-1" /> Detail
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Products Tab */}
                    {activeTab === 'products' && (
                        <div className="mt-6 space-y-4">
                            <div className="flex justify-end">
                                <Button className="bg-primary text-primary-foreground hover:bg-[#8BD400]">
                                    <Plus className="mr-2 h-4 w-4" /> Tambah Produk
                                </Button>
                            </div>
                            <div className="rounded-2xl border border-border bg-background">
                                <div className="divide-y divide-border">
                                    {DUMMY_PRODUCTS.map((product) => (
                                        <div key={product.id} className="flex flex-wrap items-center gap-4 p-5">
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-foreground">{product.name}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {formatRupiah(product.price)} · Stok: {product.stock} · Terjual: {product.sold}
                                                </p>
                                            </div>
                                            <span className="rounded-full bg-[#A4F000]/20 px-3 py-1 text-xs font-medium text-[#5a8500]">
                                                {product.status}
                                            </span>
                                            <Button variant="outline" size="sm">Edit</Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}
