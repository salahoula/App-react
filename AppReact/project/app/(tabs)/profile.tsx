import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUserProfile } from '@/services/api';
import { ShoppingBag, Heart, CreditCard, Bell, Settings, LogOut } from 'lucide-react-native';
import LoadingState from '@/components/LoadingState';

export default function ProfileScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setIsLoading(true);
    try {
      const userData = await getUserProfile();
      setProfile(userData);
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToOrders = () => {
    router.push('/orders');
  };

  const navigateToWishlist = () => {
    router.push('/wishlist');
  };

  const navigateToPayments = () => {
    router.push('/payments');
  };

  const navigateToSettings = () => {
    router.push('/settings');
  };

  const handleLogout = () => {
    router.push('/login');
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: profile?.avatar || 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profile?.name || 'John Doe'}</Text>
            <Text style={styles.profileEmail}>{profile?.email || 'john.doe@example.com'}</Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={navigateToSettings}>
            <Text style={styles.editButtonText}>Modifier</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Mon Compte</Text>
          
          <TouchableOpacity style={styles.menuItem} onPress={navigateToOrders}>
            <ShoppingBag size={20} color="#0066CC" />
            <Text style={styles.menuItemText}>Mes Commandes</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={navigateToWishlist}>
            <Heart size={20} color="#0066CC" />
            <Text style={styles.menuItemText}>Liste de Souhaits</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={navigateToPayments}>
            <CreditCard size={20} color="#0066CC" />
            <Text style={styles.menuItemText}>Méthodes de Paiement</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Préférences</Text>
          
          <View style={styles.menuItem}>
            <Bell size={20} color="#0066CC" />
            <Text style={styles.menuItemText}>Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#D1D1D6', true: '#34C759' }}
              ios_backgroundColor="#D1D1D6"
            />
          </View>
          
          <TouchableOpacity style={styles.menuItem} onPress={navigateToSettings}>
            <Settings size={20} color="#0066CC" />
            <Text style={styles.menuItemText}>Paramètres</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#FF3B30" />
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666666',
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F5F5F7',
  },
  editButtonText: {
    fontSize: 14,
    color: '#0066CC',
    fontWeight: '500',
  },
  sectionContainer: {
    marginBottom: 24,
    backgroundColor: '#F5F5F7',
    borderRadius: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000000',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  menuItemText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#000000',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginBottom: 32,
    backgroundColor: '#FFF2F2',
    borderRadius: 8,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#FF3B30',
  },
});