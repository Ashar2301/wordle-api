import collection from "../utils/mongoDB-connection.js";
import { words } from "../constants/five-letter-words.js";
import { IDailyGames, IUserStatistics } from "../interfaces/user-statistics.js";
const dailyDB: any = {};

dailyDB.generateGame = async (email: string) => {
  const isRecordExists = await dailyDB.findUserByEmail(email);

  if (isRecordExists) {
    let updateDocument = await dailyDB.updateDailyArray(email);
    if (updateDocument) {
      return { code: 200, response: updateDocument };
    } else {
      return { code: 500, response: "Error generating game session" };
    }
  } else {
    let document = await dailyDB.addUserFirstDocument(email);

    if (document) {
      let updateDocument = await dailyDB.updateDailyArray(email);
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

dailyDB.updateDailyArray = async (email: string) => {
  let model = await collection.getUserStatisticsCollection();
  const index = dailyDB.getIndexForWord();
  const objToUpdate: IDailyGames = {
    date: new Date().toLocaleString(),
    _id: index,
    solved: false,
    solvedInAttempts: -1,
    attempts: [],
  };
  return await model.updateOne(
    { email: email },
    { $push: { dailyGames: objToUpdate } }
  );
};

dailyDB.addUserFirstDocument = async (email: string) => {
  let model = await collection.getUserStatisticsCollection();
  const objToPush: IUserStatistics = {
    email: email,
    dailyGames: [],
    randomGames: [],
  };
  return await model.create(objToPush);
};
dailyDB.getIndexForWord = () => {
  const targetDate = new Date();
  const currentDate = new Date("2023-9-23");

  const timeDifference = targetDate.getTime() - currentDate.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
};

dailyDB.findUserByEmail = async (userEmail: string) => {
  let model = await collection.getUserStatisticsCollection();
  return await model.findOne({ email: userEmail });
};

export default dailyDB;
