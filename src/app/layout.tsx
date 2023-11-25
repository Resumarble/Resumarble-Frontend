import { IBM_Plex_Sans_KR } from 'next/font/google';

import type { Metadata } from 'next';
import './globals.css';

import ClientProvider from '@/components/client/ClientProvider';
import Nav from '@/components/layout/Nav';
import Providers from '@/components/session/Provider';

const ibmKr = IBM_Plex_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
});

export const metadata: Metadata = {
  title: 'Resumarble',
  description: 'Resumarble',
  icons: {
    icon: './favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className={ibmKr.className}>
        <Providers>
          <header>
            <Nav />
          </header>
          <section className='section'>
            <ClientProvider>{children}</ClientProvider>
          </section>
        </Providers>
      </body>
    </html>
  );
}
