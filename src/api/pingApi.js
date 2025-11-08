import axiosClient from './axiosClient';

const pingApi = {
  sendPing: () => axiosClient.post('/api/v1/ping'),

  sendPingBack: (ping_id) => axiosClient.post('/api/v1/ping/send-back', {
    ping_id,
  }),

  getReceivedPings: (page = 1, limit = 10) =>
    axiosClient.get('/api/v1/ping/received', {
      params: { page, limit },
    }),
};

export default pingApi;

