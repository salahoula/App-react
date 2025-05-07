import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { fetchCategories, fetchFeaturedProducts } from '@/services/api';
import ProductCard from '@/components/ProductCard';
import CategoryButton from '@/components/CategoryButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingState from '@/components/LoadingState';

export default function HomeScreen() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const categoriesData = await fetchCategories();
        const productsData = await fetchFeaturedProducts();
        
        setCategories(categoriesData);
        setFeaturedProducts(productsData);
      } catch (error) {
        console.error('Failed to load home data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const navigateToCategory = (categoryId) => {
    router.push(`/category/${categoryId}`);
  };

  const navigateToProduct = (productId) => {
    router.push(`/product/${productId}`);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>PhoneGear</Text>
          <Text style={styles.subtitle}>Trouvez vos accessoires parfaits</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Catégories</Text>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CategoryButton 
                category={item} 
                onPress={() => navigateToCategory(item.id)}
              />
            )}
            style={styles.categoryList}
            contentContainerStyle={styles.categoryListContent}
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Produits populaires</Text>
          <View style={styles.productsGrid}>
            {featuredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onPress={() => navigateToProduct(product.id)}
              />
            ))}
          </View>
        </View>

        <View style={styles.promoContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750' }}
            style={styles.promoImage}
          />
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>Offre Spéciale</Text>
            <Text style={styles.promoDescription}>20% de réduction sur tous les accessoires premium</Text>
            <TouchableOpacity style={styles.promoButton}>
              <Text style={styles.promoButtonText}>En profiter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  header: {
    marginBottom: 24,
    marginTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '400',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000000',
  },
  categoryList: {
    flexGrow: 0,
    marginBottom: 8,
  },
  categoryListContent: {
    paddingRight: 16,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  promoContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#F5F5F7',
    marginBottom: 32,
  },
  promoImage: {
    width: '100%',
    height: 150,
  },
  promoContent: {
    padding: 16,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#000000',
  },
  promoDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  promoButton: {
    backgroundColor: '#0066CC',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  promoButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});