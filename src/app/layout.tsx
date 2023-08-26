import ClientProvider from "@/components/client/ClientProvider";
import "./globals.css";
import type { Metadata } from "next";
import { IBM_Plex_Sans_KR } from "next/font/google";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={ibmKr.className}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
