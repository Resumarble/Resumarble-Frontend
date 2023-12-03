import createDecodedToken from '@/utils/createDecodedToken';
import NextAuth, { Account, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import Credentials from 'next-auth/providers/credentials';
import Kakao from 'next-auth/providers/kakao';

export const kakaoAuthOptions = {
  providers: [
    Kakao({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth({
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        account: {
          type: 'text',
        },
        password: {
          type: 'password',
        },
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/users/login`,
            {
              method: 'POST',
              body: JSON.stringify({
                account: credentials?.account,
                password: credentials?.password,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          const user = await res.json();
          if (user.code === 200 && user) {
            return user.data;
          }

          return null;
        } catch (err) {
          return null;
        }
      },
    }),
    ...kakaoAuthOptions.providers,
  ],
  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: User | AdapterUser;
      account: Account | null;
    }) {
      try {
        if (account?.provider === 'kakao') {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/oauth/kakao`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: account.access_token!,
              },
            }
          );

          const userRes = await res.json();
          if (res.status === 200 && userRes.data.accessToken) {
            user.accessToken = userRes.data.accessToken;
            user.refreshToken = userRes.data.refreshToken;
          }
        }
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },

    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      const accessToken = (token.accessToken as string)?.split(' ').pop();
      const { id } = createDecodedToken(accessToken!);

      session.user = { ...token, id };

      return session;
    },
  },
});

export { handler as GET, handler as POST };
