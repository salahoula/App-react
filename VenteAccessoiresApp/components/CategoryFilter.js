import React from 'react';
import { View, Button, ScrollView } from 'react-native';

const categories = ['Tous', 'Coques', 'Chargeurs', 'Écouteurs'];

const CategoryFilter = ({ selected, onSelect }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10 }}>
      {categories.map(cat => (
        <Button
          key={cat}
          title={cat}
          onPress={() => onSelect(cat)}
          color={selected === cat ? 'blue' : 'gray'}
        />
      ))}
    </ScrollView>
  );
};

export default CategoryFilter;
