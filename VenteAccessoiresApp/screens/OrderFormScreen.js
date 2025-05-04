import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert
} from 'react-native';

export default function OrderFormScreen({ route, navigation }) {
  const { cartItems } = route.params;  // Récupérer les articles du panier

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleSubmit = () => {
    if (!name || !address || !paymentMethod) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs du formulaire.');
      return;
    }

    // Créer une commande avec les détails du formulaire et les articles du panier
    const order = {
      user: { name, address, paymentMethod },
      items: cartItems,
      date: new Date().toLocaleDateString(),
      status: 'En attente', // Statut initial
    };

    // Envoi de la commande (ici, nous l'ajoutons à un tableau local)
    // On simule ici l'enregistrement de la commande
    const updatedOrderHistory = route.params.orderHistory || [];
    updatedOrderHistory.push(order);

    // Affichage de la confirmation
    Alert.alert('Commande passée', 'Votre commande a été enregistrée.');

    // Naviguer vers l'écran de l'historique des commandes et passer l'historique
    navigation.navigate('Historique', { orderHistory: updatedOrderHistory });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulaire de commande</Text>

      <Text>Nom:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Entrez votre nom"
      />

      <Text>Adresse:</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Entrez votre adresse"
      />

      <Text>Méthode de paiement:</Text>
      <TextInput
        style={styles.input}
        value={paymentMethod}
        onChangeText={setPaymentMethod}
        placeholder="Entrez la méthode de paiement"
      />

      <Button title="Passer la commande" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4
  },
});
