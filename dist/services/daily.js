import dailyDB from "../models/daily.js";
const dailyService = {};
dailyService.generateGame = async (email) => {
    return dailyDB.generateGame(email);
};
dailyService.registerAttempts = async (userEmail, gameID, attempt, attemptNumber) => {
    return dailyDB.registerAttempts(userEmail, gameID, attempt, attemptNumber);
};
export default dailyService;
//# sourceMappingURL=daily.js.map