export interface GalleryItem {
  id: string;
  professionalId: string;
  professionalName: string;
  service: string;
  image: string;
  likes: number;
  description: string;
  before?: string;
  category: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: 'gallery_001',
    professionalId: '1',
    professionalName: 'Isabella Santos',
    service: 'Balayage Hair Color',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600',
    likes: 245,
    description: 'Sun-kissed balayage with natural blonde highlights',
    category: 'Hair',
  },
  {
    id: 'gallery_002',
    professionalId: '1',
    professionalName: 'Isabella Santos',
    service: 'Hair Styling',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600',
    likes: 198,
    description: 'Elegant updo for special occasion',
    category: 'Hair',
  },
  {
    id: 'gallery_003',
    professionalId: '2',
    professionalName: 'Maria Rodriguez',
    service: 'Bridal Makeup',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600',
    likes: 312,
    description: 'Classic bridal makeup with soft glam',
    category: 'Makeup',
  },
  {
    id: 'gallery_004',
    professionalId: '2',
    professionalName: 'Maria Rodriguez',
    service: 'Evening Makeup',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600',
    likes: 267,
    description: 'Smokey eye with nude lip for evening event',
    category: 'Makeup',
  },
  {
    id: 'gallery_005',
    professionalId: '3',
    professionalName: 'Sophie Chen',
    service: 'Nail Art',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600',
    likes: 189,
    description: 'Floral nail art design with gel polish',
    category: 'Nails',
  },
  {
    id: 'gallery_006',
    professionalId: '3',
    professionalName: 'Sophie Chen',
    service: 'Acrylic Nails',
    image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=600',
    likes: 223,
    description: 'French ombre acrylic nails',
    category: 'Nails',
  },
  {
    id: 'gallery_007',
    professionalId: '4',
    professionalName: 'Emma Johnson',
    service: 'Facial Treatment',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600',
    likes: 178,
    description: 'Hydrafacial treatment results - glowing skin',
    category: 'Skincare',
  },
  {
    id: 'gallery_008',
    professionalId: '5',
    professionalName: 'Olivia Martinez',
    service: 'Lash Extensions',
    image: 'https://images.unsplash.com/photo-1588016207390-f836d1feb77e?w=600',
    likes: 294,
    description: 'Volume lash extensions - dramatic look',
    category: 'Lashes',
  },
  {
    id: 'gallery_009',
    professionalId: '5',
    professionalName: 'Olivia Martinez',
    service: 'Brow Lamination',
    image: 'https://images.unsplash.com/photo-1588778605356-e2f3c1800e10?w=600',
    likes: 156,
    description: 'Brow lamination with tint - perfect shape',
    category: 'Brows',
  },
  {
    id: 'gallery_010',
    professionalId: '1',
    professionalName: 'Isabella Santos',
    service: 'Hair Color',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600',
    likes: 201,
    description: 'Caramel highlights on brunette hair',
    category: 'Hair',
  },
  {
    id: 'gallery_011',
    professionalId: '3',
    professionalName: 'Sophie Chen',
    service: 'Gel Manicure',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600',
    likes: 145,
    description: 'Minimalist gel manicure with gold accent',
    category: 'Nails',
  },
  {
    id: 'gallery_012',
    professionalId: '2',
    professionalName: 'Maria Rodriguez',
    service: 'Natural Makeup',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600',
    likes: 233,
    description: 'Natural everyday makeup look',
    category: 'Makeup',
  },
];

export const getGalleryByProfessionalId = (professionalId: string) => {
  return galleryItems.filter(item => item.professionalId === professionalId);
};

export const getGalleryByCategory = (category: string) => {
  return galleryItems.filter(item => item.category === category);
};
