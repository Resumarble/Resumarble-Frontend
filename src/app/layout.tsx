import { dehydrate } from "@tanstack/react-query";
import { IBM_Plex_Sans_KR } from "next/font/google";

import type { Metadata } from "next";
import "./globals.css";

import ClientProvider from "@/components/client/ClientProvider";
import HydrateOnClient from "@/store/react-query/hydrateOnClient";
import getQueryClient from "@/store/react-query";
import { getJobs } from "@/service/getJobs";
import { getCareers } from "@/service/getCareer";
import { getQuestion } from "@/service/getQuestion";
import Nav from "@/components/layout/Nav";

const ibmKr = IBM_Plex_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

export const metadata: Metadata = {
  title: "Resumarble",
  description: "Resumarble",
  icons: {
    icon: "./favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: 코드 이동시키기
  const queryClient = getQueryClient();

  const formQueries = [
    queryClient.prefetchQuery({
      queryKey: ["getJobs"],
      queryFn: getJobs,
      staleTime: 1000 * 3600 * 24,
    }),
    queryClient.prefetchQuery({
      queryKey: ["getCareers"],
      queryFn: getCareers,
      staleTime: 1000 * 3600 * 24,
    }),
    queryClient.prefetchQuery({
      queryKey: ["getQuestions"],
      queryFn: getQuestion,
      staleTime: 1000 * 3600 * 24,
    }),
  ];

  await Promise.all(formQueries);

  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang="ko">
      <body className={ibmKr.className}>
        <header>
          <Nav />
        </header>
        <section className="section">
          <ClientProvider>
            <HydrateOnClient state={dehydratedState}>
              {children}
            </HydrateOnClient>
          </ClientProvider>
        </section>
      </body>
    </html>
  );
}
