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
export default loginService;
//# sourceMappingURL=login.js.map