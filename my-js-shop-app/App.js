import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './Navigation';

import { UserProvider } from './context/UserContext';
import { ItemProvider } from './context/ItemContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { CurrencyProvider } from './context/CurrencyContext';

export default function App() {
  return (
    
      <UserProvider>
        <CurrencyProvider>
          <ItemProvider>
            <OrderProvider>
              <CartProvider>
                <NavigationContainer>
                  <AppNavigator />
                </NavigationContainer>
              </CartProvider>
            </OrderProvider>
          </ItemProvider>
        </CurrencyProvider>
      </UserProvider>
    
  );
}
