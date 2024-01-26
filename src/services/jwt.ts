import { Response } from "express";
import jwt from "jsonwebtoken";
import { IRequest } from "../interfaces/custom-request.js";
const jwtService: any = {};

jwtService.generateAccessToken = (user: any) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5m" });
};
jwtService.generateRefreshToken = (user: any , rememberMe?:boolean) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: rememberMe ? "30d" : "15m" });
};
jwtService.authenticateToken = (req: IRequest, res: Response, next: any) => {
  const accessToken = req.headers.authorization;
  const refreshToken = req.cookies.refreshToken;
  if (!accessToken && !refreshToken) {
    return res.status(403).send("Access Denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (!refreshToken) {
      return res.status(403).send("Access Denied. No refresh token provided.");
    }
    try {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          const accessToken = jwtService.generateAccessToken({
            email: user.email,
          });
          req.user = user;
          res
            .cookie("refreshToken", refreshToken, {
              httpOnly: true,
              sameSite: "none",
              secure: true,
            })
            .header("Authorization", accessToken);
          next();
        }
      );
    } catch (error) {
      res.clearCookie("refreshToken");
      return res.status(403).json("Token expired. Log in again");
    }
  }
};

jwtService.validateTokenFromURL = (req: IRequest, res: Response, next: any) => {
  const token = req.query.url;
  if (token == null) return res.status(403).json("Invalid token");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json("Token expired. Log in again");
    }
    req.user = user;

    next();
  });
};
export default jwtService;
