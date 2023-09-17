import collection from "../utils/mongoDB-connection.js";
import express from 'express';
const router = express.Router();
router.post("/signup", async (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    console.log(email, name, password);
    const data = { email, name, password };
    let model = await collection.getUserCollection();
    let response = await model.create(data);
    if (response) {
        res.status(200).json(response);
    }
    else {
        return res.status(401).send("Error creating document");
    }
});
export default router;
//# sourceMappingURL=login.js.map