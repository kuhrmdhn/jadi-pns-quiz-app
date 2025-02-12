import ExerciseQuestionList from '@/app/components/elements/exercise-test/ExerciseQuestionList'
import Timer from '@/app/components/elements/exercise-test/Timer'
import ExerciseParamsProvider from '@/app/components/provider/ExerciseParamsProvider'
import { ExerciseCategory } from '@/app/types/exerciseType'
import React from 'react'

type Props = {
    params: Promise<{
        exerciseId: string,
        exerciseCategory: ExerciseCategory
    }>
}

export default async function ExerciseStartPage({ params }: Props) {
    const { exerciseId, exerciseCategory } = await params
    return (
        <ExerciseParamsProvider>
            <section className='w-full h-32 bg-red-900 sticky top-0'>
                <Timer category={exerciseCategory} packageId={exerciseId} />
            </section>
            <ExerciseQuestionList category={exerciseCategory} packageId={exerciseId} />
        </ExerciseParamsProvider>
    )
}
