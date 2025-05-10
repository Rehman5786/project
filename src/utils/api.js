// src/utils/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:9000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerEmployee = (employeeData) => api.post('/register/employee', employeeData);
export const registerManager = (managerData) => api.post('/register/manager', managerData);
export const loginEmployee = (credentials) => api.post('/login/employee', credentials);
export const loginManager = (credentials) => api.post('/login/manager', credentials);
export const getAllEmployees = () => api.get('/employees');
export const assignTask = (taskData) => api.put('/assign', taskData);
export const getEmployeeByEmail = (email) => api.get(`/employee/email/${email}`);