import { Request, Response } from "express";
import express from "express";
import statsService from "../services/stats.js";

const router = express.Router();

router.get("/daily", async (req: Request, res: Response, next: Request) => {
  try {
    const email: string = req.query.email;    
    let resp = await statsService.getDailyStats(email);
    res.status(200).json(resp.response);
  } catch (e) {
    next(e);
  }
});

router.get("/random", async (req: Request, res: Response, next: Request) => {
  try {
    const email: string = req.query.email;
    let resp = await statsService.getRandomStats(email);
    res.status(200).json(resp.response);
  } catch (e) {
    next(e);
  }
});
export default router;
