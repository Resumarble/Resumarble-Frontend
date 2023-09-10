import path from "path";
import { promises } from "fs";

export type Career = {
  id: number;
  titleKr: string;
  titleEn: string;
};

export async function getCareers(): Promise<Career[]> {
  const filePath = path.join(process.cwd(), "data", "career.json");
  const data = await promises.readFile(filePath, "utf-8");

  return JSON.parse(data);
}

export async function getCareer(id: number) {
  const careers = await getCareers();

  return careers.find((career) => career.id === id);
}
