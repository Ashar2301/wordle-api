import { put } from "@vercel/blob";
import fs from "fs";
import collection from "../utils/mongoDB-connection.js";
const reportBugDB: any = {};

reportBugDB.reportBug = async (bug: any, file: File) => {
  try {
    let uploaded;
    if (!file) {
      uploaded = {};
    } else {
      uploaded = await reportBugDB.uploadFile(file);
    }
    return await reportBugDB.registerBug(bug.description, uploaded);
  } catch (error) {
    console.error(error);
    return { code: 401, response: "Some error occured" };
  }
};
reportBugDB.uploadFile = async (file: any) => {
  const fileToBeUploaded = await fs.readFileSync(file.path);
  const blob = await put(file.originalname, fileToBeUploaded, {
    access: "public",
  });
  return blob;
};
reportBugDB.registerBug = async (description: string, fileDesc: any) => {
  try {
    const bugObject = {
      description,
      file: fileDesc,
    };
    let model = await collection.getReportBugsCollection();
    let resp = await model.create(bugObject);
    return { code: 200, response: "Success" };
  } catch (error) {
    console.error(error);
    return { code: 401, response: "Some error occured" };
  }
};
export default reportBugDB;
