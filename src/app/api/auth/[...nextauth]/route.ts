import createDecodedToken from '@/utils/createDecodedToken';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Kakao from 'next-auth/providers/kakao';

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
          throw err;
        }
      },
    }),
    Kakao({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      const accessToken = (token.accessToken as string).split(' ').pop();
      const { id } = createDecodedToken(accessToken!);

      session.user = { ...token, id };
      return session;
    },
  },
});

export { handler as GET, handler as POST };
