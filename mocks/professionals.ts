export interface Professional {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  image: string;
  distance: string;
  price: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  services: string[];
  bio: string;
}

export const professionals: Professional[] = [
  {
    id: '1',
    name: 'Isabella Santos',
    specialty: 'Hair Stylist & Colorist',
    rating: 4.9,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400',
    distance: '0.5 km',
    price: '$$$',
    location: {
      latitude: 37.7849,
      longitude: -122.4094,
      address: '123 Beauty Street, San Francisco',
    },
    services: ['Hair Coloring', 'Balayage', 'Haircut', 'Styling'],
    bio: 'Certified colorist with 10+ years experience in modern techniques',
  },
  {
    id: '2',
    name: 'Maria Rodriguez',
    specialty: 'Makeup Artist',
    rating: 5.0,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1598257006458-087169a1f08d?w=400',
    distance: '1.2 km',
    price: '$$',
    location: {
      latitude: 37.7749,
      longitude: -122.4194,
      address: '456 Glam Avenue, San Francisco',
    },
    services: ['Bridal Makeup', 'Special Events', 'Photoshoot', 'Lessons'],
    bio: 'Professional makeup artist specializing in natural glam looks',
  },
  {
    id: '3',
    name: 'Sophie Chen',
    specialty: 'Nail Artist',
    rating: 4.8,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
    distance: '0.8 km',
    price: '$$',
    location: {
      latitude: 37.7649,
      longitude: -122.4294,
      address: '789 Nail Plaza, San Francisco',
    },
    services: ['Gel Manicure', 'Nail Art', 'Pedicure', 'Acrylic Nails'],
    bio: 'Creative nail designs with a focus on nail health',
  },
  {
    id: '4',
    name: 'Emma Johnson',
    specialty: 'Esthetician',
    rating: 4.9,
    reviews: 276,
    image: 'https://images.unsplash.com/photo-1559250404-b4ee645cf82a?w=400',
    distance: '1.5 km',
    price: '$$$',
    location: {
      latitude: 37.7549,
      longitude: -122.4394,
      address: '321 Skin Care Lane, San Francisco',
    },
    services: ['Facials', 'Microdermabrasion', 'Chemical Peels', 'LED Therapy'],
    bio: 'Licensed esthetician specializing in anti-aging treatments',
  },
  {
    id: '5',
    name: 'Olivia Martinez',
    specialty: 'Lash & Brow Specialist',
    rating: 5.0,
    reviews: 198,
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400',
    distance: '2.0 km',
    price: '$$',
    location: {
      latitude: 37.7449,
      longitude: -122.4494,
      address: '654 Lash Boulevard, San Francisco',
    },
    services: ['Lash Extensions', 'Brow Lamination', 'Lash Lift', 'Brow Tint'],
    bio: 'Expert in creating natural-looking lash extensions',
  },
  {
    id: '6',
    name: 'Ava Thompson',
    specialty: 'Massage Therapist',
    rating: 4.7,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400',
    distance: '1.8 km',
    price: '$$$',
    location: {
      latitude: 37.7349,
      longitude: -122.4594,
      address: '987 Wellness Way, San Francisco',
    },
    services: ['Swedish Massage', 'Deep Tissue', 'Hot Stone', 'Aromatherapy'],
    bio: 'Certified massage therapist with holistic approach',
  },
];
