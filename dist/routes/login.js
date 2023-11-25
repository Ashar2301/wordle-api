import express from "express";
import loginService from "../services/login.js";
import jwtService from "../services/jwt.js";
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
        const accessToken = jwtService.generateAccessToken({ email });
        res.set("authorization", accessToken);
        res.status(response.code).json(response.response);
    }
    catch (e) {
        next(e);
    }
});
export default router;
//# sourceMappingURL=login.js.map