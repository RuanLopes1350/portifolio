import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ruan Lopes - Portfolio",
  description: "Conheça meu trabalho como desenvolvedor!",
  openGraph: {
    title: "Ruan Lopes - Portfolio",
    description: "Conheça meu trabalho como desenvolvedor!",
    url: "https://ruanlopes.dev",
    siteName: "Ruan Lopes - Portfolio",
    images: [
      {
        url: "https://i.imgur.com/jVN2Pyr.png",
        width: 1200,
        height: 630,
        alt: "Ruan Lopes - Portfolio",
      },
    ],
    locale: "pt-BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ruan Lopes - Portfolio",
    description: "Conheça meu trabalho como desenvolvedor!",
    images: ["https://i.imgur.com/jVN2Pyr.png"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#111827] flex flex-col items-center justify-center min-h-screen text-white`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
