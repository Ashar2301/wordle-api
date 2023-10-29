import statsDB from "../models/stats.js";

const statsService: any = {};

statsService.getDailyStats = async (email: string) => {
  return statsDB.getDailyStats(email);
};
statsService.getRandomStats = async (email: string) => {
  return statsDB.getRandomStats(email);
};

export default statsService;
