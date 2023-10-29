import { Request, Response } from "express";
import express from "express";
import randomService from "../services/random.js";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: Request) => {
  try {
    const email: string = req.query.email;
    let resp = await randomService.generateGame(email);
    res.status(200).json(resp.response);
  } catch (e) {
    next(e);
  }
});

router.post("/attempt", async (req: Request, res: Response, next: Request) => {
  try {
    let resp = await randomService.registerAttempts(
      req.body.email,
      req.body.gameID,
      req.body.attempt,
      req.body.attemptNumber
    );
    res.status(200).json(resp.response);
  } catch (e) {
    next(e);
  }
});
export default router;
