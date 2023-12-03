import { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

interface ExtendedJWT extends JWT {
  accessToken?: string;
  refreshToken?: string;
  id?: number;
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedJWT;
  }

  interface User {
    accessToken?: string;
    refreshToken?: string;
  }
}
