import mongoose from "mongoose";
const Schema = mongoose.Schema;
export const User = new Schema({
    name: { required: [true, "Name is required"], type: String },
    email: { required: [true, "Email is required"], type: String },
    password: { required: [true, "Password is required"], type: String },
}, { collection: "Users", timestamps: true });
//# sourceMappingURL=user.schema.js.map