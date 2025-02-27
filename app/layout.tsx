import { Metadata } from "next"
import { Montserrat } from "next/font/google"
import AuthProvider from "@/components/provider/AuthProvider"
import "./global.css"
import { SidebarProvider } from "@/components/elements/home-page/Sidebar"

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
    <html lang="en">
      <body className={montserrat.className}>
        {children}
        <AuthProvider />
        <SidebarProvider/>
      </body>
    </html>
  )
}
