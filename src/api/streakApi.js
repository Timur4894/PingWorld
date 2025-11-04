import axiosClient from './axiosClient';

const streakApi = {
  getUserStreak: () => axiosClient.get('/api/v1/streak/me'),
};

export default streakApi;

