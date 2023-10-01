import { NextResponse } from "next/server";

const jwt = require("jsonwebtoken");

// 토큰 복호화
export async function POST(req: Request) {
  const res = await req.json();

  const token = res.token;
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
  const decodedToken = jwt.verify(token, secretKey);
  const userId = decodedToken.id;

  return NextResponse.json({ id: userId });
}
