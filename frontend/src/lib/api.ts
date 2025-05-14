import axios from 'axios';
import { auth } from './firebase';
import { User } from '../types/api';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to each request
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// User APIs
export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get('/users');
  return response.data;
};

export const createUser = async (): Promise<User> => {
  const response = await api.post('/users');
  return response.data;
};

export const updateUser = async (userData: Partial<User>): Promise<User> => {
  const response = await api.put('/users', userData);
  return response.data;
};

export const deleteUser = async (): Promise<void> => {
  await api.delete('/users');
}; 