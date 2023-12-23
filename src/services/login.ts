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

export default loginService;
