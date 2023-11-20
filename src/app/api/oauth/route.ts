import { NextResponse } from 'next/server';

const URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&response_type=code&scope=account_email`;

export async function GET(req: Request) {
  try {
    const result = await fetch(URL);
    return result;
  } catch (err) {
    return NextResponse.json({ error: '요청 실패' });
  }
}
