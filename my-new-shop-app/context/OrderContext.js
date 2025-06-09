import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { UserContext } from './UserContext';
import { insertOrder, getOrdersForUser } from '../utils/Database';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  const loadOrders = useCallback(() => {
    if (user) {
      getOrdersForUser(user.username, (ordersFromDB) => {
        setOrders(ordersFromDB);
      });
    }
  }, [user]);

  const addOrder = (order) => {
    insertOrder(order, () => {
      loadOrders();
    });
  };

  useEffect(() => {
    loadOrders();
  }, [user, loadOrders]);

  return (
    <OrderContext.Provider value={{ orders, addOrder, loadOrders }}>
      {children}
    </OrderContext.Provider>
  );
};
