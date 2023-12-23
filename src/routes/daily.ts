import express, { Request, Response } from "express";
import dailyService from "../services/daily.js";
import jwtService from "../services/jwt.js";
import { IRequest } from "../interfaces/custom-request.js";

const router = express.Router();

router.get(
  "/",
  jwtService.authenticateToken,
  async (req: IRequest, res: Response, next: any) => {
    try {
      const email: string = req.user.email;
      const hardMode: string = req.query.hardMode as string;
      let resp = await dailyService.generateGame(email, hardMode);
      const accessToken = jwtService.generateAccessToken({ email });
      res.cookie("token", accessToken, { httpOnly: true });
      res.status(200).json(resp.response);
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/attempt",
  jwtService.authenticateToken,
  async (req: IRequest, res: Response, next: any) => {
    try {
      let resp = await dailyService.registerAttempts(
        req.user.email,
        req.body.gameID,
        req.body.attempt,
        req.body.attemptNumber
      );
      const email: string = req.user.email;
      const accessToken = jwtService.generateAccessToken({ email });
      res.cookie("token", accessToken, { httpOnly: true });
      res.status(200).json(resp.response);
    } catch (e) {
      next(e);
    }
  }
);
export default router;
