import { getQuestion } from "@/service/getQuestion";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const career = await getQuestion();
    return NextResponse.json(career);
  } catch (err) {
    return NextResponse.json({ error: "career 데이터 요청 실패" });
  }
}
