import { Poppins } from "next/font/google"
import Link from "next/link"

const poppins = Poppins({
    weight: ["700", "800", "900"],
    style: "normal",
    subsets: ["latin"]
})

export default function Logo() {
    return (
        <Link href="/" className={`text-2xl text-amber-500 font-bold ${poppins.className}`}>
            Jadi
            <span className="text-gray-800">
                PNS
            </span>
        </Link>
    )
}