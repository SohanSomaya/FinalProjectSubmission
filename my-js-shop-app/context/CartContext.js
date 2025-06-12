import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { loadData, saveData } from '../utils/Storage';
import { UserContext } from './UserContext';
import { ItemContext } from './ItemContext';
import { OrderContext } from './OrderContext';
import uuid from 'react-native-uuid';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartText, setCartText] = useState('Add Items!');
  const { user } = useContext(UserContext);
  const { items, setItems } = useContext(ItemContext);
  const { addOrder } = useContext(OrderContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        try {
          const stored = await loadData(`cart_${user.username}`);
          const parsed = stored ?? [];
          setCart(parsed);
        } catch (err) {
          console.error('Failed to load cart:', err);
        }
      }
    };
    loadCart();
  }, [user]);

  const saveCart = async (updatedCart) => {
    setCart(updatedCart);
    if (user) {
      try {
        await saveData(`cart_${user.username}`, updatedCart);
      } catch (err) {
        console.error('Failed to save cart:', err);
      }
    }
  };

  const addToCart = async (item) => {
    const currentInCart = cart.find(c => c.id === item.id)?.quantity || 0;

    if (item.stock !== undefined && currentInCart >= item.stock) {
      Alert.alert('Out of Stock', 'You cannot add more of this item.');
      return;
    }

    const updatedCart = [...cart];
    const index = updatedCart.findIndex(c => c.id === item.id);

    if (index >= 0) {
      updatedCart[index].quantity += 1;
    } else {
      updatedCart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
      });
    }

    await saveCart(updatedCart);
  };

  const removeFromCart = async (itemId) => {
    const updated = cart.map(item =>
      item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
    ).filter(item => item.quantity > 0);

    await saveCart(updated);
  };

  const updateQuantity = async (itemId, newQty) => {
    const updated = cart.map(item =>
      item.id === itemId ? { ...item, quantity: newQty } : item
    );
    await saveCart(updated);
  };

  const clearCart = async () => {
    await saveCart([]);
  };

  const checkout = async () => {
    if (!user || cart.length === 0) {
      setCartText('Cart is empty!');
      return;
    }

    try {
      const purchaseKey = `purchases_${user.username}`;
      const existing = await loadData(purchaseKey);
      const previousPurchases = existing ?? [];

      const newPurchases = cart.map((item) => ({
        id: uuid.v4(),
        itemName: item.name,
        price: item.price * item.quantity,
        timestamp: Date.now(),
      }));

      const updatedPurchases = [...previousPurchases, ...newPurchases];
      await saveData(purchaseKey, JSON.stringify(updatedPurchases));

      // ✅ BATCHED stock update
      const updatedItems = items.map(item => {
        const match = cart.find(c => c.id === item.id);
        if (match) {
          return { ...item, stock: Math.max(0, item.stock - match.quantity) };
        }
        return item;
      });

      await saveData('items', updatedItems);
      setItems([...updatedItems]); // force re-render

      await addOrder(cart, user);
      await saveCart([]);
      setCart([]);
      setCartText('Thank you for your purchase!');
      setTimeout(() => {
        setCartText('Continue Shopping!');
      }, 2000);
    } catch (error) {
      console.error('Checkout error:', error);
      setCartText('Something went wrong! Try again later!');
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        checkout,
        cartText,
        setCartText,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
