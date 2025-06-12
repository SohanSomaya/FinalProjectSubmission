import AsyncStorage from '@react-native-async-storage/async-storage';

// 🔹 Save data to storage
export const saveData = async (key, value) => {
  try {
    const stored = typeof value === 'string' ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, stored);
  } catch (e) {
    console.error('Error saving data:', e);
  }
};

// 🔹 Load data from storage
export const loadData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    // Return raw if already a string
    if (!value) return null;
    try {
      return JSON.parse(value);
    } catch {
      return value;  // fallback for plain strings like "USD"
    }
  } catch (e) {
    console.error('Failed to load data', e);
    return null;
  }
};


// 🔹 Delete key
export const deleteData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('❌ Error deleting data:', e);
  }
};

// 🔹 Clear all storage
export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error('❌ Error clearing all data:', e);
  }
};
