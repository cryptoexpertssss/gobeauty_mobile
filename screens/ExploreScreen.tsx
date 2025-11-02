import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';
import { Star, MapPin, Heart } from 'lucide-react-native';
import { professionals } from '../mocks/professionals';
import { categories } from '../mocks/treatments';

type RootStackParamList = {
  Booking: { professionalId: string };
  Profile: undefined;
};

type ExploreScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Explore'>;

export default function ExploreScreen() {
  const navigation = useNavigation<ExploreScreenNavigationProp>();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProfessionals = useMemo(() => {
    return professionals.filter((prof) => {
      const matchesSearch = prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           prof.services.some(service => 
                             service.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || 
                           prof.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleProfessionalPress = (professionalId: string) => {
    if (user) {
      navigation.navigate('Booking', { professionalId });
    } else {
      Alert.alert('Login Required', 'Please login to book an appointment');
    }
  };

  const handleProfilePress = (e: any) => {
    if (!user) {
      e.stopPropagation();
      Alert.alert('Login Required', 'Please login to view profiles');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Discover Professionals</Text>
          
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search professionals or services..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                selectedCategory === category.id && styles.categoryChipActive
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={[
                styles.categoryChipText,
                selectedCategory === category.id && styles.categoryChipTextActive
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.section}>
          {filteredProfessionals.map((professional) => (
            <TouchableOpacity
              key={professional.id}
              style={styles.professionalCard}
              onPress={() => handleProfessionalPress(professional.id)}
            >
              <Image
                source={{ uri: professional.image }}
                style={styles.professionalImage}
              />
              
              <View style={styles.professionalInfo}>
                <View style={styles.professionalHeader}>
                  <Text style={styles.professionalName}>
                    {professional.name}
                  </Text>
                  <View style={styles.ratingContainer}>
                    <Star color="#FFA500" size={16} fill="#FFA500" />
                    <Text style={styles.ratingText}>
                      {professional.rating}
                    </Text>
                  </View>
                </View>

                <Text style={styles.professionalTitle}>
                  {professional.title}
                </Text>

                <View style={styles.professionalMeta}>
                  <View style={styles.locationContainer}>
                    <MapPin color="#6B7280" size={14} />
                    <Text style={styles.locationText}>
                      {professional.location}
                    </Text>
                  </View>
                </View>

                <View style={styles.servicesContainer}>
                  {professional.services.slice(0, 3).map((service, idx) => (
                    <View key={idx} style={styles.serviceChip}>
                      <Text style={styles.serviceText}>{service}</Text>
                    </View>
                  ))}
                  {professional.services.length > 3 && (
                    <Text style={styles.moreServicesText}>
                      +{professional.services.length - 3} more
                    </Text>
                  )}
                </View>

                {user && (
                  <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      // Handle favorite toggle
                    }}
                  >
                    <Heart color="#FF6B9D" size={20} />
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          ))}
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
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: {
    fontSize: 16,
    color: '#1F2937',
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryChip: {
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
  categoryChipActive: {
    backgroundColor: '#FF6B9D',
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  section: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  professionalCard: {
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
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  professionalInfo: {
    padding: 16,
  },
  professionalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  professionalName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  professionalTitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  professionalMeta: {
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  serviceChip: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  serviceText: {
    fontSize: 12,
    color: '#6B7280',
  },
  moreServicesText: {
    fontSize: 12,
    color: '#FF6B9D',
    fontWeight: '600',
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});