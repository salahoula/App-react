import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

interface OrderItemProps {
  order: {
    id: string;
    date: string;
    total: number;
    status: string;
    items: number;
    tracking?: string;
  };
  onPress: () => void;
  statusColor: string;
}

const OrderItem: React.FC<OrderItemProps> = ({ order, onPress, statusColor }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Livré';
      case 'in transit':
        return 'En transit';
      case 'processing':
        return 'En préparation';
      case 'cancelled':
        return 'Annulé';
      default:
        return status;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.orderInfo}>
        <Text style={styles.orderId}>Commande #{order.id}</Text>
        <Text style={styles.date}>{formatDate(order.date)}</Text>
      </View>
      
      <View style={styles.detailsRow}>
        <View>
          <Text style={styles.items}>{order.items} {order.items > 1 ? 'articles' : 'article'}</Text>
          <Text style={styles.total}>{order.total.toFixed(2)} €</Text>
        </View>
        
        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.status, { color: statusColor }]}>
            {getStatusText(order.status)}
          </Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        {order.tracking ? (
          <Text style={styles.tracking}>
            Suivi: {order.tracking}
          </Text>
        ) : null}
        <ChevronRight size={20} color="#8E8E93" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  date: {
    fontSize: 14,
    color: '#666666',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  items: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  total: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  status: {
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  tracking: {
    fontSize: 14,
    color: '#666666',
  },
});

export default OrderItem;