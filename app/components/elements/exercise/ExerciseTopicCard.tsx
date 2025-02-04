import Link from 'next/link'
import React from 'react'
import { motion } from "framer-motion"

type Props = {
    icon: React.ReactNode
    title: string
    description: string
    className?: string
}

export default function ExerciseTopicCard({ icon, title, description, className }: Props) {
    const variant = {
        "initial": { scale: 1 },
        "hover": { scale: 1.05 },
        "click": { scale: 0.9 }
    }
    return (
        <motion.div
            variants={variant}
            initial="initial"
            whileHover="hover"
            whileTap="click"
            transition={{ duration: 0.3 }}
        >
            <Link href={`exercise/${title}`} className={`w-80 h-24 text-white-darken rounded-md shadow-lg flex items-center justify-around ${className}`}>
                <span className='w-1/5 flex justify-center items-center text-4xl'>
                    {icon}
                </span>
                <div className='w-3/5 h-full justify-center items-center flex flex-col'>
                    <h1 className='font-bold text-lg'>{title}</h1>
                    <p className='font-light text-sm'>{description}</p>
                </div>
            </Link>
        </motion.div >
    )
}
