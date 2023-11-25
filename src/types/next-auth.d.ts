import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: {
      data?: {
        accessToken?: string;
        refreshToken?: string;
      };
    } & DefaultSession['user'];
  }
}
