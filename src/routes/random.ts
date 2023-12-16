import express, { Request, Response } from "express";
import jwtService from "../services/jwt.js";
import randomService from "../services/random.js";

const router = express.Router();

router.get(
  "/",
  jwtService.authenticateToken,
  async (req: Request, res: Response, next: any) => {
    try {
      const email: string = req.query.email as string;
      const hardMode: string = req.query.hardMode as string;
      let resp = await randomService.generateGame(email, hardMode);
      const accessToken = jwtService.generateAccessToken({ email });
      res.cookie("token",accessToken,{httpOnly:true});
      res.status(200).json(resp.response);
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/attempt",
  jwtService.authenticateToken,
  async (req: Request, res: Response, next: any) => {
    try {
      let resp = await randomService.registerAttempts(
        req.body.email,
        req.body.gameID,
        req.body.attempt,
        req.body.attemptNumber
      );
      const email: string = req.body.email;
      const accessToken = jwtService.generateAccessToken({ email });
      res.cookie("token",accessToken,{httpOnly:true});
      res.status(200).json(resp.response);
    } catch (e) {
      next(e);
    }
  }
);
export default router;
