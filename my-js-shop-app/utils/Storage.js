import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key, value) => {
  try {
    const stored = typeof value === 'string' ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, stored);
  } catch (e) {
    console.error('Error saving data:', e);
  }
};

export const loadData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (!value) return null;
    try {
      return JSON.parse(value);
    } catch {
      return value; 
    }
  } catch (e) {
    console.error('Failed to load data', e);
    return null;
  }
};


export const deleteData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('❌ Error deleting data:', e);
  }
};

export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error('❌ Error clearing all data:', e);
  }
};
