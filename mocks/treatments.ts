export interface Treatment {
  id: string;
  name: string;
  category: string;
  description: string;
  duration: string;
  priceRange: string;
  image: string;
  benefits: string[];
  contraindications: string[];
  popularity: number;
}

export const treatments: Treatment[] = [
  {
    id: '1',
    name: 'Balayage Hair Color',
    category: 'Hair',
    description: 'A freehand hair coloring technique that creates natural-looking, sun-kissed highlights with a seamless blend.',
    duration: '2-3 hours',
    priceRange: '$150-$300',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
    benefits: [
      'Natural-looking color',
      'Low maintenance',
      'Customizable results',
      'Less damage than traditional highlights',
    ],
    contraindications: [
      'Very damaged hair',
      'Recent chemical treatments',
      'Scalp sensitivity',
    ],
    popularity: 95,
  },
  {
    id: '2',
    name: 'Hydrafacial',
    category: 'Skincare',
    description: 'A medical-grade facial treatment that cleanses, extracts, and hydrates skin using patented technology.',
    duration: '45-60 minutes',
    priceRange: '$150-$250',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400',
    benefits: [
      'Deep cleansing',
      'Improved skin texture',
      'Reduced fine lines',
      'Instant glow',
    ],
    contraindications: [
      'Active rashes or sunburn',
      'Recent laser treatments',
      'Open wounds',
    ],
    popularity: 92,
  },
  {
    id: '3',
    name: 'Lash Extensions',
    category: 'Lashes',
    description: 'Individual synthetic lashes applied to natural lashes for enhanced length and volume.',
    duration: '1.5-2 hours',
    priceRange: '$120-$200',
    image: 'https://images.unsplash.com/photo-1583001984006-35f1f5b56d2d?w=400',
    benefits: [
      'Fuller lashes',
      'No mascara needed',
      'Waterproof',
      'Long-lasting results',
    ],
    contraindications: [
      'Eye infections',
      'Allergies to adhesive',
      'Extremely sparse lashes',
    ],
    popularity: 88,
  },
  {
    id: '4',
    name: 'Microblading',
    category: 'Brows',
    description: 'Semi-permanent eyebrow tattooing technique that creates hair-like strokes for natural-looking brows.',
    duration: '2-3 hours',
    priceRange: '$400-$800',
    image: 'https://images.unsplash.com/photo-1588778605356-e2f3c1800e10?w=400',
    benefits: [
      'Natural-looking brows',
      'Long-lasting (1-3 years)',
      'Saves time daily',
      'Customizable shape',
    ],
    contraindications: [
      'Pregnancy',
      'Skin conditions',
      'Blood thinners',
      'Recent Botox',
    ],
    popularity: 85,
  },
  {
    id: '5',
    name: 'Gel Manicure',
    category: 'Nails',
    description: 'Long-lasting nail polish that is cured under UV or LED light for chip-free shine.',
    duration: '45-60 minutes',
    priceRange: '$30-$60',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400',
    benefits: [
      'Lasts 2-3 weeks',
      'Instant dry time',
      'High shine finish',
      'Wide color selection',
    ],
    contraindications: [
      'Nail infections',
      'Damaged nail beds',
      'Pregnancy (check with doctor)',
    ],
    popularity: 90,
  },
  {
    id: '6',
    name: 'Brazilian Blowout',
    category: 'Hair',
    description: 'Smoothing treatment that reduces frizz and creates sleek, shiny hair for months.',
    duration: '2-3 hours',
    priceRange: '$200-$400',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400',
    benefits: [
      'Reduces frizz up to 95%',
      'Lasts 3-4 months',
      'Cuts styling time',
      'Works on all hair types',
    ],
    contraindications: [
      'Pregnant or nursing',
      'Damaged hair',
      'Recent color treatments',
    ],
    popularity: 82,
  },
  {
    id: '7',
    name: 'Microneedling',
    category: 'Skincare',
    description: 'Collagen induction therapy using fine needles to improve skin texture and appearance.',
    duration: '60-90 minutes',
    priceRange: '$200-$700',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400',
    benefits: [
      'Reduces scars',
      'Minimizes pores',
      'Improves texture',
      'Boosts collagen',
    ],
    contraindications: [
      'Active acne',
      'Blood disorders',
      'Skin infections',
      'Recent radiation',
    ],
    popularity: 78,
  },
  {
    id: '8',
    name: 'Spray Tan',
    category: 'Body',
    description: 'Airbrush tanning application for a natural-looking sun-kissed glow without UV exposure.',
    duration: '15-30 minutes',
    priceRange: '$35-$75',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400',
    benefits: [
      'Safe alternative to sun',
      'Even coverage',
      'Lasts 5-7 days',
      'Customizable shade',
    ],
    contraindications: [
      'Skin sensitivity',
      'Recent exfoliation',
      'Open cuts or wounds',
    ],
    popularity: 75,
  },
];

export const categories = [
  'All',
  'Hair',
  'Skincare',
  'Nails',
  'Lashes',
  'Brows',
  'Body',
];
