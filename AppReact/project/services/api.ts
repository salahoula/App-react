import { Product, Category, CartItem, Order, User } from '@/types/types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simulate categories data
const categoriesData: Category[] = [
  {
    id: '1',
    name: 'Coques',
    image: 'https://images.pexels.com/photos/4069970/pexels-photo-4069970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  },
  {
    id: '2',
    name: 'Écouteurs',
    image: 'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  },
  {
    id: '3',
    name: 'Chargeurs',
    image: 'https://images.pexels.com/photos/3829840/pexels-photo-3829840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  },
  {
    id: '4',
    name: 'Supports',
    image: 'https://images.pexels.com/photos/3060654/pexels-photo-3060654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  },
  {
    id: '5',
    name: 'Protections',
    image: 'https://images.pexels.com/photos/9867651/pexels-photo-9867651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  },
];

// Simulate products data
const productsData: Product[] = [
  {
    id: '1',
    name: 'Coque iPhone 13 Pro Max Transparente Silicone',
    brand: 'Apple',
    price: 29.99,
    image: 'https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    description: 'Protégez votre iPhone avec cette coque transparente en silicone haute qualité. Design minimaliste qui met en valeur la couleur originale de votre appareil tout en offrant une protection optimale contre les chocs et les rayures.',
    category: '1',
    rating: 4.7,
    reviews: 128,
    colors: ['#FFFFFF', '#000000', '#FF2D55'],
    inStock: true,
    featured: true
  },
  {
    id: '2',
    name: 'Écouteurs Bluetooth Sans Fil',
    brand: 'Sony',
    price: 149.99,
    image: 'https://images.pexels.com/photos/3587473/pexels-photo-3587473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    description: 'Profitez d\'une qualité audio exceptionnelle avec ces écouteurs Bluetooth. Autonomie de 30 heures, réduction de bruit active, résistants à l\'eau et à la transpiration pour une utilisation sportive.',
    category: '2',
    rating: 4.9,
    reviews: 243,
    colors: ['#FFFFFF', '#000000', '#5856D6'],
    inStock: true,
    featured: true
  },
  {
    id: '3',
    name: 'Chargeur Rapide USB-C 30W',
    brand: 'Anker',
    price: 24.99,
    image: 'https://images.pexels.com/photos/6168028/pexels-photo-6168028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    description: 'Chargeur compact et puissant avec technologie PowerIQ pour une charge optimisée et ultra-rapide. Compatible avec tous les smartphones, tablettes et autres appareils USB-C.',
    category: '3',
    rating: 4.6,
    reviews: 89,
    colors: ['#FFFFFF', '#000000'],
    inStock: true,
    featured: true
  },
  {
    id: '4',
    name: 'Support Voiture Magnétique',
    brand: 'Belkin',
    price: 19.99,
    image: 'https://images.pexels.com/photos/7989231/pexels-photo-7989231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    description: 'Support voiture robuste avec fixation magnétique puissante. Installation facile sur les grilles d\'aération. Rotation à 360° pour une visualisation optimale en mode portrait ou paysage.',
    category: '4',
    rating: 4.3,
    reviews: 56,
    colors: ['#000000'],
    inStock: true,
    featured: true
  },
  {
    id: '5',
    name: 'Protection d\'écran en verre trempé',
    brand: 'Spigen',
    price: 14.99,
    image: 'https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    description: 'Protection ultra résistante 9H avec revêtement oléophobique anti-traces de doigts. Installation facile avec kit inclus. Compatible avec la reconnaissance faciale.',
    category: '5',
    rating: 4.5,
    reviews: 112,
    colors: ['#FFFFFF'],
    inStock: true,
    featured: true
  },
  {
    id: '6',
    name: 'Câble USB-C vers Lightning 2m',
    brand: 'Apple',
    price: 29.99,
    image: 'https://images.pexels.com/photos/880467/pexels-photo-880467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    description: 'Câble officiel Apple pour une charge rapide et un transfert de données optimal. Matériaux premium pour une durabilité maximale avec utilisation quotidienne.',
    category: '3',
    rating: 4.4,
    reviews: 78,
    colors: ['#FFFFFF'],
    inStock: true,
    featured: false
  },
];

// Simulate cart data
let cartData: CartItem[] = [
  {
    id: '1',
    productId: '1',
    name: 'Coque iPhone 13 Pro Max Transparente Silicone',
    price: 29.99,
    image: 'https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    quantity: 1,
    color: '#000000'
  },
  {
    id: '2',
    productId: '3',
    name: 'Chargeur Rapide USB-C 30W',
    price: 24.99,
    image: 'https://images.pexels.com/photos/6168028/pexels-photo-6168028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    quantity: 2,
    color: '#FFFFFF'
  }
];

// Simulate orders data
const ordersData: Order[] = [
  {
    id: '10001',
    date: '2023-05-15T14:30:00',
    total: 79.97,
    status: 'delivered',
    items: 3,
    tracking: 'DHL12345678',
    products: [
      {
        id: '1',
        name: 'Coque iPhone 13 Pro Max Transparente Silicone',
        price: 29.99,
        image: 'https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
        quantity: 1,
        color: '#000000'
      },
      {
        id: '3',
        name: 'Chargeur Rapide USB-C 30W',
        price: 24.99,
        image: 'https://images.pexels.com/photos/6168028/pexels-photo-6168028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
        quantity: 2,
        color: '#FFFFFF'
      }
    ]
  },
  {
    id: '10002',
    date: '2023-06-22T09:15:00',
    total: 149.99,
    status: 'in transit',
    items: 1,
    tracking: 'UPS87654321',
    products: [
      {
        id: '2',
        name: 'Écouteurs Bluetooth Sans Fil',
        price: 149.99,
        image: 'https://images.pexels.com/photos/3587473/pexels-photo-3587473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
        quantity: 1,
        color: '#5856D6'
      }
    ]
  },
  {
    id: '10003',
    date: '2023-07-05T16:45:00',
    total: 19.99,
    status: 'processing',
    items: 1,
    tracking: null,
    products: [
      {
        id: '4',
        name: 'Support Voiture Magnétique',
        price: 19.99,
        image: 'https://images.pexels.com/photos/7989231/pexels-photo-7989231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
        quantity: 1,
        color: '#000000'
      }
    ]
  }
];

// User data
const userData: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+33 6 12 34 56 78',
  avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
  address: {
    street: '123 Rue de la Paix',
    city: 'Paris',
    zipCode: '75001',
    country: 'France'
  },
  paymentMethods: [
    {
      id: '1',
      type: 'card',
      last4: '4242',
      expiry: '06/25',
      brand: 'Visa'
    }
  ]
};

// API functions
export const fetchCategories = async (): Promise<Category[]> => {
  await delay(1000);
  return categoriesData;
};

export const fetchFeaturedProducts = async (): Promise<Product[]> => {
  await delay(1000);
  return productsData.filter(product => product.featured);
};

export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  await delay(1000);
  return productsData.filter(product => product.category === categoryId);
};

export const getProductDetails = async (productId: string): Promise<Product> => {
  await delay(1000);
  const product = productsData.find(p => p.id === productId);
  if (!product) {
    throw new Error(`Product with id ${productId} not found`);
  }
  return product;
};

export const searchProducts = async (query: string, filters: any): Promise<Product[]> => {
  await delay(1500);
  let results = productsData.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.brand.toLowerCase().includes(query.toLowerCase())
  );

  // Apply filters
  if (filters) {
    // Filter by price range
    if (filters.priceRange) {
      results = results.filter(product => 
        product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
      );
    }

    // Filter by brands
    if (filters.brands && filters.brands.length > 0) {
      results = results.filter(product => 
        filters.brands.includes(product.brand)
      );
    }

    // Sort by option
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price_asc':
          results.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          results.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          // For demo purposes, just assume the order is already by newest
          break;
        case 'popularity':
        default:
          results.sort((a, b) => b.rating - a.rating);
          break;
      }
    }
  }

  return results;
};

