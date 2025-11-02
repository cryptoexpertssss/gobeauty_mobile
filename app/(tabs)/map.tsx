import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MapPin, Star, Navigation } from 'lucide-react-native';
import { professionals } from '@/mocks/professionals';
import { LOGO_IMAGE } from '@/constants/logo';

const { width } = Dimensions.get('window');

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const [selectedProfessional, setSelectedProfessional] = useState(
    professionals[0]
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <View style={styles.logoContainer}>
          <Image source={LOGO_IMAGE} style={styles.logo} resizeMode="contain" />
        </View>
      </View>
      <View style={styles.headerContent}>
        <Text style={styles.title}>Find Nearby</Text>
        <TouchableOpacity style={styles.locationButton}>
          <Navigation color="#FF6B9D" size={20} />
          <Text style={styles.locationText}>San Francisco</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mapPlaceholder}>
        <View style={styles.mapOverlay}>
          <MapPin color="#FFFFFF" size={48} />
          <Text style={styles.mapText}>Map View</Text>
          <Text style={styles.mapSubtext}>
            Interactive map coming soon
          </Text>
        </View>

        {professionals.slice(0, 4).map((prof, index) => (
          <TouchableOpacity
            key={prof.id}
            style={[
              styles.mapMarker,
              {
                top: 100 + index * 80,
                left: 50 + index * 60,
              },
            ]}
            onPress={() => setSelectedProfessional(prof)}
          >
            <View
              style={[
                styles.markerDot,
                selectedProfessional.id === prof.id && styles.markerDotActive,
              ]}
            >
              <MapPin
                color={
                  selectedProfessional.id === prof.id ? '#FFFFFF' : '#FF6B9D'
                }
                size={16}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.bottomSheet}>
        <View style={styles.handle} />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsContainer}
        >
          {professionals.map((professional) => (
            <TouchableOpacity
              key={professional.id}
              style={[
                styles.professionalCard,
                selectedProfessional.id === professional.id &&
                  styles.professionalCardActive,
              ]}
              onPress={() => setSelectedProfessional(professional)}
              activeOpacity={0.9}
            >
              <Image
                source={{ uri: professional.image }}
                style={styles.professionalImage}
              />
              <View style={styles.cardContent}>
                <Text style={styles.professionalName} numberOfLines={1}>
                  {professional.name}
                </Text>
                <Text style={styles.professionalSpecialty} numberOfLines={1}>
                  {professional.specialty}
                </Text>

                <View style={styles.cardMeta}>
                  <View style={styles.ratingContainer}>
                    <Star color="#FFC107" size={12} fill="#FFC107" />
                    <Text style={styles.ratingText}>{professional.rating}</Text>
                  </View>

                  <View style={styles.distanceContainer}>
                    <MapPin color="#9CA3AF" size={12} />
                    <Text style={styles.distanceText}>
                      {professional.distance}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.bookButton}>
                  <Text style={styles.bookButtonText}>Book Now</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 180,
    height: 60,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: '#1F2937',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFF1F7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#FF6B9D',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    position: 'relative',
  },
  mapOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(100, 180, 100, 0.1)',
  },
  mapText: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#4A5568',
    marginTop: 16,
  },
  mapSubtext: {
    fontSize: 14,
    color: '#718096',
    marginTop: 8,
  },
  mapMarker: {
    position: 'absolute',
    zIndex: 10,
  },
  markerDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  markerDotActive: {
    backgroundColor: '#FF6B9D',
    transform: [{ scale: 1.2 }],
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  cardsContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  professionalCard: {
    width: width * 0.7,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#F3F4F6',
  },
  professionalCardActive: {
    borderColor: '#FF6B9D',
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  professionalImage: {
    width: '100%',
    height: 140,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    marginBottom: 12,
  },
  cardContent: {
    gap: 8,
  },
  professionalName: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#1F2937',
  },
  professionalSpecialty: {
    fontSize: 14,
    color: '#6B7280',
  },
  cardMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#1F2937',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distanceText: {
    fontSize: 14,
    color: '#6B7280',
  },
  bookButton: {
    backgroundColor: '#FF6B9D',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  bookButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#FFFFFF',
  },
});
