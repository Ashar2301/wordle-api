import bcrypt from "bcrypt";
import { ICustomResponse } from "../interfaces/custom-response.js";
import { IUser } from "../interfaces/user.js";
import collection from "../utils/mongoDB-connection.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwtService from "../services/jwt.js";

dotenv.config({ path: `./env/.${process.env.NODE_ENV}.env` });
const loginDB: any = {};
const email: string = `
<div
      style="
        background-color: black;
        color: white;
        text-align: center;
        padding: 2rem;
      "
    >
    <img src="https://ylx1uza3n0czqwem.public.blob.vercel-storage.com/LogoFinal.jpg" alt="worldelogo">
      <h3>We have recieved a request to reset password for {{userEmail}}</h3>
      <h4>
        Just click on the button below to create a new password. The link will
        be active for the next 30 minutes.
      </h4>
      <a href="{{resetPasswordLink}}">
        <button
          style="
            width: 10rem;
            height: 3rem;
            background-color: black;
            color: white;
            border: 1px solid white;
          "
        >
          Reset Password
        </button>
      </a>
    </div>
`;
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
    const data: IUser = {
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

loginDB.returnUserCreds = async (userEmail: string) => {
  let user = await loginDB.findUserByEmail(userEmail);
  if (user) {
    return {
      code: 200,
      response: {
        email: user.email,
        name: user.name,
      },
    };
  } else {
    return { code: 404, response: "User not found" };
  }
};

loginDB.checkIfEmailExists = async (userEmail: string) => {
  let user = await loginDB.findUserByEmail(userEmail);
  if (user) return { code: 200, response: "User found!" };
  return { code: 404, response: "User not found!" };
};

loginDB.sendResetPasswordEmail = async (userEmail: string) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_ID,
      pass: process.env.GMAIL_PASS,
    },
  });
  let token = jwtService.generateAccessToken({
    email: userEmail,
  });
  let newEmail = email
    .replace("{{userEmail}}", userEmail)
    .replace(
      "{{resetPasswordLink}}",
      `https://wordle-by-ashar.vercel.app/forgotPassword/${token}`
    );
  let info = await transporter.sendMail({
    from: process.env.GMAIL_ID,
    to: userEmail,
    subject: "Reset password",
    html: newEmail,
  });

  if (info.messageId) {
    return { code: 200, response: "Email sent successfully!" };
  } else {
    return { code: 401, response: "Some error occured!" };
  }
};

loginDB.resetPassword = async (userEmail: string, password: string) => {
  let model = await collection.getUserCollection();
  const hashedPassword = await bcrypt.hash(password, 10);
  let res = await model.findOneAndUpdate(
    { email: userEmail },
    { password: hashedPassword }
  );
  if (res) {
    return { code: 200, response: "Password changed successfully!" };
  } else {
    return { code: 401, response: "Some error occured!" };
  }
};

export default loginDB;
