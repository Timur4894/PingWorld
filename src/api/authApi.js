import axiosClient from './axiosClient';

const authApi = {
  signup: (nickname, password, contacts, country) =>
    axiosClient.post('/api/v1/auth/signup', { nickname, password, contacts, country }),

  login: (nickname, password) =>
    axiosClient.post('/api/v1/auth/login', { nickname, password }),

  logout: () => axiosClient.post('/api/v1/auth/logout'),
};

export default authApi;