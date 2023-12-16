import dotenv from "dotenv";
import mongoose from "mongoose";
import { UserStatistics } from './schemas/user-statistics.schema.js';
import { User } from "./schemas/user.schema.js";
dotenv.config({ path: `./env/.${process.env.NODE_ENV}.env` });
const url = process.env.DEPLOYED_DATABASE_URL;
mongoose.Promise = global.Promise;
const userSchema = User;
const userStatisticsSchema = UserStatistics;
let collection = {};
collection.getUserCollection = async () => {
    try {
        return (await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })).model("User", userSchema);
    }
    catch (err) {
        console.log(err);
        let error = new Error("Could not connect to database");
        // error.status = 500
        throw error;
    }
};
collection.getUserStatisticsCollection = async () => {
    try {
        return (await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })).model("UserStatistics", userStatisticsSchema);
    }
    catch (err) {
        console.log(err);
        let error = new Error("Could not connect to database");
        // error.status = 500
        throw error;
    }
};
export default collection;
//# sourceMappingURL=mongoDB-connection.js.map