import type React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";

import "../styles/globals.css";
import { ResumeProvider } from "@/context/resume-context";
import { Providers } from "@/providers";

const myFont = localFont({
  src: [
    {
      path: "./fonts/PingFangSC-Thin.woff2",
      weight: "100",
    },
    {
      path: "./fonts/PingFangSC-Light.woff2",
      weight: "300",
    },
    {
      path: "./fonts/PingFangSC-Medium.woff2",
      weight: "500",
    },
    {
      path: "./fonts/PingFangSC-Regular.woff2",
      weight: "400",
    },
    {
      path: "./fonts/PingFangSC-Semibold.woff2",
      weight: "600",
    },
    {
      path: "./fonts/PingFangSC-Bold.woff2",
      weight: "700",
    },
  ],
  display: "swap",
  variable: "--font-PingFangSC",
});

export const metadata: Metadata = {
  title: "ResumeAI - Professional Resume Builder",
  description: "Create professional resumes with AI assistance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${myFont.className} ${myFont.variable} font-PingFangSC custom-selection`}>
        <Providers>
          <ResumeProvider>{children}</ResumeProvider>
        </Providers>
      </body>
    </html>
  );
}
