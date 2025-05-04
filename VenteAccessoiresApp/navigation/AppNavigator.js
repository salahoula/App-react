import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from '../screens/ProfileScreen';  // Assure-toi que le chemin est correct
import RegisterScreen from '../screens/RegisterScreen'; 

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
