import axiosClient from './axiosClient';

const leaderboardApi = {
  getLeaderboard: (limit = 20) =>
    axiosClient.get('/api/v1/leaderboard', {
      params: { limit },
    }),
};

export default leaderboardApi;

