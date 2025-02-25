import React from 'react'
import QuestionNavigateItem from './QuestionNavigateItem'
import { useUserExerciseAnswer } from '@/utils/store/useUserExerciseAnwer'

export default function QuestionNavigationList() {
    const { userAnswers } = useUserExerciseAnswer()
    return (
        <div className='grid grid-cols-5 justify-items-center h-full w-full gap-y-3'>
            {
                userAnswers.map((_, i) => (
                    <QuestionNavigateItem
                        id={`${i + 1}`}
                        key={`navigation-to-question-${i + 1}`}
                    />
                ))
            }
        </div>
    )
}
