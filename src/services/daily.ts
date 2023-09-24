import dailyDB from "../models/daily.js";

const dailyService: any = {};

dailyService.generateGame = async (email: string) => {
  return dailyDB.generateGame(email);
};

export default dailyService;