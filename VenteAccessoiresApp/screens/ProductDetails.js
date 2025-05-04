import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { PRODUCTS } from '../data/products';

const ProductDetailScreen = ({ route }) => {
  const { productId } = route.params;
  const product = PRODUCTS.find((p) => p.id === productId);

  if (!product) return <Text>Produit introuvable</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>{product.price}</Text>
      <Button title="Ajouter au panier" onPress={() => alert('Ajouté au panier')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  description: { marginVertical: 10 },
  price: { fontSize: 18, color: 'green', marginBottom: 20 }
});

export default ProductDetailScreen;
