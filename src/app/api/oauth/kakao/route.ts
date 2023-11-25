import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  try {
    if (!code) throw new Error('code가 존재하지 않습니다.');

    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!,
      redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL!,
      code,
    });

    const res = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: params,
    });

    const token = await res.json().then((data) => data);
    return NextResponse.json({ token, message: 'success' });
  } catch (err) {
    return NextResponse.json({ error: '요청 실패' });
  }
}
