import randomDB from "../models/random.js";

const randomService: any = {};

randomService.generateGame = async (email: string) => {
  return randomDB.generateGame(email);
};

randomService.registerAttempts = async (
  userEmail: string,
  gameID: number,
  attempt: Array<any>,
  attemptNumber: number
) => {
  return randomDB.registerAttempts(userEmail, gameID, attempt, attemptNumber);
};

export default randomService;