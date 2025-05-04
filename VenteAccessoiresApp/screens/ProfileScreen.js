import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon Profil</Text>
      <Text>Nom : Jean Dupont</Text>
      <Text>Email : jean@example.com</Text>
      {/* Ajoutez ici la modification du profil si besoin */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 }
});
