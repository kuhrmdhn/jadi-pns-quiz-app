import React from 'react'
import { motion } from "framer-motion"
import { GoArrowRight } from 'react-icons/go'
import { Exercise, ExerciseCategory } from '@/app/types/exerciseType'
import Link from 'next/link'
import { useUserStore } from '@/app/utils/store/useUserStore'

type Props = {
    exercise: Exercise
    category: ExerciseCategory
}

export default function ExercisePackageCard({ exercise, category }: Props) {
    const { id, name, test_duration, total_question } = exercise
    const { removeCurrentAnswers, setInitialUserAnswers, removeExerciseEndTime } = useUserStore()

    function startExercise() {
        removeCurrentAnswers()
        removeExerciseEndTime()
        setInitialUserAnswers(total_question)
    }

    return (
        <div
            className="w-96 h-28 flex p-4 justify-between items-center rounded-lg overflow-hidden shadow-xl bg-gray-soft transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
        >
            <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">{name}</h2>
                <p className="text-sm text-gray-600 mb-2">
                    <strong>Durasi:</strong> {test_duration / 60 < 1 ? 0 : test_duration / 60 } menit {test_duration % 60} detik
                </p>
                <p className="text-sm text-gray-600 mb-4">
                    <strong>Jumlah Soal:</strong> {total_question}
                </p>
            </div>
            <motion.button
                onClick={startExercise}
                className="w-1/5 h-full flex justify-center items-center"
                initial={{ rotate: 0, scale: 1 }}
                whileHover={{ rotate: "-25deg", scale: 1.1 }}
                whileTap={{ scale: .9 }}
            >
                <Link href={`/exercise/${category}/${id}/start?question_id=1`}>
                    <GoArrowRight size={32} />
                </Link>
            </motion.button>
        </div>)
}
