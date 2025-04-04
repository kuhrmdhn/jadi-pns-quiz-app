import { Poppins } from "next/font/google"
import Link from "next/link"

const poppins = Poppins({
    weight: ["700", "800", "900"],
    style: "normal",
    subsets: ["latin"]
})

type Props = {
    className?: string
}

export default function Logo({ className }: Props) {
    return (
        <Link href="/" className={`text-2xl text-primary dark:text-primary font-bold ${poppins.className} ${className}`}>
            Jadi
            <span className="text-gray-800 dark:text-gray-100">
                PNS
            </span>
        </Link>
    )
}