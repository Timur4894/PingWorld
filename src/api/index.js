import authApi from './authApi';
import userManagementApi from './userManagementApi';
import pingApi from './pingApi';
import streakApi from './streakApi';
import leaderboardApi from './leaderboardApi';
import healthApi from './healthApi';

export {
  authApi,
  userManagementApi,
  pingApi,
  streakApi,
  leaderboardApi,
  healthApi,
};

export default {
  auth: authApi,
  user: userManagementApi,
  ping: pingApi,
  streak: streakApi,
  leaderboard: leaderboardApi,
  health: healthApi,
};

