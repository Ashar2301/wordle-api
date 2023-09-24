import dailyDB from "../models/daily.js";
const dailyService = {};
dailyService.generateGame = async (email) => {
    return dailyDB.generateGame(email);
};
//# sourceMappingURL=routes.js.map