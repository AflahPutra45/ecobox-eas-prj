// Data Dummy EcoBox

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  vendor: {
    name: string
    verified: boolean
  }
  rating: number
  reviewCount: number
  category: string
  badges: Badge[]
  sustainabilityScore: number
  impactMetrics: {
    plasticPrevented: string
    carbonSaved: string
    waterSaved?: string
  }
}

export interface Badge {
  id: string
  name: string
  color: 'green' | 'blue' | 'yellow' | 'purple' | 'orange'
}

export interface Category {
  id: string
  name: string
  icon: string
  count: number
}

export const badges: Record<string, Badge> = {
  verified: { id: 'verified', name: 'Berkelanjutan Terverifikasi', color: 'green' },
  compostable: { id: 'compostable', name: 'Dapat Dikompos', color: 'green' },
  vegan: { id: 'vegan', name: 'Vegan', color: 'purple' },
  halal: { id: 'halal', name: 'Halal', color: 'blue' },
  foodGrade: { id: 'foodGrade', name: 'Food-Grade', color: 'yellow' },
  reusable: { id: 'reusable', name: 'Dapat Digunakan Ulang', color: 'orange' },
  biodegradable: { id: 'biodegradable', name: 'Dapat Terurai', color: 'green' },
  recycled: { id: 'recycled', name: 'Bahan Daur Ulang', color: 'blue' },
}

export const categories: Category[] = [
  { id: 'packaging', name: 'Kemasan Ramah Lingkungan', icon: '📦', count: 156 },
  { id: 'kitchen', name: 'Dapur & Makan', icon: '🍽️', count: 89 },
  { id: 'personal-care', name: 'Perawatan Diri', icon: '🧴', count: 124 },
  { id: 'home', name: 'Rumah & Kehidupan', icon: '🏠', count: 67 },
  { id: 'office', name: 'Perlengkapan Kantor', icon: '📝', count: 45 },
  { id: 'fashion', name: 'Fashion Berkelanjutan', icon: '👕', count: 78 },
]

