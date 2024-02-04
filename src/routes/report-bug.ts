import express, { Response } from "express";
import { IRequest } from "../interfaces/custom-request.js";
import jwtService from "../services/jwt.js";
import { ICustomResponse } from "../interfaces/custom-response.js";
import reportBugService from "../services/report-bug.js";
import multer from "multer";
// const storage = multer.memoryStorage()
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })
const router = express.Router();

router.post(
  "/",
  jwtService.authenticateToken,
  upload.any(),
  async (req: IRequest, res: Response, next: any) => {
    try {
      let response: ICustomResponse = await reportBugService.reportBug(
        req.body , req.files[0]
      );
      res.status(response.code).json(response.response);
    } catch (e) {
      next(e);
    }
  }
);
export default router;
