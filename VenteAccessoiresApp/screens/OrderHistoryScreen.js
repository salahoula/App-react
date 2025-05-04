import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function OrderHistoryScreen({ route }) {
  const { orderHistory } = route.params; // Récupérer l'historique des commandes

  if (!orderHistory || orderHistory.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Historique des commandes</Text>
        <Text>Aucune commande passée.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historique des commandes</Text>
      <FlatList
        data={orderHistory}
        keyExtractor={(order, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.order}>
            <Text>Commande du {new Date(item.date).toLocaleDateString()}</Text>
            <Text>Status : {item.status}</Text>
            {item.items.map((p, index) => (
              <Text key={index}>- {p.name} x {p.quantity}</Text>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  order: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  }
});
