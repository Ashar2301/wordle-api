import mongoose from "mongoose";
import { IUser } from "../../interfaces/user.js";

const Schema = mongoose.Schema;
export const User = new Schema<IUser>(
    {
      name: { required: [true, "Name is required"], type: String },
      email: { required: [true, "Email is required"], type: String },
      password: { required: [true, "Password is required"], type: String },
    },
    { collection: "Users", timestamps: true }
  );