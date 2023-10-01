import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const res = await req.json();

  console.log(res);

  // TODO 토큰 유효기간 체크후 만료 시 리프레시 토큰으로 새 액세스 토큰 발급
  return NextResponse.json({ res });
}
