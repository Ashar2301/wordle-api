import randomDB from "../models/random.js";

const randomService: any = {};

randomService.generateGame = async (email: string, hardMode: boolean) => {
  return randomDB.generateGame(email, hardMode);
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
