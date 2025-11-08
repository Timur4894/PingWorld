import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

const axiosClient = axios.create({
  baseURL: 'https://ping-world-api-prod-150424932423.europe-west1.run.app',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const loadToken = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (token) {
      console.log('🔑 Token loaded from storage');
      return token;
    }
    return null;
  } catch (error) {
    console.error('Error loading token:', error);
    return null;
  }
};

export const saveToken = async (token) => {
  try {
    if (token) {
      await AsyncStorage.setItem(TOKEN_KEY, token);
      console.log('💾 Token saved to storage');
    } else {
      await AsyncStorage.removeItem(TOKEN_KEY);
      console.log('🗑️ Token removed from storage');
    }
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

export const saveRefreshToken = async (refreshToken) => {
  try {
    if (refreshToken) {
      await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      console.log('💾 Refresh token saved to storage');
    } else {
      await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
      console.log('🗑️ Refresh token removed from storage');
    }
  } catch (error) {
    console.error('Error saving refresh token:', error);
  }
};

export const clearTokens = async () => {
  await saveToken(null);
  await saveRefreshToken(null);
};

const loadRefreshToken = async () => {
  try {
    return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error('Error loading refresh token:', error);
    return null;
  }
};

const refreshAccessToken = async () => {
  try {
    const refreshToken = await loadRefreshToken();
    if (!refreshToken) {
      console.log('❌ No refresh token available');
      return null;
    }

    console.log('🔄 Attempting to refresh access token...');
    const response = await axios.post(
      `${axiosClient.defaults.baseURL}/api/v1/auth/refresh`,
      { refresh_token: refreshToken },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const newToken = response.data?.data?.token || 
                    response.data?.data?.access_token || 
                    response.data?.token ||
                    response.data?.access_token;
    
    const newRefreshToken = response.data?.data?.refresh_token || 
                           response.data?.refresh_token;
    
    if (newToken) {
      await saveToken(newToken);
      console.log('✅ Access token refreshed successfully');
      
      if (newRefreshToken) {
        await saveRefreshToken(newRefreshToken);
        console.log('✅ Refresh token updated');
      }
      
      return newToken;
    }
    
    console.warn('⚠️ No token in refresh response');
    return null;
  } catch (error) {
    console.error('❌ Failed to refresh token:', error.response?.status);
    await clearTokens();
    return null;
  }
};

axiosClient.interceptors.request.use(
  async (config) => {
    const url = config.url || '';
    const isAuthEndpoint = url.includes('/auth/login') || url.includes('/auth/signup') || url.includes('/auth/refresh');
    
    if (!isAuthEndpoint) {
      const token = await loadToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('🔑 Token added to request');
      } else {
        console.log('⚠️ No token available for request');
      }
    } else {
      console.log('🔐 Auth endpoint - not adding token');
    }
    
    console.log('🌐 API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      hasToken: !!config.headers.Authorization,
      isAuthEndpoint,
    });
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  async (response) => {
    const url = response.config?.url || 'unknown';
    const isAuthEndpoint = url.includes('/auth/login') || url.includes('/auth/signup');
    
    if (isAuthEndpoint && response.data) {
      const token = response.data?.data?.token || 
                   response.data?.data?.access_token || 
                   response.data?.token ||
                   response.data?.access_token;
      
      const refreshToken = response.data?.data?.refresh_token || 
                          response.data?.refresh_token;
      
      console.log('🔍 Auth response structure:', {
        hasData: !!response.data?.data,
        hasToken: !!token,
        hasRefreshToken: !!refreshToken,
        responseKeys: Object.keys(response.data || {}),
      });
      
      if (token) {
        await saveToken(token);
        console.log('✅ Token saved after authentication');
      } else {
        console.warn('⚠️ No token found in auth response');
        console.warn('   Response data:', JSON.stringify(response.data, null, 2));
      }
      
      if (refreshToken) {
        await saveRefreshToken(refreshToken);
        console.log('✅ Refresh token saved after authentication');
      }
    }
    
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      const errorUrl = error.config?.url || '';
      const isAuthEndpoint = errorUrl.includes('/auth/login') || 
                            errorUrl.includes('/auth/signup') || 
                            errorUrl.includes('/auth/refresh');
      
      if (!isAuthEndpoint) {
        console.error('❌ 401 UNAUTHORIZED on protected endpoint');
        console.log('   Request URL:', errorUrl);
        
        originalRequest._retry = true;
        const newToken = await refreshAccessToken();
        
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          console.log('🔄 Retrying request with new token');
          return axiosClient(originalRequest);
        } else {
          console.log('❌ Failed to refresh token, clearing auth data');
          await clearTokens();
        }
      } else {
        console.log('ℹ️ 401 error on auth endpoint - this is expected for failed auth');
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosClient;
