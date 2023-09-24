import { Request, Response } from "express";
import express from "express";
import loginService from "../services/login.js";
import { ICustomResponse } from "../interfaces/custom-response.js";

const router = express.Router();

router.post("/signup", async (req: Request, res: Response, next: Request) => {
  try {
    let response: ICustomResponse = await loginService.createUser(
      req.body.email,
      req.body.name,
      req.body.password
    );
    res.status(response.code).json(response.response);
  } catch (e) {
    next(e);
  }
});

router.post("/login", async (req: Request, res: Response, next: Request) => {
  try {
    let response: ICustomResponse = await loginService.loginUser(
      req.body.email,
      req.body.password
    );
    res.status(response.code).json(response.response);
  } catch (e) {
    next(e);
  }
});

export default router;
