import axios from 'axios';
import { Platform } from 'react-native';

const API_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:8000/api/'
    : 'http://127.0.0.1:8000/api/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const register = (data) => api.post('register/', data);
export const login = (data) => api.post('token/', data);
export const refreshToken = (refresh) => api.post('token/refresh/', { refresh });
export const getTasks = () => api.get('tasks/');
export const createTask = (data) => api.post('tasks/', data);
export const updateTask = (id, data) => api.put(`tasks/${id}/`, data);
export const deleteTask = (id) => api.delete(`tasks/${id}/`);
export const getUser = () => api.get('user/');

export default api;
