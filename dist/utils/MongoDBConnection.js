import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: `./env/.${process.env.NODE_ENV}.env` });
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
// mongoose.set('useCreateIndex', true)
const url = process.env.LOCAL_DATABASE_URL;
const userSchema = new Schema({
    username: { required: [true, "Username is required"], type: String },
    name: { required: [true, "Name is required"], type: String },
    password: { required: [true, "Password is required"], type: String },
}, { collection: "Users", timestamps: true });
let collection = {};
collection.getUserCollection = async () => {
    try {
        console.log(url);
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
export default collection;
//# sourceMappingURL=MongoDBConnection.js.map