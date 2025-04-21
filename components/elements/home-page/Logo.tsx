import { Poppins } from "next/font/google"
import Image from "next/image"
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
        <Link href="/" className={`flex items-center ${poppins.className} ${className}`}>
            <Image height={1080} width={1080} alt="Jadi PNS logo" src="/logo.png" className="size-12" />
            <h1 className="text-2xl text-primary dark:text-primary font-bold">
                Jadi
                <span className="text-gray-800 dark:text-gray-100">
                    PNS
                </span>
            </h1>
        </Link>
    )
}