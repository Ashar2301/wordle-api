import { words } from "../constants/five-letter-words.js";
import {
  IStatisticsObject,
  IUserStatistics
} from "../interfaces/user-statistics.js";
import collection from "../utils/mongoDB-connection.js";
const statsDB: any = {};

statsDB.getDailyStats = async (email: string) => {
  let user: IUserStatistics = await statsDB.findUserByEmail(email);
  if (!user) return { code: 404, response: "User not found" };
  let games = user.dailyGames;
  let stats: IStatisticsObject = statsDB.returnStats(games);
  return { code: 200, response: stats };
};
statsDB.getRandomStats = async (email: string) => {
  let user: IUserStatistics = await statsDB.findUserByEmail(email);
  if (!user) return { code: 404, response: "User not found" };
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

  return userStats;
};
statsDB.findUserByEmail = async (userEmail: string) => {
  let model = await collection.getUserStatisticsCollection();
  return await model.findOne({ email: userEmail });
};

statsDB.returnAnswerWord = async (
  gameId: number,
  email: string,
  gameType: string
) => {
  let user: IUserStatistics = await statsDB.findUserByEmail(email);
  if (!user) return { code: 404, response: "User not found" };
  let games: any[] = [];
  if (gameType === "RANDOM") games = user.randomGames;
  else if (gameType === "DAILY") games = user.dailyGames;
  let flag: boolean = false;
  games.forEach((elm: any) => {
    if (
      elm._id == gameId &&
      elm.solved === false &&
      elm.attempts.letters.length === 6
    ) {
      flag = true;
      return;
    }
  });
  if (flag) return { code: 200, response: words[gameId] };
  return { code: 404, response: "Game not found" };
};
export default statsDB;
