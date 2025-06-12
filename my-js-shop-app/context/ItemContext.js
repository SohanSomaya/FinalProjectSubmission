import React, { createContext, useState, useEffect } from 'react';
import { loadData, saveData } from '../utils/Storage';

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      const stored = await loadData('items');
      if (stored) {
        setItems(stored);
      } else {
        const initial = [
          { id: 1, name: 'Laptop', price: 999, stock: 5, tags: ['electronics', 'computing'] },
          { id: 2, name: 'Headphones', price: 199, stock: 8, tags: ['audio', 'music'] },
          { id: 3, name: 'Mouse', price: 49, stock: 10, tags: ['accessory', 'computer'] },
          { id: 4, name: 'Keyboard', price: 79, stock: 7, tags: ['accessory', 'computer'] },
          { id: 5, name: 'Monitor', price: 299, stock: 3, tags: ['electronics', 'display'] },
          { id: 6, name: 'USB Cable', price: 15, stock: 20, tags: ['accessory', 'cable'] },
          { id: 7, name: 'Webcam', price: 89, stock: 6, tags: ['camera', 'video'] },
        ];
        setItems(initial);
        await saveData('items', initial);
      }
    };

    loadItems();
  }, []);

  const updateItemQuantity = async (id, change) => {
    const updated = items.map((item) => {
  if (String(item.id) === String(id)) {
    console.log('🔍 Matching item:', item);
    return { ...item, stock: Math.max(0, item.stock + change) };
  }
  return item;
});

    console.log('✅ Stock update:', { id, change });

    await saveData('items', updated);
    const latest = await loadData('items');
setItems([...latest]); // force new array ref

  };

  const addNewItem = async (item) => {
    const updated = [...items, item];
    await saveData('items', updated);
    const latest = await loadData('items');
    setItems(latest);
  };

  return (
    <ItemContext.Provider value={{ items, setItems, updateItemQuantity, addNewItem }}>
      {children}
    </ItemContext.Provider>
  );
};
