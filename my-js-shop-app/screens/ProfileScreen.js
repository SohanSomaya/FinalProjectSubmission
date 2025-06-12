import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { UserContext } from '../context/UserContext';
import { loadData, deleteData } from '../utils/Storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { CurrencyContext } from '../context/CurrencyContext';
import Icon from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';

const SUPPORTED_CURRENCIES = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'CAD', 'AUD'];

export default function ProfileScreen() {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const { currency, updateCurrency, convert } = useContext(CurrencyContext);
  const [tempCurrency, setTempCurrency] = useState(currency);

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleDeleteHistory = async () => {
    const key = `orders_${user.username}`;
    await deleteData(key);
    setOrders([]);
  };

  const handleDownloadHistory = async () => {
    if (!orders || orders.length === 0) {
      alert('No order history to download.');
      return;
    }

    try {
      const data = JSON.stringify(orders, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `orders_${user.username}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      alert('Order history downloaded.');
    } catch (error) {
      console.error('Web download error:', error);
      alert('Failed to download order history.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      const loadOrders = async () => {
        if (user?.username) {
          const key = `orders_${user.username}`;
          const parsed = await loadData(key);
          const sorted = parsed?.sort((a, b) => b.timestamp - a.timestamp) ?? [];
          setOrders(sorted);
        }
      };
      loadOrders();
    }, [user])
  );

  const renderOrder = ({ item: order }) => {
    const formattedDate =
      order.timestamp && !isNaN(new Date(order.timestamp))
        ? new Date(order.timestamp).toLocaleString()
        : 'Unknown Date';

    return (
      <View style={styles.orderBlock}>
        <Text style={styles.orderDate}>🧾 Order Date: {formattedDate}</Text>
        {order.items?.length > 0 ? (
          order.items.map((item, idx) => (
            <Text key={idx} style={styles.orderItem}>
              • {item.name} × {item.quantity} — {convert(item.price * item.quantity)}
            </Text>
          ))
        ) : (
          <Text style={styles.noItems}>No items in this order.</Text>
        )}
      </View>
    );
  };

  const handleCurrencyChange = () => {
    if (SUPPORTED_CURRENCIES.includes(tempCurrency.toUpperCase())) {
      updateCurrency(tempCurrency.toUpperCase());
    } else {
      alert('Unsupported currency code. Use one of: ' + SUPPORTED_CURRENCIES.join(', '));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.header}>Welcome, {user?.username}</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Icon name="log-out-outline" size={24} color="#e74c3c" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {user?.username === 'admin' && (
        <View style={styles.adminPanel}>
          <Text style={styles.adminLabel}>Admin Panel</Text>
        </View>
      )}

      <Text style={styles.subheader}>Preferred Currency</Text>
      <RNPickerSelect
        onValueChange={setTempCurrency}
        items={SUPPORTED_CURRENCIES.map((cur) => ({ label: cur, value: cur }))}
        value={tempCurrency}
        placeholder={{ label: 'Select your currency', value: null }}
        style={{
          inputIOS: styles.dropdown,
          inputAndroid: styles.dropdown,
        }}
      />
      <Button title="Set Currency" onPress={handleCurrencyChange} />

      <Text style={styles.subheader}>Your Orders</Text>
      {orders.length === 0 ? (
        <Text style={styles.noOrders}>No past orders found.</Text>
      ) : (
        <>
          <FlatList
            data={orders}
            renderItem={renderOrder}
            keyExtractor={(order) => order.id}
          />
          <Button
            title="⬇️ Download Order History"
            onPress={handleDownloadHistory}
            color="#2980b9"
          />
          <View style={{ height: 8 }} />
          <Button
            title="🗑️ Delete Order History"
            onPress={handleDeleteHistory}
            color="#c0392b"
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: { fontSize: 24, fontWeight: 'bold' },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderRadius: 6,
  },
  logoutText: {
    color: '#e74c3c',
    fontSize: 16,
    marginLeft: 6,
    fontWeight: 'bold',
  },
  subheader: { fontSize: 18, marginTop: 20, marginBottom: 10 },
  dropdown: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 10,
    justifyContent: 'center',
  },
  noOrders: { fontStyle: 'italic', color: '#999' },
  orderBlock: {
    padding: 12,
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  orderDate: { fontWeight: 'bold', marginBottom: 6, color: '#333' },
  orderItem: { fontSize: 14, color: '#555' },
  noItems: { fontStyle: 'italic', color: '#888' },
  adminPanel: {
    padding: 16,
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    marginBottom: 16,
  },
  adminLabel: { fontWeight: 'bold', color: '#2980b9' },
});
