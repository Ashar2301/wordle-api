import { Response } from "express";
import jwt from "jsonwebtoken";
const jwtService: any = {};

jwtService.generateAccessToken = (user: any) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};
jwtService.generateRefreshToken = (user: any) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
};
jwtService.authenticateToken = (req: any, res: Response, next: any) => {
  const token = req.cookies.token;
  if (token == null) return res.status(401).json("Invalid token");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.clearCookie("token");
      return res.status(403).json("Token expired. Log in again");
    }
    req.user = user;

    next();
  });
};
export default jwtService;
