import reportBugDB from "../models/report-bug.js";

const reportBugService: any = {};

reportBugService.reportBug = async (email: string , file:File) => {
  return reportBugDB.reportBug(email,file);
};
export default reportBugService;
