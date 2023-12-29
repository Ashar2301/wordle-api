import loginDB from "../models/login.js";
const loginService = {};
loginService.loginUser = async (userEmail, userPassword) => {
    return loginDB.loginUser(userEmail, userPassword);
};
loginService.createUser = async (userEmail, userName, userPassword) => {
    return loginDB.createUser(userEmail, userName, userPassword);
};
loginService.returnUserCreds = async (userEmail) => {
    return loginDB.returnUserCreds(userEmail);
};
loginService.checkIfEmailExists = async (userEmail) => {
    return loginDB.checkIfEmailExists(userEmail);
};
loginService.sendResetPasswordEmail = async (userEmail) => {
    return loginDB.sendResetPasswordEmail(userEmail);
};
loginService.resetPassword = async (userEmail, password) => {
    return loginDB.resetPassword(userEmail, password);
};
export default loginService;
//# sourceMappingURL=login.js.map