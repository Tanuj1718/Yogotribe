import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SEO Text Analyzer - Optimize Your Content",
  description:
    "Analyze and optimize your blog posts, newsletters, and social media content with AI-powered SEO insights and keyword suggestions.",
  keywords: "SEO, content optimization, keyword analysis, readability, text analyzer",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
