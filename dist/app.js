import express from 'express';
import RequestLogger from './utils/RequestLogger.js';
import ErrorLogger from './utils/ErrorLogger.js';
import cors from 'cors';
const app = express();
console.log("Server Started at port 3000!");
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(RequestLogger);
app.get("/", (req, res) => {
    console.log('Hi');
    res.send('SERVER RUNNING NOW');
});
app.use(ErrorLogger);
app.listen(3000);
//# sourceMappingURL=app.js.map