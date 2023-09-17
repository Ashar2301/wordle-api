import express from "express";
import RequestLogger from "./utils/request-logger.js";
import ErrorLogger from "./utils/error-logger.js";
import cors from "cors";
import dotenv from "dotenv";
import loginRoutes from './routes/login.js';
dotenv.config({ path: `./env/.${process.env.NODE_ENV}.env` });
const app = express();
console.log("Server Started at port 3000!");
app.use(express.json());
app.use(cors());
app.use(RequestLogger);
app.use('/', loginRoutes);
app.use(ErrorLogger);
app.listen(process.env.DEV_PORT);
//# sourceMappingURL=app.js.map