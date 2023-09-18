import { Request, Response } from "express";
import collection from "../utils/mongoDB-connection.js";
import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const data = {
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword,
    };
    console.log(data);
    
    let model = await collection.getUserCollection();
    let response = await model.create(data);
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(500).send("Error creating document");
    }
  } catch(e) {
    console.log(e);
    
    res.status(500).send("Error creating document");
  }
});

router.get("/login", async (req: Request, res: Response) => {
  try {
    let model = await collection.getUserCollection();
    let response = await model.findOne({ email: req.body.email });
    if (response) {
      if (await bcrypt.compare(req.body.password, response.password)) {
        res.status(200).send("Login successfull");
      } else {
        res.status(401).send("Invalid credentials");
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch {
    res.status(401).send("Error loggin in");
  }
});

export default router;
