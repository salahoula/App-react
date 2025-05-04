import React from 'react';
import { View, Text, Button } from 'react-native';

const ProfileScreen = () => {
  return (
    <View>
      <Text>Profil Utilisateur</Text>
      <Button title="Déconnexion" onPress={() => {/* Déconnexion logic */}} />
    </View>
  );
};

export default ProfileScreen;
