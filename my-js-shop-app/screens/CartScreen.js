import React, { useContext, useCallback } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { CartContext } from '../context/CartContext';
import { CurrencyContext } from '../context/CurrencyContext';
import { ItemContext } from '../context/ItemContext';
import { useFocusEffect } from '@react-navigation/native';

export default function CartScreen() {
  const { cart, addToCart, removeFromCart, clearCart, checkout, cartText, setCartText } = useContext(CartContext);
  const { convert } = useContext(CurrencyContext);
  const { items } = useContext(ItemContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useFocusEffect(
    useCallback(() => {
      setCartText('Add Items!');
    }, [])
  );

  const renderItem = ({ item }) => {
    const itemInStock = items.find(i => i.id === item.id)?.stock || 0;
    const available = itemInStock - item.quantity;

    return (
      <View style={styles.card}>
        <Text style={styles.name}>{item.name}</Text>
        <Text>{convert(item.price)} × {item.quantity}</Text>
        <Text style={styles.total}>= {convert(item.price * item.quantity)}</Text>
        <Text style={styles.stock}>Available: {available}</Text>
        <View style={styles.buttonRow}>
          <Button title="−1" color="crimson" onPress={() => removeFromCart(item.id)} />
          <View style={{ width: 8 }} />
          <Button
            title="+1"
            onPress={() => addToCart(item)}
            disabled={available <= 0}
            color={available <= 0 ? 'gray' : 'green'}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Cart</Text>
      <Text style={styles.title}>{cartText}</Text>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.empty}>Your cart is empty.</Text>}
        renderItem={renderItem}
      />

      {cart.length > 0 && (
        <View style={styles.summary}>
          <Text style={styles.totalText}>Total: {convert(total)}</Text>
          <View style={styles.buttonRow}>
            <Button title="Checkout" onPress={checkout} />
            <View style={{ width: 16 }} />
            <Button title="Clear Cart" onPress={clearCart} color="#e67e22" />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  empty: { fontStyle: 'italic', textAlign: 'center', marginTop: 30 },
  card: {
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  name: { fontWeight: 'bold', fontSize: 16 },
  total: { fontWeight: '600', marginTop: 6 },
  stock: { fontSize: 12, color: '#666', marginBottom: 6 },
  summary: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 12,
    marginTop: 12,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
