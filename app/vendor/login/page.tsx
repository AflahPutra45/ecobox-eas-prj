'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, Leaf, Lock, Mail, ArrowRight } from 'lucide-react'

// Dummy vendor accounts for demo
const DEMO_VENDORS = [
    { email: 'vendor@ecobox.id', password: 'demo123', name: 'EcoKitchen Co.' },
    { email: 'greenship@ecobox.id', password: 'demo123', name: 'GreenShip' },
]

export default function VendorLoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        // Simulate API delay
        await new Promise((r) => setTimeout(r, 800))

        const vendor = DEMO_VENDORS.find(
            (v) => v.email === email && v.password === password
        )

        if (vendor) {
            // Store session in localStorage (demo)
            localStorage.setItem('vendor-session', JSON.stringify({ name: vendor.name, email: vendor.email }))
            router.push('/vendor/portal')
        } else {
            setError('Email atau password salah. Gunakan: vendor@ecobox.id / demo123')
        }

        setLoading(false)
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex flex-1 items-center justify-center bg-muted/30 px-4 py-12">
                <div className="w-full max-w-md">
                    {/* Logo/Brand */}
                    <div className="mb-8 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#A4F000]/10">
                            <Leaf className="h-8 w-8 text-[#A4F000]" />
                        </div>
                        <h1 className="mt-4 text-2xl font-bold text-foreground">Portal Vendor EcoBox</h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Masuk untuk mengelola produk dan pesanan Anda
                        </p>
                    </div>

                    {/* Login Card */}
                    <div className="rounded-2xl border border-border bg-background p-8 shadow-sm">
                        <form onSubmit={handleLogin} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Vendor</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="vendor@ecobox.id"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 pr-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full bg-primary text-primary-foreground hover:bg-[#8BD400]"
                                disabled={loading}
                            >
                                {loading ? 'Memproses...' : 'Masuk ke Portal'}
                                {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                            </Button>
                        </form>

                        <div className="mt-6 rounded-xl bg-muted/50 p-4 text-xs text-muted-foreground">
                            <p className="font-medium text-foreground">Demo Akun:</p>
                            <p>Email: vendor@ecobox.id</p>
                            <p>Password: demo123</p>
                        </div>
                    </div>

                    <p className="mt-6 text-center text-sm text-muted-foreground">
                        Belum jadi vendor?{' '}
                        <Link href="/vendor/apply" className="font-medium text-primary hover:underline">
                            Daftar sekarang
                        </Link>
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    )
}
