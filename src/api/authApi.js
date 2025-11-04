import axiosClient from './axiosClient';

const authApi = {
  signup: (nickname, password, contacts) =>
    axiosClient.post('/api/v1/auth/signup', { nickname, password, contacts }),

  login: (nickname, password) =>
    axiosClient.post('/api/v1/auth/login', { nickname, password }),

  logout: () => axiosClient.post('/api/v1/auth/logout'),
};

export default authApi;