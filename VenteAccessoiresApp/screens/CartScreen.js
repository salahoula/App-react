import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

export default function CartScreen({ cartItems, onGoToOrderForm }) {
  if (!cartItems.length) {
    return (
      <View style={styles.container}>
        <Text>Votre panier est vide.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panier</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.name} x {item.quantity}</Text>
        )}
      />
      <Button title="Passer la commande" onPress={onGoToOrderForm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
});
