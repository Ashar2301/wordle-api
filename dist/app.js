import express from "express";
import RequestLogger from "./utils/request-logger.js";
import ErrorLogger from "./utils/error-logger.js";
import cors from "cors";
import dotenv from "dotenv";
import loginRoutes from "./routes/login.js";
import dailyRoutes from "./routes/daily.js";
import statsRoutes from "./routes/stats.js";
import randomRoutes from "./routes/random.js";
dotenv.config({ path: `./env/.${process.env.NODE_ENV}.env` });
const app = express();
console.log(`Server Started at port ${process.env.DEV_PORT} !`);
app.use(express.json());
app.use(cors());
app.use(RequestLogger);
app.use((req, res, next) => {
    res.header("Access-Control-Expose-Headers", "authorization");
    next();
});
app.use("/", loginRoutes);
app.use("/daily", dailyRoutes);
app.use("/random", randomRoutes);
app.use("/stats", statsRoutes);
app.use(ErrorLogger);
app.listen(process.env.DEV_PORT);
export default app;
//# sourceMappingURL=app.js.map