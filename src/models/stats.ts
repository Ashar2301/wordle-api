import collection from "../utils/mongoDB-connection.js";
import {
  IDailyGames,
  IStatisticsObject,
  IUserStatistics,
} from "../interfaces/user-statistics.js";

const statsDB: any = {};

statsDB.getDailyStats = async (email: string) => {
  let user: IUserStatistics = await statsDB.findUserByEmail(email);
  let games = user.dailyGames;
  let stats: IStatisticsObject = statsDB.returnStats(games);
  return { code: 200, response: stats };
};
statsDB.getRandomStats = async (email: string) => {
  let user: IUserStatistics = await statsDB.findUserByEmail(email);
  let games = user.randomGames;
  let stats: IStatisticsObject = statsDB.returnStats(games);
  return { code: 200, response: stats };
};

statsDB.returnStats = (games: any[]): IStatisticsObject => {
  let wins = 0;
  let guessDistribution: number[] = [0, 0, 0, 0, 0, 0];
  let maxStreak: number = 0;
  let currentStreak: number = 0;
  games.forEach((elm: any, index: number) => {
    if (elm.solved) {
      wins++;
      guessDistribution[elm.solvedInAttempts - 1]++;
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  });

  let userStats: IStatisticsObject = {
    played: games.length,
    percentageWins: (wins / games.length) * 100,
    maxStreak,
    currentStreak,
    guessDistribution,
  };
  console.log(userStats);

  return userStats;
};
statsDB.findUserByEmail = async (userEmail: string) => {
  let model = await collection.getUserStatisticsCollection();
  return await model.findOne({ email: userEmail });
};
export default statsDB;
