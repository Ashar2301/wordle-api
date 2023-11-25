import jwt from "jsonwebtoken";
import { Request, Response } from "express";
const jwtService: any = {};

jwtService.generateAccessToken = (user: any) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "59m" });
};
jwtService.generateRefreshToken = (user: any) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
};
jwtService.authenticateToken = (req: Request, res: Response, next: Request) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  
  if (token == null) return res.status(401).json("Invalid token");


  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json("Token expired. Log in again");
    req.user = user;

    next();
  });
};
export default jwtService;
