import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, Star, MapPin, ChevronRight, Calendar } from 'lucide-react-native';
import { professionals } from '@/mocks/professionals';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { LOGO_URL } from '@/constants/logo';

// Category to specialty keyword mapping
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'Hair': ['hair', 'stylist', 'colorist', 'barber'],
  'Nails': ['nail', 'manicure', 'pedicure'],
  'Makeup': ['makeup', 'mua', 'artist'],
  'Skincare': ['skin', 'facial', 'esthetician', 'dermatologist'],
  'Massage': ['massage', 'therapist', 'spa'],
};

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Hair', 'Nails', 'Makeup', 'Skincare', 'Massage'];

  const filteredProfessionals = useMemo(() => {
    return professionals.filter((prof) => {
      // Apply search filter
      const matchesSearch = searchQuery
        ? prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prof.specialty.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      // Apply category filter
      const matchesCategory = selectedCategory === 'All'
        ? true
        : CATEGORY_KEYWORDS[selectedCategory]?.some(keyword =>
            prof.specialty.toLowerCase().includes(keyword.toLowerCase())
          ) || false;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

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
          <Text style={styles.greeting}>Discover</Text>
          <Text style={styles.title}>Beauty Professionals</Text>
        </View>

        <View style={styles.searchContainer}>
          <Search color="#9CA3AF" size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search professionals or services..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Rated Near You</Text>

          {filteredProfessionals.map((professional) => (
            <TouchableOpacity
              key={professional.id}
              style={styles.professionalCard}
              activeOpacity={0.7}
            >
              <Image
                source={{ uri: professional.image }}
                style={styles.professionalImage}
              />
              <View style={styles.professionalInfo}>
                <Text style={styles.professionalName}>{professional.name}</Text>
                <Text style={styles.professionalSpecialty}>
                  {professional.specialty}
                </Text>

                <View style={styles.professionalMeta}>
                  <View style={styles.ratingContainer}>
                    <Star color="#FFC107" size={14} fill="#FFC107" />
                    <Text style={styles.ratingText}>
                      {professional.rating}
                    </Text>
                    <Text style={styles.reviewsText}>
                      ({professional.reviews})
                    </Text>
                  </View>

                  <View style={styles.locationContainer}>
                    <MapPin color="#9CA3AF" size={14} />
                    <Text style={styles.distanceText}>
                      {professional.distance}
                    </Text>
                  </View>
                </View>

                <View style={styles.servicesContainer}>
                  {professional.services.slice(0, 3).map((service, idx) => (
                    <View key={idx} style={styles.serviceTag}>
                      <Text style={styles.serviceTagText}>{service}</Text>
                    </View>
                  ))}
                </View>

                {user && (
                  <TouchableOpacity
                    style={styles.bookButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      router.push({
                        pathname: '/booking',
                        params: { professionalId: professional.id },
                      });
                    }}
                  >
                    <Calendar color="#FFFFFF" size={16} />
                    <Text style={styles.bookButtonText}>Book Now</Text>
                  </TouchableOpacity>
                )}
              </View>

              <ChevronRight color="#9CA3AF" size={20} />
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: '#1F2937',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryChipActive: {
    backgroundColor: '#FF6B9D',
    borderColor: '#FF6B9D',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#6B7280',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  section: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#1F2937',
    marginBottom: 16,
  },
  professionalCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
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
  professionalInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  professionalName: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#1F2937',
    marginBottom: 4,
  },
  professionalSpecialty: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  professionalMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 16,
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
  reviewsText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distanceText: {
    fontSize: 14,
    color: '#6B7280',
  },
  servicesContainer: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  serviceTag: {
    backgroundColor: '#FFF1F7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  serviceTagText: {
    fontSize: 12,
    color: '#FF6B9D',
    fontWeight: '500' as const,
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B9D',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginTop: 12,
    gap: 6,
  },
  bookButtonText: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: '#FFFFFF',
  },
});
