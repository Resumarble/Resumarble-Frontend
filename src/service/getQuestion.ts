import path from "path";
import { promises } from "fs";

export type Question = {
  id: number;
  titleKr: string;
  titleEn: string;
};

export async function getQuestion(): Promise<Question[]> {
  const filePath = path.join(process.cwd(), "data", "question.json");
  const data = await promises.readFile(filePath, "utf-8");

  return JSON.parse(data);
}
