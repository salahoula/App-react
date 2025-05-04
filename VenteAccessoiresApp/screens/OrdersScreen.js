import React, { useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { AppContext } from '../context/AppContext';

export default function OrdersScreen() {
  const { orders } = useContext(AppContext);

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>Commande #{item.id}</Text>
            <Text>Articles: {item.items.length}</Text>
            <Text>Date: {new Date(item.date).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
}
