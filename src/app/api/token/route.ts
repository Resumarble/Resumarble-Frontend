import createDecodedToken from "@/utils/createDecodedToken";
import { NextResponse } from "next/server";

// 토큰 복호화 후 유저 id 반환
export async function POST(req: Request) {
  const res = await req.json();

  const token = res.token;
  const decodedToken = createDecodedToken(token);

  const userId = decodedToken.id;

  return NextResponse.json({ id: userId });
}
