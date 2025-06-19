import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login, refreshToken, getUser } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const storedUsername = await AsyncStorage.getItem('username');
        const storedEmail = await AsyncStorage.getItem('email');
        if (token && storedUsername && storedEmail) {
          setIsAuthenticated(true);
          setUsername(storedUsername);
          setEmail(storedEmail);
        } else {
          await AsyncStorage.multiRemove(['access_token', 'refresh_token', 'username', 'email']);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        await AsyncStorage.multiRemove(['access_token', 'refresh_token', 'username', 'email']);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = async (credentials) => {
    try {
      console.log('Attempting login with:', credentials);
      const response = await login(credentials);
      console.log('Login response:', response.data);

      if (response.data.access && response.data.refresh) {
        await AsyncStorage.setItem('access_token', response.data.access);
        await AsyncStorage.setItem('refresh_token', response.data.refresh);

        const userResponse = await getUser();
        const user = userResponse.data;

        await AsyncStorage.setItem('username', user.username);
        await AsyncStorage.setItem('email', user.email);

        setUsername(user.username);
        setEmail(user.email);
        setIsAuthenticated(true);

        console.log('Authenticated successfully');
      } else {
        throw new Error('Invalid login response');
      }
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['access_token', 'refresh_token', 'username', 'email']);
      setIsAuthenticated(false);
      setUsername('');
      setEmail('');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    const refresh = async () => {
      try {
        const refreshTokenValue = await AsyncStorage.getItem('refresh_token');
        if (refreshTokenValue) {
          const response = await refreshToken(refreshTokenValue);
          if (response.data.access) {
            await AsyncStorage.setItem('access_token', response.data.access);
            setIsAuthenticated(true);
          } else {
            throw new Error('Invalid refresh response');
          }
        }
      } catch (error) {
        console.error('Token refresh failed:', error);
        handleLogout();
      }
    };

    const interval = setInterval(refresh, 55 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, username, email, handleLogin, handleLogout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
