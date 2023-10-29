import collection from "../utils/mongoDB-connection.js";
import { words } from "../constants/five-letter-words.js";
const dailyDB = {};
dailyDB.generateGame = async (email) => {
    const isRecordExists = await dailyDB.findUserByEmail(email);
    if (isRecordExists) {
        let updateDocument = await dailyDB.updateDailyArray(email);
        if (updateDocument) {
            return { code: 200, response: updateDocument };
        }
        else {
            return { code: 500, response: "Error generating game session" };
        }
    }
    else {
        let document = await dailyDB.addUserFirstDocument(email);
        if (document) {
            let updateDocument = await dailyDB.updateDailyArray(email);
            if (updateDocument) {
                return { code: 200, response: updateDocument };
            }
            else {
                return { code: 500, response: "Error generating game session" };
            }
        }
        else {
            return { code: 500, response: "Error generating game session" };
        }
    }
};
dailyDB.registerAttempts = async (userEmail, gameID, attempt, attemptNumber) => {
    const answerWord = words[gameID];
    let model = await collection.getUserStatisticsCollection();
    let coloredLetters = dailyDB.colorTheLetters(answerWord, attempt);
    if (dailyDB.checkIfWordleSolved(attempt, answerWord)) {
        await model.findOneAndUpdate({
            email: userEmail,
        }, {
            $set: {
                "dailyGames.$[game].solved": true,
                "dailyGames.$[game].solvedInAttempts": attemptNumber,
            },
            $push: {
                "dailyGames.$[game].attempts.letters": attempt,
                "dailyGames.$[game].attempts.colors": coloredLetters,
            },
        }, {
            arrayFilters: [{ "game._id": gameID }],
            new: true,
        });
        // return resp;
    }
    else {
        await model.findOneAndUpdate({
            email: userEmail,
        }, {
            $push: {
                "dailyGames.$[game].attempts.letters": attempt,
                "dailyGames.$[game].attempts.colors": coloredLetters,
            },
        }, {
            arrayFilters: [{ "game._id": gameID }],
            new: true,
        });
        // return resp;
    }
    return { code: 200, response: coloredLetters };
};
dailyDB.updateDailyArray = async (email) => {
    let model = await collection.getUserStatisticsCollection();
    const index = dailyDB.getIndexForWord();
    let gameExists = await dailyDB.gameAlreadyExists(email, index);
    if (gameExists !== -1) {
        return gameExists;
    }
    const objToUpdate = {
        date: new Date().toLocaleString(),
        _id: index,
        solved: false,
        solvedInAttempts: -1,
        attempts: {
            letters: [],
            colors: [],
        },
    };
    await model.findOneAndUpdate({ email: email }, { $push: { dailyGames: objToUpdate } }, { new: true });
    return objToUpdate;
};
dailyDB.gameAlreadyExists = async (email, id) => {
    let model = await collection.getUserStatisticsCollection();
    let resp = await model.findOne({ email: email });
    let index = resp.dailyGames.findIndex((game) => game._id === id);
    if (index !== -1) {
        return resp.dailyGames[index];
    }
    else
        return -1;
};
dailyDB.addUserFirstDocument = async (email) => {
    let model = await collection.getUserStatisticsCollection();
    const objToPush = {
        email: email,
        dailyGames: [],
        randomGames: [],
    };
    return await model.create(objToPush);
};
dailyDB.getIndexForWord = () => {
    const targetDate = new Date();
    const currentDate = new Date("2023-10-28");
    const timeDifference = targetDate.getTime() - currentDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
};
dailyDB.findUserByEmail = async (userEmail) => {
    let model = await collection.getUserStatisticsCollection();
    return await model.findOne({ email: userEmail });
};
dailyDB.colorTheLetters = (answerWord, attempt) => {
    let countMap = [];
    let colorArray = [];
    for (let i = 0; i < answerWord.length; i++) {
        countMap[answerWord[i]] === undefined
            ? (countMap[answerWord[i]] = 1)
            : countMap[answerWord[i]]++;
    }
    attempt.map((elm, index) => {
        if (elm.toLowerCase() === answerWord[index]) {
            colorArray[index] = "G";
            countMap[elm.toLowerCase()]--;
        }
        else if (answerWord.search(elm.toLowerCase()) === -1) {
            colorArray[index] = "R";
        }
    });
    attempt.map((elm, index) => {
        if (colorArray[index] !== "G" && colorArray[index] !== "R") {
            if (countMap[elm.toLowerCase()] > 0) {
                colorArray[index] = "Y";
            }
            else {
                colorArray[index] = "R";
            }
        }
    });
    return colorArray;
};
dailyDB.checkIfWordleSolved = (word, answerWord) => {
    if (answerWord === dailyDB.returnWordFromArray(word))
        return true;
    return false;
};
dailyDB.returnWordFromArray = (word) => {
    let retWord = "";
    word.forEach((elm) => {
        retWord += elm;
    });
    return retWord.toLowerCase();
};
export default dailyDB;
//# sourceMappingURL=daily.js.map