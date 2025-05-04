import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Jean',
    firstName: 'Pierre',
    email: 'jean.pierre@example.com',
    password: '123456',
  });
  
  const [cart, setCart] = useState([
    { id: 1, name: 'Produit 1', price: 20 },
    { id: 2, name: 'Produit 2', price: 40 },
  ]);

  const [orders, setOrders] = useState([
    { id: 1, date: '2025-04-25', total: 60 },
    { id: 2, date: '2025-05-02', total: 30 },
  ]);

  const login = (userData) => {
    console.log("Login user data:", userData);
    setUser(userData);
  };

  const logout = () => {
    console.log("User logged out.");
    setUser(null);  
    setCart([]);  
    setOrders([]);  
  };

  console.log("AppContext user:", user);
  console.log("AppContext cart:", cart);
  console.log("AppContext orders:", orders);

  return (
    <AppContext.Provider value={{ user, login, logout, cart, orders }}>
      {children}
    </AppContext.Provider>
  );
};
