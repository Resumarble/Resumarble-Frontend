import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { AUTH_URL } from './constants/path';

const checkPathName = (req: NextRequest, path: string) => {
  return req.nextUrl.pathname.startsWith(path);
};

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (token && token.accessToken) {
    if (checkPathName(req, `${AUTH_URL.LOGIN}`)) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    if (checkPathName(req, `${AUTH_URL.JOIN}`)) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  if (!token) {
    if (checkPathName(req, `/mypage`)) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
}

export const config = {
  matcher: ['/mypage', AUTH_URL.JOIN, AUTH_URL.LOGIN],
};
