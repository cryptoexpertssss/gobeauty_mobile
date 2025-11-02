import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useAppointments } from '@/contexts/AppointmentsContext';
import { professionals } from '@/mocks/professionals';
import { Calendar, Clock, AlignLeft } from 'lucide-react-native';
import { LOGO_IMAGE } from '@/constants/logo';

export default function BookingScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const { bookAppointment } = useAppointments();

  const professionalId = params.professionalId as string;
  const professional = professionals.find((p) => p.id === professionalId);

  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');

  const availableTimes = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
  ];

  const getNextDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        fullDate: date.toISOString().split('T')[0],
      });
    }
    return days;
  };

  const nextDays = getNextDays();

  const handleBooking = async () => {
    if (!selectedService || !selectedDate || !selectedTime) {
      Alert.alert('Error', 'Please select service, date, and time');
      return;
    }

    if (!user) {
      Alert.alert('Error', 'Please login to book an appointment');
      return;
    }

    try {
      await bookAppointment({
        clientId: user.id,
        clientName: user.name,
        clientEmail: user.email,
        professionalId: professional?.id || '',
        professionalName: professional?.name || '',
        professionalImage: professional?.image || '',
        service: selectedService,
        date: selectedDate,
        time: selectedTime,
        notes,
      });

      Alert.alert(
        'Success!',
        'Your appointment has been booked. You will receive a confirmation shortly.',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to book appointment. Please try again.');
    }
  };

  if (!professional) {
    return (
      <View style={styles.container}>
        <Text>Professional not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.logoContainer}>
        <Image source={LOGO_IMAGE} style={styles.logo} resizeMode="contain" />
      </View>
      <View style={styles.professionalSection}>
        <Image source={{ uri: professional.image }} style={styles.professionalImage} />
        <View style={styles.professionalInfo}>
          <Text style={styles.professionalName}>{professional.name}</Text>
          <Text style={styles.professionalSpecialty}>{professional.specialty}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Select Service</Text>
        </View>
        <View style={styles.servicesGrid}>
          {professional.services.map((service) => (
            <TouchableOpacity
              key={service}
              style={[
                styles.serviceChip,
                selectedService === service && styles.serviceChipActive,
              ]}
              onPress={() => setSelectedService(service)}
            >
              <Text
                style={[
                  styles.serviceText,
                  selectedService === service && styles.serviceTextActive,
                ]}
              >
                {service}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Calendar color="#FF6B9D" size={20} />
          <Text style={styles.sectionTitle}>Select Date</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.datesContainer}
        >
          {nextDays.map((day) => (
            <TouchableOpacity
              key={day.fullDate}
              style={[
                styles.dateChip,
                selectedDate === day.fullDate && styles.dateChipActive,
              ]}
              onPress={() => setSelectedDate(day.fullDate)}
            >
              <Text
                style={[
                  styles.dateLabel,
                  selectedDate === day.fullDate && styles.dateLabelActive,
                ]}
              >
                {day.label}
              </Text>
              <Text
                style={[
                  styles.dateText,
                  selectedDate === day.fullDate && styles.dateTextActive,
                ]}
              >
                {day.date}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Clock color="#FF6B9D" size={20} />
          <Text style={styles.sectionTitle}>Select Time</Text>
        </View>
        <View style={styles.timesGrid}>
          {availableTimes.map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeChip,
                selectedTime === time && styles.timeChipActive,
              ]}
              onPress={() => setSelectedTime(time)}
            >
              <Text
                style={[
                  styles.timeText,
                  selectedTime === time && styles.timeTextActive,
                ]}
              >
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <AlignLeft color="#FF6B9D" size={20} />
          <Text style={styles.sectionTitle}>Additional Notes (Optional)</Text>
        </View>
        <TextInput
          style={styles.notesInput}
          placeholder="Any special requests or notes..."
          placeholderTextColor="#9CA3AF"
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
        <Text style={styles.bookButtonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  logo: {
    width: 180,
    height: 60,
  },
  professionalSection: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  professionalImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
  },
  professionalInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  professionalName: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#1F2937',
    marginBottom: 6,
  },
  professionalSpecialty: {
    fontSize: 16,
    color: '#6B7280',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#1F2937',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  serviceChip: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  serviceChipActive: {
    backgroundColor: '#FFF1F7',
    borderColor: '#FF6B9D',
  },
  serviceText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#6B7280',
  },
  serviceTextActive: {
    color: '#FF6B9D',
  },
  datesContainer: {
    gap: 12,
  },
  dateChip: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    minWidth: 100,
  },
  dateChipActive: {
    backgroundColor: '#FF6B9D',
    borderColor: '#FF6B9D',
  },
  dateLabel: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  dateLabelActive: {
    color: '#FFFFFF',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#1F2937',
  },
  dateTextActive: {
    color: '#FFFFFF',
  },
  timesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeChip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  timeChipActive: {
    backgroundColor: '#FF6B9D',
    borderColor: '#FF6B9D',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#6B7280',
  },
  timeTextActive: {
    color: '#FFFFFF',
  },
  notesInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    minHeight: 120,
  },
  bookButton: {
    backgroundColor: '#FF6B9D',
    marginHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  bookButtonText: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#FFFFFF',
  },
});
