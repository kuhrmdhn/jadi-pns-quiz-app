import ExerciseQuestionList from '@/app/components/elements/exercise-test/ExerciseQuestionList'
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
            <ExerciseQuestionList category={exerciseCategory} packageId={exerciseId} />
        </ExerciseParamsProvider>
    )
}
