import express from "express";
import jwtService from "../services/jwt.js";
import loginService from "../services/login.js";
const router = express.Router();
router.post("/signup", async (req, res, next) => {
    try {
        let response = await loginService.createUser(req.body.email, req.body.name, req.body.password);
        res.status(response.code).json(response.response);
    }
    catch (e) {
        next(e);
    }
});
router.post("/login", async (req, res, next) => {
    try {
        let response = await loginService.loginUser(req.body.email, req.body.password);
        let email = req.body.email;
        if (response.code === 200) {
            const accessToken = jwtService.generateAccessToken({
                email
            });
            res.cookie("token", accessToken, { httpOnly: true });
        }
        res.status(response.code).json(response.response);
    }
    catch (e) {
        next(e);
    }
});
router.get("/test", async (req, res, next) => {
    try {
        res.status(200).json("Hello World");
    }
    catch (e) {
        next(e);
    }
});
export default router;
//# sourceMappingURL=login.js.map