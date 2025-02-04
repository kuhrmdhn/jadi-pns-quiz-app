import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"

export default function TextSlideShow() {
    const [index, setIndex] = useState(-1);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);

            setTimeout(() => {
                setIndex((prevIndex) => (prevIndex + 1) % bannerText.length);
                setIsAnimating(false);
            }, 600);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            animate={isAnimating ? "flip" : "initial"}
            className="text-5xl font-semibold text-white-darken capitalize absolute flex-col top-0 z-10 h-full w-full flex justify-center items-center bg-gradient-to-b from-[rgba(255,255,255,0.2)] to-primary"
            style={{ perspective: "1000px" }}
        >
            <AnimatePresence>
                <motion.h1
                    key={index}
                    initial={{ y: "0%", opacity: 1, rotateX: 0 }}
                    animate={{ y: "-100%", opacity: 0, rotateX: "90deg" }}
                    exit={{ opacity: 0 }}
                >
                    {bannerText[index]}
                </motion.h1>
                <motion.h1
                    key={index + 1}
                    initial={{ y: "100%", opacity: 0, rotateX: "-90deg" }}
                    animate={{ y: "0%", opacity: 1, rotateX: "0" }}
                >
                    {bannerText[(index + 1) % bannerText.length]}
                </motion.h1>
            </AnimatePresence>
        </motion.div>)
}

const bannerText = [
    "Bangkit dan raih sukses!",
    "Latihan hari ini, menang esok.",
    "Bersama, kita tak terhentikan.",
    "Semangatmu, kunci keberhasilanmu.",
    "Setiap langkahmu adalah kemenangan.",
    "Berani bermimpi, berani beraksi.",
    "Jadikan tantangan sebagai peluang.",
    "Kerja keras membawa hasil gemilang.",
    "Pencapaian dimulai dari tekad.",
    "Tetap fokus, raih tujuanmu!"
];