import express, { Request, Response } from "express";
import jwtService from "../services/jwt.js";
import statsService from "../services/stats.js";
const router = express.Router();

router.get(
  "/daily",
  jwtService.authenticateToken,
  async (req: Request, res: Response, next: any) => {
    try {
      const email: string = req.query.email as string;
      let resp = await statsService.getDailyStats(email);
      const accessToken = jwtService.generateAccessToken({ email });
      res.cookie("token",accessToken,{httpOnly:true});
      res.status(resp.code).json(resp.response);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/random",
  jwtService.authenticateToken,
  async (req: Request, res: Response, next: any) => {
    try {
      const email: string = req.query.email as string;
      let resp = await statsService.getRandomStats(email);
      const accessToken = jwtService.generateAccessToken({ email });
      res.cookie("token",accessToken,{httpOnly:true});
      res.status(resp.code).json(resp.response);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/answerWord",
  jwtService.authenticateToken,
  async (req: Request, res: Response, next: any) => {
    try {
      const gameId: string = req.query.gameId as string;
      const email: string = req.query.email as string;
      const gameType: string = req.query.gameType as string;
      let resp = await statsService.returnAnswerWord(gameId, email, gameType);
      const accessToken = jwtService.generateAccessToken({ email });
      res.cookie("token",accessToken,{httpOnly:true});
      res.status(resp.code).json(resp.response);
    } catch (e) {
      next(e);
    }
  }
);
export default router;
