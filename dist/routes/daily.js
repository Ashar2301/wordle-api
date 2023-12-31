import express from "express";
import dailyService from "../services/daily.js";
import jwtService from "../services/jwt.js";
const router = express.Router();
router.get("/", jwtService.authenticateToken, async (req, res, next) => {
    try {
        const email = req.user.email;
        const hardMode = req.query.hardMode;
        let resp = await dailyService.generateGame(email, hardMode);
        const accessToken = jwtService.generateAccessToken({ email });
        res.cookie("token", accessToken, { httpOnly: true });
        res.status(resp.code).json(resp.response);
    }
    catch (e) {
        next(e);
    }
});
router.post("/attempt", jwtService.authenticateToken, async (req, res, next) => {
    try {
        let resp = await dailyService.registerAttempts(req.user.email, req.body.gameID, req.body.attempt, req.body.attemptNumber);
        const email = req.user.email;
        const accessToken = jwtService.generateAccessToken({ email });
        res.cookie("token", accessToken, { httpOnly: true });
        res.status(resp.code).json(resp.response);
    }
    catch (e) {
        next(e);
    }
});
export default router;
//# sourceMappingURL=daily.js.map