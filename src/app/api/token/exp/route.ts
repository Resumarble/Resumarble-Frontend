import { NextResponse } from "next/server";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";

type DecodedToken = {
  sub: string;
  auth: string;
  provider: string;
  id: number;
  exp: number;
};

export async function GET(req: Request) {
  const headerList = headers();
  const authorization = headerList.get("authorization");
  const token = authorization?.split(" ").pop()!;

  const decodedToken = jwt.verify(
    token,
    process.env.NEXT_PUBLIC_SECRET_KEY!
  ) as DecodedToken;

  const exp = decodedToken.exp;
  const now = Math.floor(Date.now() / 1000);

  const isExpired = exp - now < 600; // 만료 10분 전인지 체크

  return NextResponse.json({ exp, now, calc: exp - now, isExpired });
}
