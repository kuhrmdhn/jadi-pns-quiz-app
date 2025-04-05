import { Exercise } from '@/app/api/routes/exercise/utils/exerciseSchema'
import { useExerciseHistory } from '@/utils/store/useExerciseHistory'
import { useExerciseTimerStore } from '@/utils/store/useExerciseTimerStore'
import { useUserExerciseAnswer } from '@/utils/store/useUserExerciseAnwer'
import Link from 'next/link'
import { CiTimer } from "react-icons/ci"
import { GiCubes } from "react-icons/gi"
import { IoDocumentTextOutline } from "react-icons/io5"

type Props = {
    exercise: Exercise
}

export default function ExerciseCard({ exercise }: Props) {
    const { id, name, duration, total_question, difficulty, topic } = exercise
    const { setExerciseHistoryId } = useExerciseHistory()
    const { setExerciseCompletionTime } = useExerciseTimerStore()
    const { deleteUserAnswers, setInitialUserAnswers } = useUserExerciseAnswer()
    const exerciseDuration = `${duration / 60} menit`

    function startExercise() {
        deleteUserAnswers()
        setExerciseHistoryId(id)
        setExerciseCompletionTime(duration)
        setInitialUserAnswers(total_question)
    }

    return (
        <Link href="/">
            <div className="w-80 p-5 bg-white rounded-2xl shadow-lg border-2 border-primary font-sans text-gray-800 hover:scale-105 duration-200 ease-in-out">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-xl font-bold">{name}</h2>
                    <span className="bg-primary text-white px-2.5 py-1 rounded-xl text-sm">{difficulty}</span>
                </div>
                <div className="flex flex-col gap-2.5">
                    <CardSegment>
                        <CiTimer className="text-primary text-xl" />
                        <span>{exerciseDuration}</span>
                    </CardSegment>
                    <CardSegment>
                        <IoDocumentTextOutline className="text-primary text-xl" />
                        <span>{total_question} Soal</span>
                    </CardSegment>
                    {
                        topic &&
                        <CardSegment>
                            <GiCubes className="text-primary text-xl" />
                            <span>{topic}</span>
                        </CardSegment>
                    }
                </div>
            </div>
        </Link>
    )
}


function CardSegment({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-2.5 text-base">
            {children}
        </div>
    )
}