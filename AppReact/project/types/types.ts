export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: number;
  reviews: number;
  colors?: string[];
  inStock: boolean;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color?: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  items: number;
  tracking?: string | null;
  products: CartItem[];
}

export interface Address {
  street: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface PaymentMethod {
  id: string;
  type: string;
  last4: string;
  expiry: string;
  brand: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  address: Address;
  paymentMethods: PaymentMethod[];
}