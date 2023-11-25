import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Kakao from 'next-auth/providers/kakao';

const handler = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        account: {
          label: 'ID',
          type: 'text',
          placeholder: '아이디를 입력하세요.',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '비밀번호를 입력하세요.',
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
            return user;
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
      session.user = token as any;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
