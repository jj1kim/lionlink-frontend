import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const instance = axios.create();

export const instanceWithToken = axios.create();
instanceWithToken.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.log('Request Error!!');
    return Promise.reject(error);
  }
);

instanceWithToken.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('Response Error!!');
    return Promise.reject(error);
  }
);
