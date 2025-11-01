export interface SalonLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  amenities: string[];
  parking: string;
  publicTransit: string;
  image: string;
  rating: number;
  reviews: number;
  latitude: number;
  longitude: number;
}

export const salonLocations: SalonLocation[] = [
  {
    id: 'loc_001',
    name: 'GoBeauty Downtown',
    address: '123 Market Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    phone: '+1 (415) 555-0100',
    email: 'downtown@gobeauty.com',
    hours: {
      monday: '9:00 AM - 8:00 PM',
      tuesday: '9:00 AM - 8:00 PM',
      wednesday: '9:00 AM - 8:00 PM',
      thursday: '9:00 AM - 8:00 PM',
      friday: '9:00 AM - 9:00 PM',
      saturday: '8:00 AM - 9:00 PM',
      sunday: '10:00 AM - 6:00 PM',
    },
    amenities: ['WiFi', 'Refreshments', 'Parking', 'Wheelchair Accessible', 'Air Conditioned'],
    parking: 'Street parking and nearby garage',
    publicTransit: 'BART Powell Station - 2 blocks',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600',
    rating: 4.8,
    reviews: 423,
    latitude: 37.7849,
    longitude: -122.4094,
  },
  {
    id: 'loc_002',
    name: 'GoBeauty Marina',
    address: '456 Chestnut Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94123',
    phone: '+1 (415) 555-0200',
    email: 'marina@gobeauty.com',
    hours: {
      monday: '10:00 AM - 7:00 PM',
      tuesday: '10:00 AM - 7:00 PM',
      wednesday: '10:00 AM - 7:00 PM',
      thursday: '10:00 AM - 7:00 PM',
      friday: '10:00 AM - 8:00 PM',
      saturday: '9:00 AM - 8:00 PM',
      sunday: '10:00 AM - 6:00 PM',
    },
    amenities: ['WiFi', 'Refreshments', 'Valet Parking', 'Luxury Lounge', 'Premium Products'],
    parking: 'Valet service available',
    publicTransit: 'Bus 30 - Stop at Fillmore & Chestnut',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600',
    rating: 4.9,
    reviews: 387,
    latitude: 37.8024,
    longitude: -122.4378,
  },
  {
    id: 'loc_003',
    name: 'GoBeauty Mission',
    address: '789 Valencia Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94110',
    phone: '+1 (415) 555-0300',
    email: 'mission@gobeauty.com',
    hours: {
      monday: '9:00 AM - 8:00 PM',
      tuesday: '9:00 AM - 8:00 PM',
      wednesday: '9:00 AM - 8:00 PM',
      thursday: '9:00 AM - 9:00 PM',
      friday: '9:00 AM - 9:00 PM',
      saturday: '8:00 AM - 9:00 PM',
      sunday: '9:00 AM - 7:00 PM',
    },
    amenities: ['WiFi', 'Organic Products', 'Street Parking', 'Modern Interior', 'Music Lounge'],
    parking: 'Street parking available',
    publicTransit: 'BART 16th St Mission - 3 blocks',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600',
    rating: 4.7,
    reviews: 312,
    latitude: 37.7599,
    longitude: -122.4210,
  },
];

export const getLocationById = (id: string) => {
  return salonLocations.find(loc => loc.id === id);
};

export const getNearestLocations = (latitude: number, longitude: number) => {
  return salonLocations.sort((a, b) => {
    const distA = Math.sqrt(Math.pow(a.latitude - latitude, 2) + Math.pow(a.longitude - longitude, 2));
    const distB = Math.sqrt(Math.pow(b.latitude - latitude, 2) + Math.pow(b.longitude - longitude, 2));
    return distA - distB;
  });
};
