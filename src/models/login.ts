import bcrypt from "bcrypt";
import { ICustomResponse } from "../interfaces/custom-response.js";
import { IUser } from "../interfaces/user.js";
import collection from "../utils/mongoDB-connection.js";

const loginDB: any = {};

loginDB.loginUser = async (
  userEmail: string,
  userPassword: string
): Promise<ICustomResponse> => {
  try {
    let response = await loginDB.findUserByEmail(userEmail);

    if (response) {
      if (await bcrypt.compare(userPassword, response.password)) {
        return { code: 200, response: "Success" };
      } else {
        return { code: 401, response: "Invalid credentials" };
      }
    } else {
      return { code: 404, response: "User not found" };
    }
  } catch (e) {
    throw e;
  }
};

loginDB.createUser = async (
  userEmail: string,
  userName: string,
  userPassword: string
): Promise<ICustomResponse> => {
  try {
    let isUserExists = await loginDB.findUserByEmail(userEmail);

    if (isUserExists) {
      return { code: 401, response: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10);
    const data:IUser = {
      email: userEmail,
      name: userName,
      password: hashedPassword,
    };

    let model = await collection.getUserCollection();
    let response = await model.create(data);
    if (response) {
      return { code: 200, response: "Success" };
    } else {
      return { code: 500, response: "Error creating document" };
    }
  } catch (e) {
    throw e;
  }
};

loginDB.findUserByEmail = async (userEmail: string) => {
  let model = await collection.getUserCollection();
  return await model.findOne({ email: userEmail });
};

export default loginDB;
