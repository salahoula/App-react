import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const SearchBar = ({ search, onSearch }) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="🔍 Rechercher un produit..."
        value={search}
        onChangeText={onSearch}
        style={styles.input}
        placeholderTextColor="#666"
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
    zIndex: 10,
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
  },
});
