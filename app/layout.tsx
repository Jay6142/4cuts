import type { Metadata } from "next";
import { Geist } from "next/font/google";
import StoreProvider from "./_components/providers/StoreProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "4컷 사진관",
  description: "나만의 4컷 사진을 찍어보세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
