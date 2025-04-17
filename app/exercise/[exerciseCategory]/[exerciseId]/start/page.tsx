import { ExerciseCategory } from '@/utils/schema/exerciseSchema'
import ExerciseQuestionList from '@/components/elements/exercise-test/ExerciseQuestionList'
import QuestionNavigateMenu from '@/components/elements/exercise-test/QuestionNavigateMenu'
import Timer from '@/components/elements/exercise-test/Timer'
import ExerciseParamsProvider from '@/components/provider/ExerciseParamsProvider'
import React from 'react'

type Props = {
    params: Promise<{
        exerciseId: string,
        exerciseCategory: ExerciseCategory
    }>
}

export default async function ExerciseStartPage({ params }: Props) {
    const { exerciseId } = await params
    return (
        <ExerciseParamsProvider>
            <section className='w-full h-32 sticky top-0 flex justify-between items-center px-10'>
                <QuestionNavigateMenu/>
                <Timer exerciseId={exerciseId}/>
            </section>
            <ExerciseQuestionList packageId={exerciseId} />
        </ExerciseParamsProvider>
    )
}
