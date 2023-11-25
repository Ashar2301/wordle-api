import { Request, Response } from "express";
import express from "express";
import statsService from "../services/stats.js";
import jwtService from "../services/jwt.js";
const router = express.Router();

router.get(
  "/daily",
  jwtService.authenticateToken,
  async (req: Request, res: Response, next: Request) => {
    try {
      const email: string = req.query.email;
      let resp = await statsService.getDailyStats(email);
      const accessToken = jwtService.generateAccessToken({ email });
      res.set("authorization", accessToken);
      res.status(resp.code).json(resp.response);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/random",
  jwtService.authenticateToken,
  async (req: Request, res: Response, next: Request) => {
    try {
      const email: string = req.query.email;
      let resp = await statsService.getRandomStats(email);
      const accessToken = jwtService.generateAccessToken({ email });
      res.set("authorization", accessToken);
      res.status(resp.code).json(resp.response);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/answerWord",
  jwtService.authenticateToken,
  async (req: Request, res: Response, next: Request) => {
    try {
      const gameId: number = req.query.gameId;
      const email: string = req.query.email;
      const gameType: string = req.query.gameType;
      let resp = await statsService.returnAnswerWord(gameId, email, gameType);
      const accessToken = jwtService.generateAccessToken({ email });
      res.set("authorization", accessToken);
      res.status(resp.code).json(resp.response);
    } catch (e) {
      next(e);
    }
  }
);
export default router;
