import ClientProvider from "@/components/client/ClientProvider";
import "./globals.css";
import type { Metadata } from "next";
import { IBM_Plex_Sans_KR } from "next/font/google";
import { getJobs } from "@/service/getJobs";
import { dehydrate } from "@tanstack/react-query";
import HydrateOnClient from "@/store/hydrateOnClient";
import getQueryClient from "@/store";

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
  await queryClient.prefetchQuery({
    queryKey: ["getJobs"],
    queryFn: getJobs,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang="ko">
      <body className={ibmKr.className}>
        <ClientProvider>
          <HydrateOnClient state={dehydratedState}>{children}</HydrateOnClient>
        </ClientProvider>
      </body>
    </html>
  );
}
