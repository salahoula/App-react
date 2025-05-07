import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { searchProducts } from '@/services/api';
import ProductCard from '@/components/ProductCard';
import { Filter, X } from 'lucide-react-native';
import FilterModal from '@/components/FilterModal';

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    brands: [],
    sortBy: 'popularity',
  });

  const performSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const results = await searchProducts(searchQuery, filters);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToProduct = (productId) => {
    router.push(`/product/${productId}`);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    setShowFilters(false);
    performSearch();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher des accessoires..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={performSearch}
            returnKeyType="search"
          />
          {searchQuery ? (
            <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
              <X size={20} color="#8E8E93" />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity 
            style={styles.filterButton} 
            onPress={() => setShowFilters(true)}
          >
            <Filter size={20} color="#0066CC" />
          </TouchableOpacity>
        </View>

        {searchResults.length > 0 ? (
          <FlatList
            data={searchResults}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.productCardContainer}>
                <ProductCard
                  product={item}
                  onPress={() => navigateToProduct(item.id)}
                />
              </View>
            )}
            contentContainerStyle={styles.resultsContainer}
          />
        ) : (
          <View style={styles.emptyState}>
            {isLoading ? (
              <Text style={styles.emptyStateText}>Recherche en cours...</Text>
            ) : searchQuery ? (
              <Text style={styles.emptyStateText}>Aucun résultat trouvé pour "{searchQuery}"</Text>
            ) : (
              <Text style={styles.emptyStateText}>Recherchez des accessoires par nom, marque ou catégorie</Text>
            )}
          </View>
        )}

        <FilterModal
          visible={showFilters}
          filters={filters}
          onClose={() => setShowFilters(false)}
          onApply={applyFilters}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F7',
    fontSize: 16,
  },
  clearButton: {
    position: 'absolute',
    right: 58,
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButton: {
    marginLeft: 8,
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#F5F5F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsContainer: {
    paddingBottom: 16,
  },
  productCardContainer: {
    width: '50%',
    padding: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 24,
  },
});