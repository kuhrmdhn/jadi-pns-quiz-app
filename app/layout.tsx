import { Metadata } from "next"
import { Montserrat } from "next/font/google"
import AlertProvider from "./components/provider/AlertProvider"
import AuthProvider from "./components/provider/AuthProvider"
import ModalProvider from "./components/provider/ModalProvider"
import OverlayProvider from "./components/provider/OverlayProvider"
import "./global.css"

export const metadata: Metadata = {
  title: {
    default: "JadiPNS",
    template: "%s | Jadi PNS"
  },
  description: 'Quiz Web App for learning CPNS test'
}

export const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["cyrillic", "latin"]
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
        <AlertProvider />
        <OverlayProvider />
        <ModalProvider />
      </body>
    </html>
  )
}
