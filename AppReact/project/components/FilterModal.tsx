import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { X } from 'lucide-react-native';
import MultiSlider from '@/components/MultiSlider';

interface FilterModalProps {
  visible: boolean;
  filters: {
    priceRange: [number, number];
    brands: string[];
    sortBy: string;
  };
  onClose: () => void;
  onApply: (filters: any) => void;
}

const brands = [
  'Apple', 'Samsung', 'Xiaomi', 'Sony', 'JBL', 'Anker',
  'Belkin', 'Logitech', 'Sennheiser', 'Bose'
];

const sortOptions = [
  { id: 'popularity', label: 'Popularité' },
  { id: 'price_asc', label: 'Prix croissant' },
  { id: 'price_desc', label: 'Prix décroissant' },
  { id: 'newest', label: 'Nouveautés' }
];

const FilterModal: React.FC<FilterModalProps> = ({ visible, filters, onClose, onApply }) => {
  const [tempFilters, setTempFilters] = useState(filters);

  const toggleBrand = (brand: string) => {
    const updatedBrands = [...tempFilters.brands];
    const index = updatedBrands.indexOf(brand);
    
    if (index > -1) {
      updatedBrands.splice(index, 1);
    } else {
      updatedBrands.push(brand);
    }
    
    setTempFilters({
      ...tempFilters,
      brands: updatedBrands
    });
  };

  const handlePriceChange = (values: [number, number]) => {
    setTempFilters({
      ...tempFilters,
      priceRange: values
    });
  };

  const handleSortChange = (sortOption: string) => {
    setTempFilters({
      ...tempFilters,
      sortBy: sortOption
    });
  };

  const resetFilters = () => {
    setTempFilters({
      priceRange: [0, 1000],
      brands: [],
      sortBy: 'popularity'
    });
  };

  const applyFilters = () => {
    onApply(tempFilters);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Filtres</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#000000" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.filtersContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Prix</Text>
              <View style={styles.priceRangeContainer}>
                <Text style={styles.priceLabel}>{tempFilters.priceRange[0]} €</Text>
                <Text style={styles.priceLabel}>{tempFilters.priceRange[1]} €</Text>
              </View>
              <MultiSlider
                values={tempFilters.priceRange}
                min={0}
                max={1000}
                step={10}
                onValuesChange={handlePriceChange}
                trackStyle={{ backgroundColor: '#E5E5EA', height: 4 }}
                selectedStyle={{ backgroundColor: '#0066CC' }}
                markerStyle={{ backgroundColor: '#0066CC', width: 20, height: 20 }}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Marques</Text>
              <View style={styles.brandsContainer}>
                {brands.map((brand) => (
                  <TouchableOpacity
                    key={brand}
                    style={[
                      styles.brandChip,
                      tempFilters.brands.includes(brand) && styles.selectedBrandChip
                    ]}
                    onPress={() => toggleBrand(brand)}
                  >
                    <Text
                      style={[
                        styles.brandChipText,
                        tempFilters.brands.includes(brand) && styles.selectedBrandChipText
                      ]}
                    >
                      {brand}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Trier par</Text>
              <View style={styles.sortContainer}>
                {sortOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.sortOption,
                      tempFilters.sortBy === option.id && styles.selectedSortOption
                    ]}
                    onPress={() => handleSortChange(option.id)}
                  >
                    <Text
                      style={[
                        styles.sortOptionText,
                        tempFilters.sortBy === option.id && styles.selectedSortOptionText
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={resetFilters}
            >
              <Text style={styles.resetButtonText}>Réinitialiser</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={applyFilters}
            >
              <Text style={styles.applyButtonText}>Appliquer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  priceRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666666',
  },
  brandsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  brandChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#F5F5F7',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedBrandChip: {
    backgroundColor: '#0066CC',
  },
  brandChipText: {
    fontSize: 14,
    color: '#000000',
  },
  selectedBrandChipText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  sortContainer: {
    flexDirection: 'column',
  },
  sortOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#F5F5F7',
  },
  selectedSortOption: {
    backgroundColor: '#0066CC',
  },
  sortOptionText: {
    fontSize: 14,
    color: '#000000',
  },
  selectedSortOptionText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  resetButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#8E8E93',
    borderRadius: 8,
    marginRight: 8,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#8E8E93',
  },
  applyButton: {
    flex: 2,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0066CC',
    borderRadius: 8,
    marginLeft: 8,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default FilterModal;