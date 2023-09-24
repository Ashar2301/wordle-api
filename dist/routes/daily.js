import express from "express";
import dailyService from '../services/daily.js';
const router = express.Router();
router.get("/", async (req, res, next) => {
    try {
        const email = req.query.email;
        console.log(email);
        let resp = await dailyService.generateGame(email);
        res.status(200).json(resp.response);
    }
    catch (e) {
        next(e);
    }
});
export default router;
//# sourceMappingURL=daily.js.map