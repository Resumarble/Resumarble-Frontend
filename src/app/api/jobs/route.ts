import { getJobs } from "@/service/getJobs";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const jobs = await getJobs();
    return NextResponse.json(jobs);
  } catch (err) {
    return NextResponse.json({ error: "jobs 데이터 요청 실패" });
  }
}
