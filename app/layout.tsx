import type React from "react"
import type { Metadata } from "next"
import { Rubik } from "next/font/google"
import "./globals.css"
import { RTLProvider } from "@/components/rtl-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdminProvider from "./admin-provider"
import { ThemeProvider } from "@/components/theme-provider"

// שימוש בפונט Rubik שתומך בעברית
const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  variable: "--font-rubik",
})

export const metadata: Metadata = {
  title: "נדל״ן בכפר - פתרונות נדל״ן בגליל המערבי",
  description: "נדל״ן בכפר מציעה שירותי תיווך, ניהול והשקעות נדל״ן באזור הגליל המערבי",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={rubik.className}>
        <AdminProvider>
          <RTLProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </ThemeProvider>
          </RTLProvider>
        </AdminProvider>
      </body>
    </html>
  )
}



import './globals.css'