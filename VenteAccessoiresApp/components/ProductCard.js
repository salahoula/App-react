import React from 'react';
import { View, Text, Button } from 'react-native';

const ProductCard = ({ product, navigation }) => {
  return (
    <View style={{ margin: 10, borderWidth: 1, padding: 10 }}>
      <Text>{product.name}</Text>
      <Text>{product.price}</Text>
      <Button
        title="Voir détails"
        onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}
      />
    </View>
  );
};

export default ProductCard;
