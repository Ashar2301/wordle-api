import express, { Request, Response } from "express";
import jwtService from "../services/jwt.js";
import randomService from "../services/random.js";
import { IRequest } from "../interfaces/custom-request.js";
import { ICustomResponse } from "../interfaces/custom-response.js";

const router = express.Router();

router.get(
  "/",
  jwtService.authenticateToken,
  async (req: IRequest, res: Response, next: any) => {
    try {
      const email: string = req.user.email;
      const hardMode: string = req.query.hardMode as string;
      let resp:ICustomResponse = await randomService.generateGame(email, hardMode);
      res.status(resp.code).json(resp.response);
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
      let resp:ICustomResponse = await randomService.registerAttempts(
        req.user.email,
        req.body.gameID,
        req.body.attempt,
        req.body.attemptNumber
      );
      const email: string = req.user.email;
      res.status(resp.code).json(resp.response);
    } catch (e) {
      next(e);
    }
  }
);
export default router;
