import mongoose from "mongoose";
import { IBugReports } from "../../interfaces/bug-reports.js";

const Schema = mongoose.Schema;
export const BugReports = new Schema<IBugReports>(
  {
    description: { required: [true, "Description is required"], type: String },
    file: {},
  },
  { collection: "BugReports", timestamps: true }
);
