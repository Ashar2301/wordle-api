import mongoose from "mongoose";
const Schema = mongoose.Schema;
export const UserStatistics = new Schema({
    email: { required: [true, "Email is required"], type: String },
    dailyGames: (Array),
    randomGames: (Array)
}, { collection: "UserStatistics", timestamps: true });
//# sourceMappingURL=user-statistics.schema.js.map