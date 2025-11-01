export interface Review {
  id: string;
  professionalId: string;
  clientName: string;
  clientImage: string;
  rating: number;
  comment: string;
  service: string;
  date: string;
  helpful: number;
}

export const reviews: Review[] = [
  {
    id: 'rev_001',
    professionalId: '1',
    clientName: 'Sarah Wilson',
    clientImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    rating: 5,
    comment: 'Isabella is absolutely amazing! The balayage came out exactly as I wanted. She really listened to what I was looking for and delivered perfection. Highly recommend!',
    service: 'Balayage Hair Color',
    date: '2025-01-05',
    helpful: 24,
  },
  {
    id: 'rev_002',
    professionalId: '1',
    clientName: 'Emma Thompson',
    clientImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    rating: 5,
    comment: 'Best hair stylist in the city! My hair has never looked better. Isabella is a true professional and artist.',
    service: 'Hair Coloring',
    date: '2025-01-03',
    helpful: 18,
  },
  {
    id: 'rev_003',
    professionalId: '2',
    clientName: 'Olivia Brown',
    clientImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    rating: 5,
    comment: 'Maria did my wedding makeup and I felt like a princess! She\'s incredibly talented and made me feel so comfortable. Everyone complimented my makeup all night!',
    service: 'Bridal Makeup',
    date: '2025-01-04',
    helpful: 31,
  },
  {
    id: 'rev_004',
    professionalId: '2',
    clientName: 'Sophia Davis',
    clientImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    rating: 5,
    comment: 'Absolutely loved the natural glam look Maria created for my photoshoot. She knows exactly what works for each face!',
    service: 'Photoshoot Makeup',
    date: '2025-01-01',
    helpful: 15,
  },
  {
    id: 'rev_005',
    professionalId: '3',
    clientName: 'Mia Johnson',
    clientImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    rating: 5,
    comment: 'Sophie\'s nail art is incredible! My gel manicure lasted for 3 weeks without chipping. The designs she creates are so unique and beautiful.',
    service: 'Gel Manicure',
    date: '2025-01-06',
    helpful: 27,
  },
  {
    id: 'rev_006',
    professionalId: '3',
    clientName: 'Charlotte Lee',
    clientImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
    rating: 4,
    comment: 'Great experience! Sophie is very skilled and the salon is clean and welcoming. Will definitely come back.',
    service: 'Pedicure',
    date: '2025-01-02',
    helpful: 12,
  },
  {
    id: 'rev_007',
    professionalId: '4',
    clientName: 'Isabella Garcia',
    clientImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
    rating: 5,
    comment: 'Emma\'s facials are transformative! My skin has never looked better. She really knows her stuff and customizes each treatment.',
    service: 'Hydrafacial',
    date: '2025-01-07',
    helpful: 35,
  },
  {
    id: 'rev_008',
    professionalId: '4',
    clientName: 'Ava Martinez',
    clientImage: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400',
    rating: 5,
    comment: 'Best esthetician I\'ve ever been to! Emma took time to understand my skin concerns and created a custom treatment plan.',
    service: 'Chemical Peel',
    date: '2025-01-04',
    helpful: 22,
  },
  {
    id: 'rev_009',
    professionalId: '5',
    clientName: 'Amelia Rodriguez',
    clientImage: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400',
    rating: 5,
    comment: 'Olivia is the lash queen! My extensions look so natural and beautiful. She\'s gentle and professional throughout the entire process.',
    service: 'Lash Extensions',
    date: '2025-01-05',
    helpful: 29,
  },
  {
    id: 'rev_010',
    professionalId: '5',
    clientName: 'Harper Wilson',
    clientImage: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=400',
    rating: 5,
    comment: 'My brows have never looked better! Olivia\'s brow lamination technique is amazing. Perfect shape and so natural looking.',
    service: 'Brow Lamination',
    date: '2025-01-03',
    helpful: 19,
  },
  {
    id: 'rev_011',
    professionalId: '6',
    clientName: 'Evelyn Anderson',
    clientImage: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400',
    rating: 5,
    comment: 'Ava\'s massages are pure bliss! She has healing hands and knows exactly where to apply pressure. I always leave feeling rejuvenated.',
    service: 'Deep Tissue Massage',
    date: '2025-01-06',
    helpful: 26,
  },
  {
    id: 'rev_012',
    professionalId: '6',
    clientName: 'Abigail Thomas',
    clientImage: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=400',
    rating: 4,
    comment: 'Very relaxing hot stone massage. Ava creates such a peaceful atmosphere and her technique is wonderful.',
    service: 'Hot Stone Massage',
    date: '2025-01-02',
    helpful: 14,
  },
];

export const getReviewsByProfessionalId = (professionalId: string) => {
  return reviews.filter(review => review.professionalId === professionalId);
};

export const getAverageRating = (professionalId: string) => {
  const professionalReviews = getReviewsByProfessionalId(professionalId);
  if (professionalReviews.length === 0) return 0;
  
  const sum = professionalReviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / professionalReviews.length).toFixed(1);
};
