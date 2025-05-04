import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProductDetails from './screens/ProductDetails';
import OrderFormScreen from './screens/OrderFormScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  const addToCart = (product) => {
    const existing = cartItems.find((item) => item.id === product.id);
    if (existing) {
      setCartItems(cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const confirmOrder = (order) => {
    setOrderHistory([...orderHistory, order]);
    setCartItems([]); // vider le panier après commande
  };

  const TabNavigator = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let icon;
          if (route.name === 'Accueil') icon = 'home';
          else if (route.name === 'Panier') icon = 'cart';
          else if (route.name === 'Profil') icon = 'person';
          else if (route.name === 'Historique') icon = 'clipboard';
          return <Ionicons name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Accueil">
        {(props) => <HomeScreen {...props} addToCart={addToCart} />}
      </Tab.Screen>
      <Tab.Screen name="Panier">
        {(props) => (
          <CartScreen
            {...props}
            cartItems={cartItems}
            onGoToOrderForm={() =>
              props.navigation.navigate('Commande', {
                cartItems,
                confirmOrder,
              })
            }
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Historique">
        {(props) => <OrderHistoryScreen {...props} orderHistory={orderHistory} />}
      </Tab.Screen>
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="Commande" component={OrderFormScreen} />
        <Stack.Screen name="Détail" component={ProductDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
