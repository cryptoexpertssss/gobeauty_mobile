import React, { useState, useEffect } from 'react';
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
import { useAppointments } from '../contexts/AppointmentsContext';
import { Settings, LogOut, Calendar, User, ChevronRight } from 'lucide-react-native';

type RootStackParamList = {
  Booking: { professionalId: string };
  Login: undefined;
};

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { user, logout } = useAuth();
  const { getUpcomingAppointments } = useAppointments();
  const [upcomingBookings, setUpcomingBookings] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      const bookings = getUpcomingAppointments(user.id);
      setUpcomingBookings(bookings);
    }
  }, [user, getUpcomingAppointments]);

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
            await logout();
            navigation.replace('Login');
          },
        },
      ]
    );
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <View style={styles.loginPrompt}>
          <Text style={styles.loginPromptText}>
            Please login to view your profile
          </Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.replace('Login')}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const isAdmin = user.role === 'admin';
  const stats = [
    { label: 'Bookings', value: upcomingBookings.length },
    { label: 'Favorites', value: 12 },
    { label: 'Reviews', value: 8 },
  ];

  const menuItems = [
    { icon: Calendar, label: 'My Bookings', onPress: () => {} },
    { icon: User, label: 'Edit Profile', onPress: () => {} },
    { icon: Settings, label: 'Settings', onPress: () => {} },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: user.avatar || 'https://via.placeholder.com/80' }}
                style={styles.avatar}
              />
            </View>
            
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              
              {isAdmin && (
                <View style={styles.adminBadge}>
                  <Text style={styles.adminBadgeText}>Admin</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {isAdmin && (
            <TouchableOpacity
              style={styles.adminButton}
              onPress={() => navigation.navigate('Admin')}
            >
              <Text style={styles.adminButtonText}>Admin Dashboard</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Bookings</Text>
          </View>
          
          {upcomingBookings.length === 0 && (
            <View style={styles.emptyBookings}>
              <Text style={styles.emptyBookingsText}>
                No upcoming bookings
              </Text>
            </View>
          )}
          
          {upcomingBookings.map((booking) => (
            <TouchableOpacity
              key={booking.id}
              style={styles.bookingCard}
              onPress={() => {}}
            >
              <Image
                source={{ uri: booking.professionalImage }}
                style={styles.bookingImage}
              />
              
              <View style={styles.bookingInfo}>
                <Text style={styles.bookingTitle}>
                  {booking.service}
                </Text>
                <Text style={styles.bookingProfessional}>
                  {booking.professionalName}
                </Text>
                
                <View style={styles.bookingDateContainer}>
                  <Text style={styles.bookingDate}>
                    {booking.date}
                  </Text>
                  <Text style={styles.bookingTime}>
                    {booking.time}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <item.icon color="#6B7280" size={20} />
                <Text style={styles.menuItemText}>{item.label}</Text>
              </View>
              <View style={styles.menuItemRight}>
                <ChevronRight color="#9CA3AF" size={20} />
              </View>
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <LogOut color="#EF4444" size={20} />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
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
  loginPrompt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loginPromptText: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: '#FF6B9D',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  adminBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  adminBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  adminButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 16,
  },
  adminButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  emptyBookings: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyBookingsText: {
    fontSize: 16,
    color: '#6B7280',
  },
  bookingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  bookingImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  bookingProfessional: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  bookingDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bookingDate: {
    fontSize: 14,
    color: '#FF6B9D',
    fontWeight: '600',
  },
  bookingTime: {
    fontSize: 14,
    color: '#6B7280',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: '#1F2937',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#EF4444',
    fontWeight: '600',
  },
});