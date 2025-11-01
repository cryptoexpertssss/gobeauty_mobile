export interface FeaturedPromotion {
  id: string;
  title: string;
  description: string;
  image: string;
  discount: string;
  validUntil: string;
  category: string;
}

export const featuredPromotions: FeaturedPromotion[] = [
  {
    id: 'promo_001',
    title: 'New Year Hair Transformation',
    description: 'Get 20% off all hair coloring services this January',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800',
    discount: '20% OFF',
    validUntil: '2025-01-31',
    category: 'Hair',
  },
  {
    id: 'promo_002',
    title: 'Winter Skin Revival',
    description: 'Hydrafacial + LED Therapy combo for glowing winter skin',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800',
    discount: '30% OFF',
    validUntil: '2025-02-14',
    category: 'Skincare',
  },
  {
    id: 'promo_003',
    title: 'Bridal Package Special',
    description: 'Complete bridal beauty package including trial sessions',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    discount: 'Save $200',
    validUntil: '2025-03-31',
    category: 'Makeup',
  },
  {
    id: 'promo_004',
    title: 'Lash Love Month',
    description: 'Book lash extensions and get a free lash lift',
    image: 'https://images.unsplash.com/photo-1588016207390-f836d1feb77e?w=800',
    discount: 'Buy 1 Get 1',
    validUntil: '2025-02-28',
    category: 'Lashes',
  },
  {
    id: 'promo_005',
    title: 'Relaxation Retreat',
    description: '90-minute massage + aromatherapy session',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
    discount: '25% OFF',
    validUntil: '2025-01-31',
    category: 'Massage',
  },
];

export interface TrendingService {
  id: string;
  name: string;
  bookings: number;
  growth: number;
  image: string;
  price: string;
}

export const trendingServices: TrendingService[] = [
  {
    id: 'trend_001',
    name: 'Balayage',
    bookings: 1247,
    growth: 35,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400',
    price: 'From $150',
  },
  {
    id: 'trend_002',
    name: 'Lash Extensions',
    bookings: 923,
    growth: 28,
    image: 'https://images.unsplash.com/photo-1583001931096-959a5d6a4f6b?w=400',
    price: 'From $120',
  },
  {
    id: 'trend_003',
    name: 'Hydrafacial',
    bookings: 856,
    growth: 42,
    image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=400',
    price: 'From $150',
  },
  {
    id: 'trend_004',
    name: 'Gel Manicure',
    bookings: 1532,
    growth: 15,
    image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=400',
    price: 'From $35',
  },
];

export interface PopularProfessional {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  bookingsThisMonth: number;
  image: string;
}

export const popularProfessionals: PopularProfessional[] = [
  {
    id: '1',
    name: 'Isabella Santos',
    specialty: 'Hair Stylist',
    rating: 4.9,
    bookingsThisMonth: 87,
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400',
  },
  {
    id: '2',
    name: 'Maria Rodriguez',
    specialty: 'Makeup Artist',
    rating: 5.0,
    bookingsThisMonth: 72,
    image: 'https://images.unsplash.com/photo-1598257006458-087169a1f08d?w=400',
  },
  {
    id: '4',
    name: 'Emma Johnson',
    specialty: 'Esthetician',
    rating: 4.9,
    bookingsThisMonth: 65,
    image: 'https://images.unsplash.com/photo-1559250404-b4ee645cf82a?w=400',
  },
];
