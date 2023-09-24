import express, { Request, Response } from "express";
import RequestLogger from "./utils/request-logger.js";
import ErrorLogger from "./utils/error-logger.js";
import cors from "cors";
import collection from "./utils/mongoDB-connection.js";
import dotenv from "dotenv";
import loginRoutes from './routes/login.js'
import dailyRoutes from './routes/daily.js'

dotenv.config({ path: `./env/.${process.env.NODE_ENV}.env` });
const app = express();
console.log("Server Started at port 3000!");
app.use(express.json());
app.use(cors());

app.use(RequestLogger);
app.use('/' , loginRoutes);
app.use('/daily',dailyRoutes);
app.use(ErrorLogger);

app.listen(process.env.DEV_PORT);