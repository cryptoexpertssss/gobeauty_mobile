import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';
import { useAppointments } from '../contexts/AppointmentsContext';
import { Calendar, Clock, User, MapPin } from 'lucide-react-native';
import { professionals } from '../mocks/professionals';

type RootStackParamList = {
  Main: undefined;
};

type BookingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Booking'>;
type BookingScreenRouteProp = {
  params: {
    professionalId?: string;
  };
};

export default function BookingScreen() {
  const navigation = useNavigation<BookingScreenNavigationProp>();
  const route = useRoute<BookingScreenRouteProp>();
  const { user } = useAuth();
  const { bookAppointment } = useAppointments();
  
  const professionalId = route.params?.professionalId;
  const [selectedProfessional, setSelectedProfessional] = useState(
    professionals.find(p => p.id === professionalId) || professionals[0]
  );
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');

  const nextDays = useMemo(() => {
    const days = [];
    const today = new Date();
    
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        date: date.toLocaleDateString(),
        dayName: date.toLocaleDateString('en', { weekday: 'short' }),
        dayNumber: date.getDate(),
      });
    }
    
    return days;
  }, []);

  const availableTimes = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const handleBooking = async () => {
    if (!user) {
      Alert.alert('Error', 'Please login to book an appointment');
      return;
    }

    if (!selectedService || !selectedDate || !selectedTime) {
      Alert.alert('Error', 'Please select service, date, and time');
      return;
    }

    try {
      await bookAppointment({
        clientId: user.id,
        clientName: user.name,
        professionalId: selectedProfessional.id,
        professionalName: selectedProfessional.name,
        professionalImage: selectedProfessional.image,
        service: selectedService,
        date: selectedDate,
        time: selectedTime,
        notes,
        status: 'pending',
        createdAt: new Date().toISOString(),
      });

      Alert.alert('Success', 'Appointment booked successfully!');
      navigation.replace('Main');
    } catch (error) {
      Alert.alert('Error', 'Failed to book appointment');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.professionalSection}>
        <View style={styles.professionalInfo}>
          <Text style={styles.professionalName}>
            {selectedProfessional.name}
          </Text>
          <Text style={styles.professionalTitle}>
            {selectedProfessional.title}
          </Text>
          <Text style={styles.professionalRating}>
            ⭐ {selectedProfessional.rating} • {selectedProfessional.location}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Select Service</Text>
        </View>
        <View style={styles.servicesGrid}>
          {selectedProfessional.services.map((service) => (
            <TouchableOpacity
              key={service}
              style={[
                styles.serviceChip,
                selectedService === service && styles.serviceChipSelected
              ]}
              onPress={() => setSelectedService(service)}
            >
              <Text style={[
                styles.serviceText,
                selectedService === service && styles.serviceTextSelected
              ]}>
                {service}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Select Date</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.datesContainer}
          contentContainerStyle={styles.datesContent}
        >
          {nextDays.map((day) => (
            <TouchableOpacity
              key={day.date}
              style={[
                styles.dateChip,
                selectedDate === day.date && styles.dateChipSelected
              ]}
              onPress={() => setSelectedDate(day.date)}
            >
              <Text style={[
                styles.dateDayName,
                selectedDate === day.date && styles.dateDayNameSelected
              ]}>
                {day.dayName}
              </Text>
              <Text style={[
                styles.dateDayNumber,
                selectedDate === day.date && styles.dateDayNumberSelected
              ]}>
                {day.dayNumber}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Select Time</Text>
        </View>
        <View style={styles.timesGrid}>
          {availableTimes.map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeChip,
                selectedTime === time && styles.timeChipSelected
              ]}
              onPress={() => setSelectedTime(time)}
            >
              <Text style={[
                styles.timeText,
                selectedTime === time && styles.timeTextSelected
              ]}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Additional Notes</Text>
        </View>
        <TextInput
          style={styles.notesInput}
          placeholder="Any special requests or notes..."
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>

      <TouchableOpacity
        style={[
          styles.bookButton,
          (!selectedService || !selectedDate || !selectedTime) && styles.bookButtonDisabled
        ]}
        onPress={handleBooking}
        disabled={!selectedService || !selectedDate || !selectedTime}
      >
        <Text style={styles.bookButtonText}>Book Appointment</Text>
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
    padding: 20,
  },
  professionalSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  professionalInfo: {
    alignItems: 'center',
  },
  professionalName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  professionalTitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  professionalRating: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  serviceChip: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  serviceChipSelected: {
    backgroundColor: '#FF6B9D',
    borderColor: '#FF6B9D',
  },
  serviceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  serviceTextSelected: {
    color: '#FFFFFF',
  },
  datesContainer: {
    marginBottom: 12,
  },
  datesContent: {
    gap: 12,
  },
  dateChip: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    minWidth: 60,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  dateChipSelected: {
    backgroundColor: '#FF6B9D',
    borderColor: '#FF6B9D',
  },
  dateDayName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  dateDayNameSelected: {
    color: '#FFFFFF',
  },
  dateDayNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  dateDayNumberSelected: {
    color: '#FFFFFF',
  },
  timesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeChip: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    minWidth: 80,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  timeChipSelected: {
    backgroundColor: '#FF6B9D',
    borderColor: '#FF6B9D',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  timeTextSelected: {
    color: '#FFFFFF',
  },
  notesInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    textAlignVertical: 'top',
  },
  bookButton: {
    backgroundColor: '#FF6B9D',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  bookButtonDisabled: {
    backgroundColor: '#D1D5DB',
    shadowOpacity: 0,
    elevation: 0,
  },
  bookButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});