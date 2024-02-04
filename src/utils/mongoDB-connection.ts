import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import { UserStatistics } from "./schemas/user-statistics.schema.js";
import { User } from "./schemas/user.schema.js";
import { BugReports } from "./schemas/bug-reports.schema.js";

dotenv.config({ path: `./env/.${process.env.NODE_ENV}.env` });

const url = process.env.DEPLOYED_DATABASE_URL;

mongoose.Promise = global.Promise;

const userSchema = User;
const userStatisticsSchema = UserStatistics;

let collection: any = {};

collection.getUserCollection = async () => {
  try {
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

collection.getUserStatisticsCollection = async () => {
  try {
    return (
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
    ).model("UserStatistics", userStatisticsSchema);
  } catch (err) {
    console.log(err);

    let error = new Error("Could not connect to database");
    // error.status = 500
    throw error;
  }
};

collection.getReportBugsCollection = async () => {
  try {
    return (
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
    ).model("BugReports", BugReports);
  } catch (err) {
    console.log(err);

    let error = new Error("Could not connect to database");
    // error.status = 500
    throw error;
  }
};

export default collection;
