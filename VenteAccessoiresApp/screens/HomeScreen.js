import React from 'react';
import { View, Text, FlatList, Image, Button, StyleSheet } from 'react-native';
import { PRODUCTS } from '../data/products';

export default function HomeScreen({ addToCart }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produits disponibles</Text>
      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.brand}>{item.brand}</Text>
              <Text style={styles.price}>{item.price.toFixed(2)} €</Text>
              <Button title="Ajouter au panier" onPress={() => addToCart(item)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  list: { paddingBottom: 20 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  image: { width: 100, height: 100 },
  info: { flex: 1, padding: 12, justifyContent: 'space-between' },
  name: { fontSize: 16, fontWeight: 'bold' },
  brand: { color: '#666', fontSize: 14 },
  price: { fontSize: 16, marginVertical: 4, color: '#222' },
});
