import collection from "../utils/mongoDB-connection.js";
import bcrypt from "bcrypt";
const loginDB = {};
loginDB.loginUser = async (userEmail, userPassword) => {
    try {
        let response = await loginDB.findUserByEmail(userEmail);
        if (response) {
            if (await bcrypt.compare(userPassword, response.password)) {
                return { code: 200, response: "Success" };
            }
            else {
                return { code: 401, response: "Invalid credentials" };
            }
        }
        else {
            return { code: 404, response: "User not found" };
        }
    }
    catch (e) {
        throw e;
    }
};
loginDB.createUser = async (userEmail, userName, userPassword) => {
    try {
        let isUserExists = await loginDB.findUserByEmail(userEmail);
        if (isUserExists) {
            return { code: 401, response: "User already exists" };
        }
        const hashedPassword = await bcrypt.hash(userPassword, 10);
        const data = {
            email: userEmail,
            name: userName,
            password: hashedPassword,
        };
        let model = await collection.getUserCollection();
        let response = await model.create(data);
        if (response) {
            return { code: 200, response: "Success" };
        }
        else {
            return { code: 500, response: "Error creating document" };
        }
    }
    catch (e) {
        throw e;
    }
};
loginDB.findUserByEmail = async (userEmail) => {
    let model = await collection.getUserCollection();
    return await model.findOne({ email: userEmail });
};
export default loginDB;
//# sourceMappingURL=login.js.map