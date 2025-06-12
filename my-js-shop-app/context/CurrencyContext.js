import React, { createContext, useState, useEffect, useContext } from 'react';
import { loadData, saveData } from '../utils/Storage';
import { UserContext } from './UserContext';

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [currency, setCurrency] = useState('USD');
  const [conversionRate, setConversionRate] = useState(1); // USD → currency
  const [isLoading, setIsLoading] = useState(false);

  const API_KEY = '1592602d2270b2a52fb11d07'; // replace with your actual key
  const BASE_CURRENCY = 'USD';

  // Load saved currency when user logs in
  useEffect(() => {
  const loadUserCurrency = async () => {
    if (user?.username) {
      const key = `currency_${user.username}`;
      const saved = await loadData(key);

      if (saved) {
        setCurrency(saved);
      } else {
        // 🛠 Default to USD for new users and persist it
        setCurrency('USD');
        await saveData(key, 'USD');
      }
    }
  };
  loadUserCurrency();
}, [user]);


  // Fetch conversion rate when currency changes
  useEffect(() => {
    const fetchConversionRate = async () => {
      if (!currency || currency === BASE_CURRENCY) {
        setConversionRate(1);
        return;
      }

      setIsLoading(true);
      try {
        const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${BASE_CURRENCY}/${currency}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.result === 'success') {
          setConversionRate(data.conversion_rate);
        } else {
          console.warn('Failed to fetch conversion rate:', data);
          setConversionRate(1);
        }
      } catch (error) {
        console.error('Conversion API error:', error);
        setConversionRate(1);
      }
      setIsLoading(false);
    };

    fetchConversionRate();
  }, [currency]);

  // Set + persist currency choice per user
  const updateCurrency = async (newCurrency) => {
    setCurrency(newCurrency);
    if (user?.username) {
      await saveData(`currency_${user.username}`, newCurrency);
    }
  };

  const convert = (amount) => {
    const result = amount * conversionRate;
    return `${currency} ${result.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        updateCurrency,
        convert,
        isLoading,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
