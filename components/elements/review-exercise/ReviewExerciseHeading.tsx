import React from 'react'

type Props = {
    exerciseId: string
    score: number
}

export default function ReviewExerciseHeading({ exerciseId, score }: Props) {
    return (
        <div className='h-32 w-full flex flex-col justify-center items-center'>
            <div className='w-11/12 xl:w-[500px] h-full flex flex-col justify-center'>
                <h1 className="text-2xl font-bold">
                    Hasil Latihanmu 🎯
                </h1>
                <p className="text-lg">
                    Skor: <span className="font-semibold text-blue-600">{score}</span>
                </p>
            </div>
        </div>
    )
}
