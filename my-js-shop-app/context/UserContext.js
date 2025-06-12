import React, { createContext, useState } from 'react';
import { loadData } from '../utils/Storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const storedUser = await loadData(`user_${username}`);
      if (storedUser && storedUser.password === password) {
        setUser({ username });
        console.log(`✅ Logged in as ${username}`);
        return true;
      }
    } catch (e) {
      console.error('❌ Login error:', e);
    }
    return false;
  };

  const logout = () => {
    console.log('🚪 Logging out...');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
