"use client"

import "./globals.css"
import "@rainbow-me/rainbowkit/styles.css"
import "react-toastify/dist/ReactToastify.css"
import { Inter as FontSans } from "next/font/google"
import { Ysabeau_Office } from "next/font/google"
import { Providers } from "@/components/Providers"
import { Header } from "@/components/Header"
import { ToastContainer } from "react-toastify"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { usePathname } from "next/navigation"
import { InteractionHeader } from "@/components/InteractionHeader"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const ysabeauOffice = Ysabeau_Office({
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const path = usePathname()

  const interactionPaths = [
  "/interaction",
  "/interaction/dashboard",
  "/interaction/finance",
  "/interaction/governance",
  "/interaction/members",
  "/interaction/settings",
  ];

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          ysabeauOffice.className
        )}
      >
        <ThemeProvider
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            {!interactionPaths.includes(path) && <Header />}
            {interactionPaths.includes(path) && <InteractionHeader/>}
            {children}
          </Providers>
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  )
}
