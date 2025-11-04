import axiosClient from './axiosClient';

const userManagementApi = {

  getMe: () => axiosClient.get('/api/v1/users/me'),

  getUser: (id) => axiosClient.get(`/api/v1/users/${id}`),

  updateProfile: (data) => axiosClient.put('/api/v1/users/me', data),

  addFCMToken: (token) => axiosClient.post('/api/v1/users/me/fcm', { token }),

  deleteMe: () => axiosClient.delete('/api/v1/users/me'),

  reportUser: (userId, message) =>
    axiosClient.post(`/api/v1/users/${userId}/report`, { message }),
};

export default userManagementApi;