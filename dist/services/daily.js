import dailyDB from "../models/daily.js";
const dailyService = {};
dailyService.generateGame = async (email, hardMode) => {
    return dailyDB.generateGame(email, hardMode);
};
dailyService.registerAttempts = async (userEmail, gameID, attempt, attemptNumber) => {
    return dailyDB.registerAttempts(userEmail, gameID, attempt, attemptNumber);
};
export default dailyService;
//# sourceMappingURL=daily.js.map