export const getCartItems = async (): Promise<CartItem[]> => {
  await delay(800);
  return cartData;
};

export const addToCart = async (
  productId: string,
  quantity: number,
  color: string
): Promise<void> => {
  await delay(800);
  
  const product = productsData.find(p => p.id === productId);
  if (!product) {
    throw new Error(`Product with id ${productId} not found`);
  }

  const existingItem = cartData.find(item => 
    item.productId === productId && item.color === color
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    const newItem: CartItem = {
      id: `cart_${Date.now()}`,
      productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      color
    };
    cartData.push(newItem);
  }
};

export const updateCartItem = async (itemId: string, quantity: number): Promise<void> => {
  await delay(500);
  
  const item = cartData.find(item => item.id === itemId);
  if (!item) {
    throw new Error(`Cart item with id ${itemId} not found`);
  }

  item.quantity = quantity;
};

export const removeFromCart = async (itemId: string): Promise<void> => {
  await delay(500);
  cartData = cartData.filter(item => item.id !== itemId);
};

export const getOrderHistory = async (): Promise<Order[]> => {
  await delay(1000);
  return ordersData;
};

export const getOrderDetails = async (orderId: string): Promise<Order> => {
  await delay(800);
  const order = ordersData.find(o => o.id === orderId);
  if (!order) {
    throw new Error(`Order with id ${orderId} not found`);
  }
  return order;
};

export const getUserProfile = async (): Promise<User> => {
  await delay(800);
  return userData;
};

export const updateUserProfile = async (updatedUser: Partial<User>): Promise<User> => {
  await delay(1000);
  // In a real app, this would update the user data on the server
  return { ...userData, ...updatedUser };
};