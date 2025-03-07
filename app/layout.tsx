import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ResumeProvider } from "@/context/resume-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ResumeAI - Professional Resume Builder",
  description: "Create professional resumes with AI assistance",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ResumeProvider>{children}</ResumeProvider>
      </body>
    </html>
  )
}

