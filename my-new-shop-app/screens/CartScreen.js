import React, { useContext, useMemo } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { CartContext } from '../context/CartContext';
import { OrderContext } from '../context/OrderContext';
import { UserContext } from '../context/UserContext';
import { Button, Text } from 'react-native-paper';
import { decreaseItemQuantity } from '../utils/Database';
import { v4 as uuidv4 } from 'uuid';

export default function CartScreen() {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const { addOrder } = useContext(OrderContext);
  const { user } = useContext(UserContext);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    const order = {
      orderId: uuidv4(),
      username: user.username,
      date: new Date().toLocaleString(),
      items: cartItems,
      total: totalPrice,
    };

    // Add order to database
    addOrder(order);

    // Decrease stock for each item
    cartItems.forEach((item) => {
      decreaseItemQuantity(item.id, item.quantity);
    });

    // Clear cart
    clearCart();

    alert(`Order placed! Total: $${totalPrice.toFixed(2)}`);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>
        Your Cart
      </Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>Your cart is empty.</Text>}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text variant="titleMedium">{item.name}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Price: ${(item.price * item.quantity).toFixed(2)}</Text>
            <Button mode="outlined" onPress={() => removeFromCart(item.id)}>
              Remove
            </Button>
          </View>
        )}
      />

      {cartItems.length > 0 && (
        <View style={styles.summary}>
          <Text variant="titleLarge">Total: ${totalPrice.toFixed(2)}</Text>
          <Button mode="contained" onPress={handleCheckout}>
            Checkout
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cartItem: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
  },
  summary: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 16,
    marginTop: 16,
  },
});
