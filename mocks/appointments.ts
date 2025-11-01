export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  professionalId: string;
  professionalName: string;
  professionalImage: string;
  service: string;
  date: string;
  time: string;
  duration: string;
  price: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export const mockAppointments: Appointment[] = [
  {
    id: 'apt_001',
    clientId: 'client_001',
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah.j@email.com',
    clientPhone: '+1 (555) 123-4567',
    professionalId: '1',
    professionalName: 'Isabella Santos',
    professionalImage: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400',
    service: 'Balayage Hair Color',
    date: '2025-01-15',
    time: '02:00 PM',
    duration: '2-3 hours',
    price: '$250',
    status: 'confirmed',
    notes: 'First time balayage, natural highlights preferred',
    createdAt: '2025-01-10T10:30:00Z',
  },
  {
    id: 'apt_002',
    clientId: 'client_002',
    clientName: 'Emily Chen',
    clientEmail: 'emily.chen@email.com',
    clientPhone: '+1 (555) 234-5678',
    professionalId: '3',
    professionalName: 'Sophie Chen',
    professionalImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
    service: 'Gel Manicure',
    date: '2025-01-16',
    time: '04:30 PM',
    duration: '45-60 minutes',
    price: '$45',
    status: 'pending',
    notes: 'Prefer pastel colors',
    createdAt: '2025-01-11T14:20:00Z',
  },
  {
    id: 'apt_003',
    clientId: 'client_003',
    clientName: 'Jessica Martinez',
    clientEmail: 'jess.m@email.com',
    clientPhone: '+1 (555) 345-6789',
    professionalId: '2',
    professionalName: 'Maria Rodriguez',
    professionalImage: 'https://images.unsplash.com/photo-1598257006458-087169a1f08d?w=400',
    service: 'Bridal Makeup',
    date: '2025-01-20',
    time: '10:00 AM',
    duration: '1.5-2 hours',
    price: '$180',
    status: 'confirmed',
    notes: 'Wedding on Jan 21st, trial session',
    createdAt: '2025-01-08T09:15:00Z',
  },
  {
    id: 'apt_004',
    clientId: 'client_004',
    clientName: 'Amanda Brooks',
    clientEmail: 'amanda.b@email.com',
    clientPhone: '+1 (555) 456-7890',
    professionalId: '4',
    professionalName: 'Emma Johnson',
    professionalImage: 'https://images.unsplash.com/photo-1559250404-b4ee645cf82a?w=400',
    service: 'Hydrafacial',
    date: '2025-01-18',
    time: '11:00 AM',
    duration: '45-60 minutes',
    price: '$200',
    status: 'confirmed',
    notes: 'Sensitive skin, avoid harsh products',
    createdAt: '2025-01-09T16:45:00Z',
  },
  {
    id: 'apt_005',
    clientId: 'client_005',
    clientName: 'Rachel Green',
    clientEmail: 'rachel.g@email.com',
    clientPhone: '+1 (555) 567-8901',
    professionalId: '5',
    professionalName: 'Olivia Martinez',
    professionalImage: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400',
    service: 'Lash Extensions',
    date: '2025-01-17',
    time: '01:00 PM',
    duration: '1.5-2 hours',
    price: '$150',
    status: 'pending',
    notes: 'Classic style, natural look',
    createdAt: '2025-01-10T11:30:00Z',
  },
  {
    id: 'apt_006',
    clientId: 'client_006',
    clientName: 'Monica Geller',
    clientEmail: 'monica.g@email.com',
    clientPhone: '+1 (555) 678-9012',
    professionalId: '6',
    professionalName: 'Ava Thompson',
    professionalImage: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400',
    service: 'Deep Tissue Massage',
    date: '2025-01-14',
    time: '03:00 PM',
    duration: '60 minutes',
    price: '$120',
    status: 'completed',
    notes: 'Focus on back and shoulders',
    createdAt: '2025-01-07T13:20:00Z',
  },
  {
    id: 'apt_007',
    clientId: 'client_007',
    clientName: 'Phoebe Buffay',
    clientEmail: 'phoebe.b@email.com',
    clientPhone: '+1 (555) 789-0123',
    professionalId: '1',
    professionalName: 'Isabella Santos',
    professionalImage: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400',
    service: 'Haircut & Styling',
    date: '2025-01-19',
    time: '09:00 AM',
    duration: '1 hour',
    price: '$80',
    status: 'pending',
    notes: 'Long layers, keep the length',
    createdAt: '2025-01-12T10:00:00Z',
  },
  {
    id: 'apt_008',
    clientId: 'client_008',
    clientName: 'Lisa Anderson',
    clientEmail: 'lisa.a@email.com',
    clientPhone: '+1 (555) 890-1234',
    professionalId: '3',
    professionalName: 'Sophie Chen',
    professionalImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
    service: 'Acrylic Nails',
    date: '2025-01-21',
    time: '02:30 PM',
    duration: '1.5 hours',
    price: '$65',
    status: 'confirmed',
    notes: 'French tips design',
    createdAt: '2025-01-11T15:40:00Z',
  },
];

export const getAppointmentsByClientId = (clientId: string) => {
  return mockAppointments.filter(apt => apt.clientId === clientId);
};

export const getAppointmentsByStatus = (status: Appointment['status']) => {
  return mockAppointments.filter(apt => apt.status === status);
};

export const getUpcomingAppointments = () => {
  const today = new Date();
  return mockAppointments
    .filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate >= today && (apt.status === 'pending' || apt.status === 'confirmed');
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};
