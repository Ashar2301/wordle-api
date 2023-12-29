import loginDB from "../models/login.js";

const loginService: any = {};

loginService.loginUser = async (userEmail: string, userPassword: string) => {
  return loginDB.loginUser(userEmail, userPassword);
};

loginService.createUser = async (
  userEmail: string,
  userName: string,
  userPassword: string
) => {
  return loginDB.createUser(userEmail, userName, userPassword);
};

loginService.returnUserCreds = async (userEmail: string) => {
  return loginDB.returnUserCreds(userEmail);
};

loginService.checkIfEmailExists = async (userEmail: string) => {
  return loginDB.checkIfEmailExists(userEmail);
};

loginService.sendResetPasswordEmail = async (userEmail: string) => {
  return loginDB.sendResetPasswordEmail(userEmail);
};

loginService.resetPassword = async (userEmail: string, password: string) => {
  return loginDB.resetPassword(userEmail, password);
};

export default loginService;
