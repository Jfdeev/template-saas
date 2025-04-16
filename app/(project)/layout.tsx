import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const interSans = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const interMono = Inter({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});


export const metadata: Metadata = {
  title: "Financias AI",
  description: "Finanças com IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${interSans.variable} ${interMono.variable} bg-gray-100 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
