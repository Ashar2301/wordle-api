import express, { Request, Response } from "express";
import jwtService from "../services/jwt.js";
import statsService from "../services/stats.js";
import { IRequest } from "../interfaces/custom-request.js";
import { ICustomResponse } from "../interfaces/custom-response.js";
const router = express.Router();

router.get(
  "/daily",
  jwtService.authenticateToken,
  async (req: IRequest, res: Response, next: any) => {
    try {
      const email: string = req.user.email;
      let resp:ICustomResponse = await statsService.getDailyStats(email);
      res.status(resp.code).json(resp.response);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/random",
  jwtService.authenticateToken,
  async (req: IRequest, res: Response, next: any) => {
    try {
      const email: string = req.user.email;
      let resp:ICustomResponse = await statsService.getRandomStats(email);
      res.status(resp.code).json(resp.response);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/answerWord",
  jwtService.authenticateToken,
  async (req: IRequest, res: Response, next: any) => {
    try {
      const gameId: string = req.query.gameId as string;
      const email: string = req.user.email;
      const gameType: string = req.query.gameType as string;
      let resp:ICustomResponse = await statsService.returnAnswerWord(gameId, email, gameType);
      res.status(resp.code).json(resp.response);
    } catch (e) {
      next(e);
    }
  }
);
export default router;
