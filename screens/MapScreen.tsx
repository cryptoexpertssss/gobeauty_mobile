import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  useSafeAreaInsets,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MapPin, Star } from 'lucide-react-native';
import { professionals } from '../mocks/professionals';

type RootStackParamList = {
  Booking: { professionalId: string };
};

type MapScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Map'>;

export default function MapScreen() {
  const navigation = useNavigation<MapScreenNavigationProp>();
  const insets = useSafeAreaInsets();

  const handleProfessionalPress = (professionalId: string) => {
    navigation.navigate('Booking', { professionalId });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Nearby Professionals</Text>
          <TouchableOpacity style={styles.locationButton}>
            <MapPin color="#FF6B9D" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.mapPlaceholder}>
        <View style={styles.mapOverlay}>
          <Text style={styles.mapText}>Map View</Text>
          <Text style={styles.mapSubtext}>Find professionals near you</Text>
        </View>
        
        {professionals.slice(0, 4).map((prof, index) => (
          <TouchableOpacity
            key={prof.id}
            style={[
              styles.mapMarker,
              {
                top: 20 + (index * 60),
                left: 20 + (index * 80),
              }
            ]}
            onPress={() => handleProfessionalPress(prof.id)}
          >
            <View
              style={[
                styles.markerDot,
                { backgroundColor: prof.available ? '#10B981' : '#EF4444' }
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
      </View>

      <View style={styles.bottomSheet}>
        <View style={styles.bottomSheetHeader}>
          <Text style={styles.bottomSheetTitle}>Nearby Professionals</Text>
        </View>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.professionalsList}
          contentContainerStyle={styles.professionalsContent}
        >
          {professionals.map((professional) => (
            <TouchableOpacity
              key={professional.id}
              style={styles.card}
              onPress={() => handleProfessionalPress(professional.id)}
            >
              <Image
                source={{ uri: professional.image }}
                style={styles.cardImage}
              />
              
              <View style={styles.cardContent}>
                <Text style={styles.cardName}>{professional.name}</Text>
                
                <View style={styles.cardMeta}>
                  <View style={styles.ratingContainer}>
                    <Star color="#FFA500" size={14} fill="#FFA500" />
                    <Text style={styles.ratingText}>{professional.rating}</Text>
                  </View>
                  
                  <View style={styles.distanceContainer}>
                    <MapPin color="#6B7280" size={12} />
                    <Text style={styles.distanceText}>{professional.distance}</Text>
                  </View>
                </View>
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  locationButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#E5E7EB',
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
  },
  mapText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#6B7280',
    marginBottom: 8,
  },
  mapSubtext: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  mapMarker: {
    position: 'absolute',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    maxHeight: 200,
  },
  bottomSheetHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  professionalsList: {
    flex: 1,
  },
  professionalsContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  card: {
    width: 160,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 100,
  },
  cardContent: {
    padding: 12,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  cardMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distanceText: {
    fontSize: 12,
    color: '#6B7280',
  },
});