import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

let cookieStore = '';

const axiosClient = axios.create({
  baseURL: 'https://ping-world-api-prod-150424932423.europe-west1.run.app',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const loadCookies = async () => {
  try {
    const savedCookies = await AsyncStorage.getItem('cookies');
    if (savedCookies) {
      cookieStore = savedCookies;
      console.log('Cookies loaded from storage:', savedCookies);
      return savedCookies;
    } else {
      console.log('No cookies found in storage');
      cookieStore = '';
      return null;
    }
  } catch (error) {
    console.error('Error loading cookies:', error);
    cookieStore = '';
    return null;
  }
};

const saveCookies = async (cookies) => {
  try {
    cookieStore = cookies;
    await AsyncStorage.setItem('cookies', cookies);
    console.log('Cookies saved to storage:', cookies);
  } catch (error) {
    console.error('Error saving cookies:', error);
  }
};

const extractCookies = (headers) => {
  const setCookieHeaders = headers['set-cookie'] || headers['Set-Cookie'];
  if (!setCookieHeaders) {
    return null;
  }
  
  console.log('Set-Cookie headers received:', setCookieHeaders);
  
  const cookieHeader = Array.isArray(setCookieHeaders) ? setCookieHeaders[0] : setCookieHeaders;
  
  const cookieMatch = cookieHeader.match(/^([^=]+=[^;]+)/);
  const extracted = cookieMatch ? cookieMatch[1] : null;
  if (extracted) {
    console.log('Extracted cookie:', extracted);
  }
  return extracted;
};

axiosClient.interceptors.request.use(
  async (config) => {
    if (!cookieStore) {
      await loadCookies();
    }
    
    if (cookieStore) {
      config.headers.Cookie = cookieStore;
      console.log('Cookie added to request:', cookieStore.substring(0, 50) + '...');
    } else {
      console.log('No cookie to add to request');
    }
    
    console.log('API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      cookie: cookieStore ? 'present' : 'missing',
      cookieHeader: config.headers.Cookie ? config.headers.Cookie.substring(0, 50) + '...' : 'none',
    });
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  async (response) => {
    const cookies = extractCookies(response.headers);
    if (cookies) {
      await saveCookies(cookies);
      console.log('Cookies saved:', cookies);
    }
    
    if (__DEV__) {
      console.log('API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
        cookies: response.headers['set-cookie'] || response.headers['Set-Cookie'],
      });
    }
    return response;
  },
  async (error) => {
    if (error.response?.headers) {
      const cookies = extractCookies(error.response.headers);
      if (cookies) {
        await saveCookies(cookies);
      }
    }
    
    if (__DEV__) {
      console.error('API Error:', {
        status: error.response?.status,
        url: error.config?.url,
        message: error.message,
        data: error.response?.data,
      });
    }
    
    if (error.response?.status === 401) {
      cookieStore = '';
      await AsyncStorage.removeItem('cookies');
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
