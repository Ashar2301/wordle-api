import dailyDB from "../models/daily.js";
const dailyService = {};
dailyService.generateGame = async (email) => {
    return dailyDB.generateGame(email);
};
export default dailyService;
//# sourceMappingURL=daily.js.map