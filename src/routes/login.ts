import express, { Request, Response } from "express";
import { ICustomResponse } from "../interfaces/custom-response.js";
import jwtService from "../services/jwt.js";
import loginService from "../services/login.js";
import { IRequest } from "../interfaces/custom-request.js";
const router = express.Router();

router.post("/signup", async (req: Request, res: Response, next: any) => {
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

router.post("/login", async (req: Request, res: Response, next: any) => {
  try {
    let response: ICustomResponse = await loginService.loginUser(
      req.body.email,
      req.body.password
    );
    let email = req.body.email;
    let rememberMe = req.body.rememberMe;
    if (response.code === 200) {
      const accessToken = jwtService.generateAccessToken({
        email,
      });
      res.cookie("token", accessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        expires: rememberMe
          ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          : undefined,
      });
    }
    res.status(response.code).json(response.response);
  } catch (e) {
    next(e);
  }
});
router.get("/test", async (req: Request, res: Response, next: any) => {
  try {
    res.status(200).json("Hello World xd");
  } catch (e) {
    next(e);
  }
});

router.get("/logout", async (req: Request, res: Response, next: any) => {
  try {
    res.clearCookie("token");
    res.status(200).json("Logged out");
  } catch (e) {
    next(e);
  }
});

router.post(
  "/forgotPassword",
  async (req: Request, res: Response, next: any) => {
    try {
      let response: ICustomResponse = await loginService.checkIfEmailExists(
        req.body.email
      );
      if (response.code === 200) {
        let response2: ICustomResponse =
          await loginService.sendResetPasswordEmail(req.body.email);
        res.status(response2.code).json(response2.response);
      } else {
        res.status(response.code).json(response.response);
      }
    } catch (e) {
      next(e);
    }
  }
);
router.get(
  "/validateURL",
  jwtService.validateTokenFromURL,
  async (req: IRequest, res: Response, next: any) => {
    try {
      res.status(200).json({ email: req.user.email });
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  "/resetPassword",
  async (req: Request, res: Response, next: any) => {
    let response: ICustomResponse = await loginService.resetPassword(
      req.body.email,
      req.body.password
    );

    res.status(response.code).json(response.response);
  }
);

router.get(
  "/account",
  jwtService.authenticateToken,
  async (req: IRequest, res: Response, next: any) => {
    try {
      let response: ICustomResponse = await loginService.returnUserCreds(
        req.user.email
      );
      res.status(response.code).json(response.response);
    } catch (e) {
      next(e);
    }
  }
);

export default router;
