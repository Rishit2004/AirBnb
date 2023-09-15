import { createContext, useEffect, useState } from 'react';

import {
  getItemFromLocalStorage,
  setItemsInLocalStorage,
  removeItemFromLocalStorage,
} from '../utils';
import axiosInstance from '../utils/axios';

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load user data from localStorage when the app starts
  useEffect(() => {
    const storedUser = getItemFromLocalStorage('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const setUserGlobally = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);

    // Save user in local storage
    setItemsInLocalStorage('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);

    // Clear user data from localStorage when logging out
    removeItemFromLocalStorage('user');
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        setUserGlobally,
        logout: handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
