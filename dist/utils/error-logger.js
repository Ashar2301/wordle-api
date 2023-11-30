const errorLogger = function (err, req, res, next) {
    if (err) {
        console.log("error ==>", err);
        // fs.appendFile('ErrorLogger.txt',new Date().toLocaleString()+" : "+ err.stack + "\n" , (error) => {
        //     if (error) {
        //         console.log("logging error failed");
        //     }
        // });
        if (err.status) {
            res.status(err.status);
        }
        else {
            res.status(500);
        }
        res.json({ message: err.message });
    }
    next();
};
export default errorLogger;
//# sourceMappingURL=error-logger.js.map