export interface BeautyTip {
  id: string;
  title: string;
  category: string;
  content: string;
  author: string;
  authorImage: string;
  image: string;
  readTime: string;
  date: string;
  likes: number;
}

export const beautyTips: BeautyTip[] = [
  {
    id: 'tip_001',
    title: 'How to Make Your Hair Color Last Longer',
    category: 'Hair',
    content: 'Use color-safe shampoo and conditioner, wash with cool water, limit heat styling, and get regular trims every 6-8 weeks. Protect your hair from UV rays and chlorine.',
    author: 'Isabella Santos',
    authorImage: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600',
    readTime: '5 min read',
    date: '2025-01-10',
    likes: 342,
  },
  {
    id: 'tip_002',
    title: '10 Skincare Secrets for Glowing Skin',
    category: 'Skincare',
    content: 'Double cleanse, use vitamin C serum, never skip sunscreen, stay hydrated, get enough sleep, eat antioxidant-rich foods, and establish a consistent routine.',
    author: 'Emma Johnson',
    authorImage: 'https://images.unsplash.com/photo-1559250404-b4ee645cf82a?w=400',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600',
    readTime: '7 min read',
    date: '2025-01-08',
    likes: 487,
  },
  {
    id: 'tip_003',
    title: 'Makeup Tips for Long-Lasting Wear',
    category: 'Makeup',
    content: 'Start with primer, set with powder, use waterproof products, avoid touching your face, and carry blotting papers for touch-ups throughout the day.',
    author: 'Maria Rodriguez',
    authorImage: 'https://images.unsplash.com/photo-1598257006458-087169a1f08d?w=400',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600',
    readTime: '6 min read',
    date: '2025-01-07',
    likes: 398,
  },
  {
    id: 'tip_004',
    title: 'Nail Care Routine for Healthy Nails',
    category: 'Nails',
    content: 'Keep nails trimmed and filed, moisturize cuticles daily, avoid harsh chemicals, take biotin supplements, and give your nails breaks between polish applications.',
    author: 'Sophie Chen',
    authorImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600',
    readTime: '4 min read',
    date: '2025-01-06',
    likes: 276,
  },
  {
    id: 'tip_005',
    title: 'Lash Extension Aftercare Guide',
    category: 'Lashes',
    content: 'Avoid water for 24 hours, use oil-free products, brush daily with a spoolie, sleep on your back, and avoid rubbing your eyes to maintain your lashes.',
    author: 'Olivia Martinez',
    authorImage: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400',
    image: 'https://images.unsplash.com/photo-1588016207390-f836d1feb77e?w=600',
    readTime: '5 min read',
    date: '2025-01-05',
    likes: 412,
  },
  {
    id: 'tip_006',
    title: 'Pre-Treatment Preparation Tips',
    category: 'General',
    content: 'Arrive with clean skin/hair, avoid caffeine before treatments, communicate your concerns, disclose allergies, and follow pre-care instructions from your professional.',
    author: 'Emma Johnson',
    authorImage: 'https://images.unsplash.com/photo-1559250404-b4ee645cf82a?w=400',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600',
    readTime: '3 min read',
    date: '2025-01-04',
    likes: 195,
  },
];

export const getTipsByCategory = (category: string) => {
  return beautyTips.filter(tip => tip.category === category);
};
