import dailyDB from "../models/daily.js";

const dailyService: any = {};

dailyService.generateGame = async (email: string) => {
  return dailyDB.generateGame(email);
};

dailyService.registerAttempts = async (
  userEmail: string,
  gameID: number,
  attempt: Array<any>,
  attemptNumber: number
) => {
  return dailyDB.registerAttempts(userEmail, gameID, attempt, attemptNumber);
};

export default dailyService;
