import React from 'react'
import { motion } from "framer-motion"
import { GoArrowRight } from 'react-icons/go'
import { Exercise } from '@/app/types/exerciseType'

type Props = {
    exercise: Exercise
}

export default function ExercisePackageCard({ exercise }: Props) {
    const { id, name, test_duration, total_question, category } = exercise

    return (
        <div
            className="w-96 h-28 flex p-4 justify-between items-center rounded-lg overflow-hidden shadow-xl bg-gray-soft transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
        >
            <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">{name}</h2>
                <p className="text-sm text-gray-600 mb-2">
                    <strong>Durasi:</strong> {test_duration / 60} menit {test_duration % 60} detik
                </p>
                <p className="text-sm text-gray-600 mb-4">
                    <strong>Jumlah Soal:</strong> {total_question}
                </p>
            </div>
            <motion.a
                href={`/exercise/${category}/${id}/start`}
                className="w-1/5 h-full flex justify-center items-center"
                initial={{ rotate: 0, scale: 1 }}
                whileHover={{ rotate: "-25deg", scale: 1.1 }}
                whileTap={{ scale: .9 }}
            >
                <GoArrowRight size={32} />
            </motion.a>
        </div>)
}
