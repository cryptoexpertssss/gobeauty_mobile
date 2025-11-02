import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';
import { useAppointments, AppointmentStatus } from '../contexts/AppointmentsContext';
import { Calendar, Users, CheckCircle, Clock, XCircle } from 'lucide-react-native';

type RootStackParamList = {
  Profile: undefined;
  Login: undefined;
};

type AdminScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Admin'>;

export default function AdminScreen() {
  const navigation = useNavigation<AdminScreenNavigationProp>();
  const { user } = useAuth();
  const { appointments, updateAppointmentStatus } = useAppointments();
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed'>('all');

  const filteredAppointments = useMemo(() => {
    if (filter === 'all') return appointments;
    return appointments.filter(apt => apt.status === filter);
  }, [appointments, filter]);

  const stats = useMemo(() => {
    const total = appointments.length;
    const pending = appointments.filter(apt => apt.status === 'pending').length;
    const confirmed = appointments.filter(apt => apt.status === 'confirmed').length;
    const completed = appointments.filter(apt => apt.status === 'completed').length;
    
    return [
      { label: 'Total', value: total, color: '#6B7280' },
      { label: 'Pending', value: pending, color: '#F59E0B' },
      { label: 'Confirmed', value: confirmed, color: '#10B981' },
      { label: 'Completed', value: completed, color: '#10B981' },
    ];
  }, [appointments]);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            // Handle logout through auth context
            navigation.replace('Login');
          },
        },
      ]
    );
  };

  const handleStatusUpdate = (id: string, status: AppointmentStatus) => {
    Alert.alert(
      'Update Status',
      `Change appointment status to ${status}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Update',
          onPress: () => updateAppointmentStatus(id, status),
        },
      ]
    );
  };

  const getStatusColor = (status: AppointmentStatus): string => {
    switch (status) {
      case 'pending':
        return '#F59E0B';
      case 'confirmed':
        return '#10B981';
      case 'completed':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const getStatusIcon = (status: AppointmentStatus) => {
    switch (status) {
      case 'pending':
        return <Clock color="#F59E0B" size={16} />;
      case 'confirmed':
        return <CheckCircle color="#10B981" size={16} />;
      case 'completed':
        return <CheckCircle color="#10B981" size={16} />;
      default:
        return <Clock color="#6B7280" size={16} />;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Admin Dashboard</Text>
            <Text style={styles.subtitle}>Manage appointments</Text>
          </View>
          
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={[styles.statValue, { color: stat.color }]}>
                {stat.value}
              </Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.filterContainer}>
          {['all', 'pending', 'confirmed', 'completed'].map((f) => (
            <TouchableOpacity
              key={f}
              style={[
                styles.filterButton,
                filter === f && styles.filterButtonActive
              ]}
              onPress={() => setFilter(f as any)}
            >
              <Text style={[
                styles.filterButtonText,
                filter === f && styles.filterButtonTextActive
              ]}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.appointmentsList}>
          {filteredAppointments.length === 0 ? (
            <View style={styles.emptyState}>
              <Calendar color="#9CA3AF" size={48} />
              <Text style={styles.emptyStateText}>
                No appointments found
              </Text>
            </View>
          ) : (
            filteredAppointments.map((appointment) => (
              <View key={appointment.id} style={styles.appointmentCard}>
                <Image
                  source={{ uri: appointment.professionalImage }}
                  style={styles.professionalImage}
                />
                
                <View style={styles.appointmentInfo}>
                  <View style={styles.appointmentHeader}>
                    <Text style={styles.clientName}>
                      {appointment.clientName}
                    </Text>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: getStatusColor(appointment.status) }
                      ]}
                    >
                      {getStatusIcon(appointment.status)}
                      <Text style={styles.statusText}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Service:</Text>
                    <Text style={styles.detailValue}>{appointment.service}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Date:</Text>
                    <Text style={styles.detailValue}>{appointment.date}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Time:</Text>
                    <Text style={styles.detailValue}>{appointment.time}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Professional:</Text>
                    <Text style={styles.detailValue}>{appointment.professionalName}</Text>
                  </View>

                  {appointment.status === 'pending' && (
                    <View style={styles.actionsContainer}>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.confirmButton]}
                        onPress={() => handleStatusUpdate(appointment.id, 'confirmed')}
                      >
                        <CheckCircle color="#FFFFFF" size={16} />
                        <Text style={styles.actionButtonText}>Confirm</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity
                        style={[styles.actionButton, styles.cancelButton]}
                        onPress={() => handleStatusUpdate(appointment.id, 'cancelled')}
                      >
                        <XCircle color="#FFFFFF" size={16} />
                        <Text style={styles.actionButtonText}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {appointment.status === 'confirmed' && (
                    <View style={styles.actionsContainer}>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.completeButton]}
                        onPress={() => handleStatusUpdate(appointment.id, 'completed')}
                      >
                        <CheckCircle color="#FFFFFF" size={16} />
                        <Text style={styles.actionButtonText}>Complete</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  filterButtonActive: {
    backgroundColor: '#FF6B9D',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
  appointmentsList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 12,
  },
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
  },
  professionalImage: {
    width: '100%',
    height: 150,
  },
  appointmentInfo: {
    padding: 16,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  clientName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    width: 80,
  },
  detailValue: {
    fontSize: 14,
    color: '#1F2937',
    flex: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  confirmButton: {
    backgroundColor: '#10B981',
  },
  cancelButton: {
    backgroundColor: '#EF4444',
  },
  completeButton: {
    backgroundColor: '#10B981',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});