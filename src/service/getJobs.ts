import path from "path";
import { promises } from "fs";

export type Job = {
  id: number;
  jobTitleKr: string;
  jobTitleEn: string;
};

export async function getJobs() {
  const filePath = path.join(process.cwd(), "data", "jobs.json");
  const data = await promises.readFile(filePath, "utf-8");

  return JSON.parse(data);
}
