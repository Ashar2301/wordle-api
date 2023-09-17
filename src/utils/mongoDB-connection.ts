import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
import { User } from "./schemas/user.schema.js";

dotenv.config({ path: `./env/.${process.env.NODE_ENV}.env` });


const url = process.env.LOCAL_DATABASE_URL;

mongoose.Promise = global.Promise;

const userSchema = User;

let collection: any = {};

collection.getUserCollection = async () => {
  try {
    console.log(url);
    return (
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
    ).model("User", userSchema);
  } catch (err) {
    console.log(err);

    let error = new Error("Could not connect to database");
    // error.status = 500
    throw error;
  }
};

export default collection;
