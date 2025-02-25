"use client"
import Link from 'next/link'
import React from 'react'
import { motion } from "framer-motion"

type Props = {
    icon: React.ReactNode
    title: string
    description: string
    className?: string
}

export default function ExerciseCategoryCard({ icon, title, description, className }: Props) {
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
            <Link href={`exercise/${title}`} className={`xl:w-80 h-24 !cursor-pointer text-white-darken rounded-md shadow-lg flex items-center justify-around ${className}`}>
                <span className='w-1/5 flex justify-center items-center text-3xl xl:text-4xl'>
                    {icon}
                </span>
                <div className='w-3/4 xl:w-3/5 h-full justify-center items-center flex flex-col'>
                    <h1 className='font-bold text-base xl:text-lg'>{title}</h1>
                    <p className='font-light text-xs xl:text-sm'>{description}</p>
                </div>
            </Link>
        </motion.div >
    )
}
