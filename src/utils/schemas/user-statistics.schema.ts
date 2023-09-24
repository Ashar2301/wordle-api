import mongoose from "mongoose";
import { IUserStatistics , IDailyGames , IRandomGames } from "../../interfaces/user-statistics.js";

const Schema = mongoose.Schema;
export const UserStatistics = new Schema<IUserStatistics>(
    {
      email: { required: [true, "Email is required"], type: String },
      dailyGames :  Array<IDailyGames>,
      randomGames :  Array<IRandomGames>
    },
    { collection: "UserStatistics", timestamps: true }
  );