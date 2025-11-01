import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { useAppointments, AppointmentStatus } from '@/contexts/AppointmentsContext';
import { useRouter } from 'expo-router';
import { Calendar, Clock, User, CheckCircle, XCircle, LogOut } from 'lucide-react-native';
import { LOGO_URL } from '@/constants/logo';

export default function AdminScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { logout, isAdmin } = useAuth();
  const { appointments, updateAppointmentStatus } = useAppointments();
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed'>('all');

  const filteredAppointments = filter === 'all' 
    ? appointments 
    : appointments.filter((apt) => apt.status === filter);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/login');
          },
        },
      ]
    );
  };

  const handleStatusUpdate = (id: string, status: AppointmentStatus) => {
    updateAppointmentStatus(id, status);
    Alert.alert('Success', `Appointment ${status}`);
  };

  if (!isAdmin) {
    return (
      <View style={styles.container}>
        <Text>Access Denied</Text>
      </View>
    );
  }

  const stats = [
    { label: 'Total', value: appointments.length, color: '#3B82F6' },
    { label: 'Pending', value: appointments.filter(a => a.status === 'pending').length, color: '#F59E0B' },
    { label: 'Confirmed', value: appointments.filter(a => a.status === 'confirmed').length, color: '#10B981' },
    { label: 'Completed', value: appointments.filter(a => a.status === 'completed').length, color: '#8B5CF6' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top }]}
      >
        <View style={styles.logoContainer}>
          <Image source={{ uri: LOGO_URL }} style={styles.logo} resizeMode="contain" />
        </View>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Admin Panel</Text>
            <Text style={styles.subtitle}>Manage all appointments</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut color="#EF4444" size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIndicator, { backgroundColor: stat.color }]} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.filterContainer}>
          {['all', 'pending', 'confirmed', 'completed'].map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, filter === f && styles.filterChipActive]}
              onPress={() => setFilter(f as typeof filter)}
            >
              <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.appointmentsList}>
          {filteredAppointments.length === 0 ? (
            <View style={styles.emptyState}>
              <Calendar color="#9CA3AF" size={48} />
              <Text style={styles.emptyText}>No appointments found</Text>
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
                    <Text style={styles.serviceName}>{appointment.service}</Text>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: getStatusColor(appointment.status) },
                      ]}
                    >
                      <Text style={styles.statusText}>
                        {appointment.status.toUpperCase()}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.detailRow}>
                    <User color="#6B7280" size={14} />
                    <Text style={styles.detailText}>{appointment.clientName}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Calendar color="#6B7280" size={14} />
                    <Text style={styles.detailText}>{appointment.date}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Clock color="#6B7280" size={14} />
                    <Text style={styles.detailText}>{appointment.time}</Text>
                  </View>

                  <Text style={styles.professionalText}>
                    with {appointment.professionalName}
                  </Text>

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
                    <TouchableOpacity
                      style={[styles.actionButton, styles.completeButton]}
                      onPress={() => handleStatusUpdate(appointment.id, 'completed')}
                    >
                      <CheckCircle color="#FFFFFF" size={16} />
                      <Text style={styles.actionButtonText}>Mark as Completed</Text>
                    </TouchableOpacity>
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

function getStatusColor(status: AppointmentStatus): string {
  switch (status) {
    case 'pending':
      return '#FEF3C7';
    case 'confirmed':
      return '#D1FAE5';
    case 'completed':
      return '#E0E7FF';
    case 'cancelled':
      return '#FEE2E2';
    default:
      return '#F3F4F6';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  logoutButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIndicator: {
    width: 32,
    height: 4,
    borderRadius: 2,
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterChipActive: {
    backgroundColor: '#FF6B9D',
    borderColor: '#FF6B9D',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#6B7280',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  appointmentsList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#9CA3AF',
    marginTop: 16,
  },
  appointmentCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  professionalImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  appointmentInfo: {
    flex: 1,
    marginLeft: 16,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#1F2937',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700' as const,
    color: '#1F2937',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
  },
  professionalText: {
    fontSize: 14,
    color: '#FF6B9D',
    fontWeight: '600' as const,
    marginTop: 6,
    marginBottom: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  confirmButton: {
    backgroundColor: '#10B981',
  },
  cancelButton: {
    backgroundColor: '#EF4444',
  },
  completeButton: {
    backgroundColor: '#8B5CF6',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#FFFFFF',
  },
});
