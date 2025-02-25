import { Poppins } from "next/font/google"

const poppins = Poppins({
    weight: ["700", "800", "900"],
    style: "normal",
    subsets: ["latin"]
})

export default function Logo() {
    return (
        <h1 className={`text-2xl text-amber-500 font-bold ${poppins.className}`}>
            Jadi
            <span className="text-gray-800">
                PNS
            </span>
        </h1>
    )
}