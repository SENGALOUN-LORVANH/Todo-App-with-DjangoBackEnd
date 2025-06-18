import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login, refreshToken, getUser } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const storedUsername = await AsyncStorage.getItem('username');
        if (token && storedUsername) {
          setIsAuthenticated(true);
          setUsername(storedUsername);
        } else {
          await AsyncStorage.removeItem('access_token');
          await AsyncStorage.removeItem('username');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        await AsyncStorage.removeItem('access_token');
        await AsyncStorage.removeItem('username');
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
        console.log('User response:', userResponse.data);
        const user = userResponse.data;
        await AsyncStorage.setItem('username', user.username);
        setUsername(user.username);
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
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('refresh_token');
      await AsyncStorage.removeItem('username');
      setIsAuthenticated(false);
      setUsername('');
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
    <AuthContext.Provider value={{ isAuthenticated, username, handleLogin, handleLogout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};