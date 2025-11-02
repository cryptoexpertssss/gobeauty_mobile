import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { Heart, Star, Clock, DollarSign } from 'lucide-react-native';
import { treatments, categories } from '../mocks/treatments';

export default function TreatmentsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const filteredTreatments = treatments.filter(treatment => 
    selectedCategory === 'all' || treatment.category === selectedCategory
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Treatments</Text>
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

        <View style={styles.treatmentsGrid}>
          {filteredTreatments.map((treatment) => (
            <TouchableOpacity
              key={treatment.id}
              style={styles.treatmentCard}
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
                  color={favorites.includes(treatment.id) ? "#FF6B9D" : "#9CA3AF"}
                  size={20}
                  fill={favorites.includes(treatment.id) ? "#FF6B9D" : "none"}
                />
              </TouchableOpacity>
              
              <View style={styles.treatmentInfo}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>
                    {treatment.category}
                  </Text>
                </View>
                
                <Text style={styles.treatmentName}>{treatment.name}</Text>
                <Text style={styles.treatmentDescription}>
                  {treatment.description}
                </Text>
                
                <View style={styles.treatmentMeta}>
                  <View style={styles.metaItem}>
                    <Clock color="#6B7280" size={14} />
                    <Text style={styles.metaText}>{treatment.duration}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Star color="#FFA500" size={14} fill="#FFA500" />
                    <Text style={styles.metaText}>{treatment.rating}</Text>
                  </View>
                </View>
                
                <View style={styles.priceRow}>
                  <DollarSign color="#10B981" size={16} />
                  <Text style={styles.price}>{treatment.price}</Text>
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
  treatmentsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 16,
    paddingBottom: 20,
  },
  treatmentCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
  },
  treatmentImage: {
    width: '100%',
    height: 120,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  treatmentInfo: {
    padding: 16,
  },
  categoryBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  treatmentName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  treatmentDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  treatmentMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#10B981',
  },
});