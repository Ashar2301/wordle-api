import { Request, Response } from "express";
import express from "express";
import randomService from "../services/random.js";
import jwtService from "../services/jwt.js";

const router = express.Router();

router.get(
  "/",
  jwtService.authenticateToken,
  async (req: Request, res: Response, next: Request) => {
    try {
      const email: string = req.query.email;
      const hardMode: boolean = req.query.hardMode;
      let resp = await randomService.generateGame(email, hardMode);
      const accessToken = jwtService.generateAccessToken({ email });
      res.set("authorization", accessToken);
      res.status(200).json(resp.response);
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/attempt",
  jwtService.authenticateToken,
  async (req: Request, res: Response, next: Request) => {
    try {
      let resp = await randomService.registerAttempts(
        req.body.email,
        req.body.gameID,
        req.body.attempt,
        req.body.attemptNumber
      );
      const email: string = req.body.email;
      const accessToken = jwtService.generateAccessToken({ email });
      res.set("authorization", accessToken);
      res.status(200).json(resp.response);
    } catch (e) {
      next(e);
    }
  }
);
export default router;
