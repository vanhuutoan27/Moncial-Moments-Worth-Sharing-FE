import type { Metadata } from "next"
import { Poppins } from "next/font/google"

import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"

import { Toaster } from "@/components/ui/sonner"

import QueryProvider from "@/providers/QueryProvider"
import SessionProvider from "@/providers/SessionProvider"
import { ThemeProvider } from "@/providers/ThemeProvider"

import "../styles/globals.css"

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Moncial - Moments Worth Sharing",
  description:
    "A social media app for sharing emotions, memories, and real-life moments that matter."
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`}>
        <SessionProvider>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <QueryProvider>
                {children}
                <Toaster />
              </QueryProvider>
            </ThemeProvider>
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
