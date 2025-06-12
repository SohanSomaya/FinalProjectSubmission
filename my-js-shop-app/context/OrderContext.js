import React, { createContext } from 'react';
import { loadData, saveData } from '../utils/Storage';
import uuid from 'react-native-uuid';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const addOrder = async (cart, user) => {
    if (!user) return;

    const key = `orders_${user.username}`;

    try {
      const existing = await loadData(key);
      const previousOrders = Array.isArray(existing) ? existing : [];

      const newOrder = {
        id: uuid.v4(),
        timestamp: Date.now(),
        items: cart,
      };

      const updatedOrders = [...previousOrders, newOrder];
      await saveData(key, JSON.stringify(updatedOrders));
    } catch (err) {
      console.error('Error saving order history:', err);
    }
  };

  return (
    <OrderContext.Provider value={{ addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
