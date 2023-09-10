import fs from 'fs';
const requestLogger = (req, res, next) => {
    console.log("Request method is ", req.method);
    console.log("Request url is ", req.url);
    console.log("Request time is", new Date().toLocaleString());
    let logMessage = `${new Date().toLocaleString()} - ${req.method} : ${req.url} \n`;
    fs.appendFile('RequestLogger.txt', logMessage, (err) => {
        if (err)
            return next(err);
    });
    next();
};
export default requestLogger;
//# sourceMappingURL=RequestLogger.js.map