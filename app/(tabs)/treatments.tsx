import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Heart, Clock, TrendingUp, ChevronRight } from 'lucide-react-native';
import { treatments, categories } from '@/mocks/treatments';
import { LOGO_URL } from '@/constants/logo';

export default function TreatmentsScreen() {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState<string[]>([]);

  const filteredTreatments = treatments.filter((treatment) =>
    selectedCategory === 'All' ? true : treatment.category === selectedCategory
  );

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

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
          <Text style={styles.title}>Beauty Treatments</Text>
          <Text style={styles.subtitle}>
            Discover over 100+ treatments with detailed information
          </Text>
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

        <View style={styles.treatmentsGrid}>
          {filteredTreatments.map((treatment) => (
            <TouchableOpacity
              key={treatment.id}
              style={styles.treatmentCard}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: treatment.image }}
                style={styles.treatmentImage}
              />

              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => toggleFavorite(treatment.id)}
              >
                <Heart
                  color={favorites.includes(treatment.id) ? '#FF6B9D' : '#FFFFFF'}
                  size={20}
                  fill={favorites.includes(treatment.id) ? '#FF6B9D' : 'transparent'}
                />
              </TouchableOpacity>

              <View style={styles.treatmentInfo}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>
                    {treatment.category}
                  </Text>
                </View>

                <Text style={styles.treatmentName}>{treatment.name}</Text>
                <Text style={styles.treatmentDescription} numberOfLines={2}>
                  {treatment.description}
                </Text>

                <View style={styles.treatmentMeta}>
                  <View style={styles.metaItem}>
                    <Clock color="#6B7280" size={14} />
                    <Text style={styles.metaText}>{treatment.duration}</Text>
                  </View>

                  <View style={styles.metaItem}>
                    <TrendingUp color="#10B981" size={14} />
                    <Text style={styles.metaText}>{treatment.popularity}%</Text>
                  </View>
                </View>

                <View style={styles.priceRow}>
                  <Text style={styles.priceText}>{treatment.priceRange}</Text>
                  <ChevronRight color="#9CA3AF" size={18} />
                </View>
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
  title: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
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
  treatmentsGrid: {
    paddingHorizontal: 20,
    gap: 16,
  },
  treatmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  treatmentImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#F3F4F6',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  treatmentInfo: {
    padding: 16,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF1F7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: '#FF6B9D',
  },
  treatmentName: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#1F2937',
    marginBottom: 8,
  },
  treatmentDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  treatmentMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    color: '#6B7280',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#FF6B9D',
  },
});
