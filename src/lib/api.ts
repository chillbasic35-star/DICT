import axios from 'axios';
import Constants from 'expo-constants';

const apiUrl =
  (Constants.expoConfig?.extra as { apiUrl?: string } | undefined)?.apiUrl ??
  'https://your-dict-api.example.com';

export const api = axios.create({
  baseURL: apiUrl,
  timeout: 15000,
});

api.interceptors.request.use(
  async config => {
    // Token can be attached here if needed via a getter
    return config;
  },
  error => Promise.reject(error)
);
