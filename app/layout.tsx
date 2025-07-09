import { Metadata } from "next"
import { Montserrat } from "next/font/google"
import AuthProvider from "@/components/provider/AuthProvider"
import "./global.css"
import { SidebarProvider } from "@/components/elements/navbar/Sidebar"
import { ThemeProvider } from "../components/provider/ThemeProvider"
import Navbar from "@/components/elements/navbar/Navbar"
import AlertProvider from "@/components/provider/AlertProvider"

export const metadata: Metadata = {
  title: {
    default: "JadiPNS",
    template: "%s | Jadi PNS"
  },
  description: 'Quiz Web App for learning CPNS test'
}

const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"]
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="image/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="image/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="image/favicon-16x16.png"></link>
      </head>
      <body className={montserrat.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <AlertProvider />
          <SidebarProvider />
        </ThemeProvider>
        <AuthProvider />
      </body>
    </html>
  )
}