export const products: Product[] = [
  {
    id: '1',
    name: 'Set Wadah Makanan Bambu',
    description: 'Wadah bambu premium dengan tutup silikon. Sempurna untuk persiapan makanan dan penyimpanan. Bebas BPA dan aman untuk mesin cuci piring.',
    price: 35000,
    originalPrice: 45000,
    image: 'https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?w=400&h=400&fit=crop',
    vendor: { name: 'EcoKitchen Co.', verified: true },
    rating: 4.8,
    reviewCount: 234,
    category: 'kitchen',
    badges: [badges.verified, badges.foodGrade, badges.reusable],
    sustainabilityScore: 92,
    impactMetrics: {
      plasticPrevented: '2,5kg',
      carbonSaved: '1,2kg CO₂',
      waterSaved: '50L',
    },
  },
  {
    id: '2',
    name: 'Kantong Pengiriman Dapat Dikompos (50 pcs)',
    description: 'Kantong pengiriman berbahan tanaman yang terurai dalam 180 hari. Sempurna untuk bisnis e-commerce.',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&h=400&fit=crop',
    vendor: { name: 'GreenShip', verified: true },
    rating: 4.9,
    reviewCount: 567,
    category: 'packaging',
    badges: [badges.verified, badges.compostable, badges.biodegradable],
    sustainabilityScore: 98,
    impactMetrics: {
      plasticPrevented: '5kg',
      carbonSaved: '3,5kg CO₂',
    },
  },
  {
    id: '3',
    name: 'Set Sikat Gigi Bambu Natural',
    description: 'Paket 4 sikat gigi bambu biodegradable dengan bulu sikat infus arang.',
    price: 12000,
    originalPrice: 18000,
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop',
    vendor: { name: 'Pure Earth', verified: true },
    rating: 4.7,
    reviewCount: 892,
    category: 'personal-care',
    badges: [badges.verified, badges.biodegradable, badges.vegan],
    sustainabilityScore: 95,
    impactMetrics: {
      plasticPrevented: '0,4kg',
      carbonSaved: '0,8kg CO₂',
    },
  },
  {
    id: '4',
    name: 'Buku Catatan Kertas Daur Ulang',
    description: '100% kertas daur ulang pasca-konsumen, tinta berbasis kedelai, dan sampul biji yang dapat ditanam.',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=400&fit=crop',
    vendor: { name: 'TreeCycle', verified: true },
    rating: 4.6,
    reviewCount: 156,
    category: 'office',
    badges: [badges.recycled, badges.biodegradable],
    sustainabilityScore: 88,
    impactMetrics: {
      plasticPrevented: '0,1kg',
      carbonSaved: '0,5kg CO₂',
      waterSaved: '10L',
    },
  },
  {
    id: '5',
    name: 'Tas Tote Katun Organik',
    description: 'Katun organik bersertifikat GOTS dengan pegangan yang diperkuat. Dapat menahan hingga 20kg.',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1597484662317-9bd7bdda2907?w=400&h=400&fit=crop',
    vendor: { name: 'EcoWear', verified: true },
    rating: 4.9,
    reviewCount: 1243,
    category: 'fashion',
    badges: [badges.verified, badges.vegan, badges.reusable],
    sustainabilityScore: 94,
    impactMetrics: {
      plasticPrevented: '15kg',
      carbonSaved: '8kg CO₂',
      waterSaved: '200L',
    },
  },
  {
    id: '6',
    name: 'Set Bungkus Makanan Lilin Lebah',
    description: 'Bungkus makanan dapat digunakan ulang dari katun organik, lilin lebah, dan resin pohon. Set 3 ukuran.',
    price: 38000,
    originalPrice: 50000,
    image: 'https://images.unsplash.com/photo-1611068120813-eca5a8cbf793?w=400&h=400&fit=crop',
    vendor: { name: 'BeeGreen', verified: true },
    rating: 4.8,
    reviewCount: 445,
    category: 'kitchen',
    badges: [badges.verified, badges.reusable, badges.foodGrade],
    sustainabilityScore: 91,
    impactMetrics: {
      plasticPrevented: '3kg',
      carbonSaved: '2kg CO₂',
    },
  },
  {
    id: '7',
    name: 'Casing HP Biodegradable',
    description: 'Terbuat dari jerami gandum dan polimer berbasis tanaman. Dapat terurai dalam 2 tahun.',
    price: 48000,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop',
    vendor: { name: 'GreenTech', verified: true },
    rating: 4.5,
    reviewCount: 312,
    category: 'home',
    badges: [badges.biodegradable, badges.compostable],
    sustainabilityScore: 85,
    impactMetrics: {
      plasticPrevented: '0,05kg',
      carbonSaved: '0,3kg CO₂',
    },
  },
  {
    id: '8',
    name: 'Kit Semprotan Pembersih Isi Ulang',
    description: 'Botol semprot kaca dengan 3 tablet pembersih konsentrat. Menghasilkan 1,5L pembersih.',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop',
    vendor: { name: 'CleanEarth', verified: true },
    rating: 4.7,
    reviewCount: 678,
    category: 'home',
    badges: [badges.verified, badges.reusable, badges.vegan],
    sustainabilityScore: 93,
    impactMetrics: {
      plasticPrevented: '1,5kg',
      carbonSaved: '1kg CO₂',
      waterSaved: '30L',
    },
  },
]


export const impactStats = {
  plasticPrevented: { value: '2,4M', unit: 'kg', label: 'Plastik Dicegah' },
  carbonSaved: { value: '850K', unit: 'kg CO₂', label: 'Emisi Karbon Dihemat' },
  verifiedVendors: { value: '1.200+', unit: '', label: 'Vendor Terverifikasi' },
  communityMembers: { value: '50K+', unit: '', label: 'Anggota Komunitas' },
}

export const testimonials = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Pemilik Usaha Kecil',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    content: 'EcoBox mengubah cara kami mencari kemasan. Pelanggan kami senang mengetahui pesanan mereka tiba dalam bahan yang dapat dikompos.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    role: 'Manajer Keberlanjutan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    content: 'Dashboard pelacakan dampak memberikan kami data nyata untuk laporan keberlanjutan. Sangat berharga untuk kepatuhan ESG.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Emma Williams',
    role: 'Konsumen Peduli Lingkungan',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    content: 'Akhirnya, sebuah marketplace di mana saya bisa mempercayai setiap produk. Badge verifikasi membuat belanja tanpa rasa bersalah.',
    rating: 5,
  },
]
