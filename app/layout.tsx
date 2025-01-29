import { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./global.css"
import AlertProvider from "./components/provider/AlertProvider"
import OverlayProvider from "./components/provider/OverlayProvider"
import AuthProvider from "./components/provider/AuthProvider"
import ModalProvider from "./components/provider/ModalProvider"

export const metadata: Metadata = {
  title: {
    default: "JadiPNS",
    template: "%s | Jadi PNS"
  },
  description: 'Quiz Web App for learning CPNS test'
}

const poppins = Poppins({
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
  subsets: ["latin"],
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
        <AuthProvider />
        <AlertProvider />
        <OverlayProvider />
        <ModalProvider />
      </body>
    </html>
  )
}
