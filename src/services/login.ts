import loginDB from "../models/login.js";
import jwt from 'jsonwebtoken'

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

export default loginService;
