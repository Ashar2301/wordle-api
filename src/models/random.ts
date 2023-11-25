import collection from "../utils/mongoDB-connection.js";
import { words } from "../constants/five-letter-words.js";
import {
  IRandomGames,
  IUserStatistics,
} from "../interfaces/user-statistics.js";

const randomDB: any = {};

randomDB.generateGame = async (email: string, hardMode: boolean) => {
  const isRecordExists = await randomDB.findUserByEmail(email);
  if (isRecordExists) {
    let updateDocument = await randomDB.updateRandomArray(email, hardMode);
    if (updateDocument) {
      return { code: 200, response: updateDocument };
    } else {
      return { code: 500, response: "Error generating game session" };
    }
  } else {
    let document = await randomDB.addUserFirstDocument(email);

    if (document) {
      let updateDocument = await randomDB.updateRandomArray(email, hardMode);
      if (updateDocument) {
        return { code: 200, response: updateDocument };
      } else {
        return { code: 500, response: "Error generating game session" };
      }
    } else {
      return { code: 500, response: "Error generating game session" };
    }
  }
};
randomDB.registerAttempts = async (
  userEmail: string,
  gameID: number,
  attempt: Array<any>,
  attemptNumber: number
) => {
  const answerWord = words[gameID];
  let model = await collection.getUserStatisticsCollection();
  let coloredLetters = randomDB.colorTheLetters(answerWord, attempt);
  if (randomDB.checkIfWordleSolved(attempt, answerWord)) {
    await model.findOneAndUpdate(
      {
        email: userEmail,
      },
      {
        $set: {
          "randomGames.$[game].solved": true,
          "randomGames.$[game].solvedInAttempts": attemptNumber,
        },
        $push: {
          "randomGames.$[game].attempts.letters": attempt,
          "randomGames.$[game].attempts.colors": coloredLetters,
        },
      },
      {
        arrayFilters: [{ "game._id": gameID }],
        new: true,
      }
    );

    // return resp;
  } else {
    await model.findOneAndUpdate(
      {
        email: userEmail,
      },
      {
        $push: {
          "randomGames.$[game].attempts.letters": attempt,
          "randomGames.$[game].attempts.colors": coloredLetters,
        },
      },
      {
        arrayFilters: [{ "game._id": gameID }],
        new: true,
      }
    );

    // return resp;
  }

  return { code: 200, response: coloredLetters };
};
randomDB.updateRandomArray = async (email: string, hardMode: any) => {
  let model = await collection.getUserStatisticsCollection();
  const index = await randomDB.getIndexForWord(email);

  const objToUpdate: IRandomGames = {
    date: new Date().toLocaleString(),
    _id: index,
    hardMode: hardMode === "true" ? true : false,
    solved: false,
    solvedInAttempts: -1,
    attempts: {
      letters: [],
      colors: [],
    },
  };
  await model.findOneAndUpdate(
    { email: email },
    { $push: { randomGames: objToUpdate } },
    { new: true }
  );

  return objToUpdate;
};

randomDB.gameAlreadyExists = async (email: string, id: number) => {
  let model = await collection.getUserStatisticsCollection();
  let resp = await model.findOne({ email: email });
  let index = resp?.randomGames?.findIndex((game) => game._id === id);
  if (index !== -1) {
    return resp.randomGames[index];
  } else return -1;
};
randomDB.addUserFirstDocument = async (email: string) => {
  let model = await collection.getUserStatisticsCollection();
  const objToPush: IUserStatistics = {
    email: email,
    randomGames: [],
    dailyGames: [],
  };
  return await model.create(objToPush);
};
randomDB.getIndexForWord = async (email: string) => {
  let index = Math.floor(Math.random() * (words.length - 1 - 0) + 0);

  while (true) {
    let resp = await randomDB.gameAlreadyExists(email, index);
    if (resp === -1) break;
    index = Math.floor(Math.random() * (words.length - 1 - 0) + 0);
  }

  return index;
  // return 6154
};

randomDB.findUserByEmail = async (userEmail: string) => {
  let model = await collection.getUserStatisticsCollection();
  return await model.findOne({ email: userEmail });
};

randomDB.colorTheLetters = (answerWord: string, attempt: any[]) => {
  let countMap: any[] = [];
  let colorArray: string[] = [];
  for (let i = 0; i < answerWord.length; i++) {
    countMap[answerWord[i]] === undefined
      ? (countMap[answerWord[i]] = 1)
      : countMap[answerWord[i]]++;
  }

  attempt.map((elm: string, index: number) => {
    if (elm.toLowerCase() === answerWord[index]) {
      colorArray[index] = "G";
      countMap[elm.toLowerCase()]--;
    } else if (answerWord.search(elm.toLowerCase()) === -1) {
      colorArray[index] = "R";
    }
  });

  attempt.map((elm: string, index: number) => {
    if (colorArray[index] !== "G" && colorArray[index] !== "R") {
      if (countMap[elm.toLowerCase()] > 0) {
        colorArray[index] = "Y";
      } else {
        colorArray[index] = "R";
      }
    }
  });

  return colorArray;
};
randomDB.checkIfWordleSolved = (word: Array<any>, answerWord: string) => {
  if (answerWord === randomDB.returnWordFromArray(word)) return true;
  return false;
};
randomDB.returnWordFromArray = (word: Array<any>): string => {
  let retWord: string = "";
  word.forEach((elm) => {
    retWord += elm;
  });
  return retWord.toLowerCase();
};

export default randomDB;
