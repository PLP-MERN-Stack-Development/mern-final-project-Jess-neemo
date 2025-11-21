// client/src/services/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Public endpoints
export const submitReport = (data) => api.post('/reports', data);
export const getResources = (type) => api.get(`/resources${type ? `?type=${type}` : ''}`);

// Auth
export const login = (credentials) => api.post('/auth/login', credentials);

// Admin (protected)
export const getReports = () => api.get('/reports');

export default api;