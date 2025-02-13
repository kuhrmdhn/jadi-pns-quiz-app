import { useUserStore } from '@/app/utils/store/useUserStore'
import React from 'react'
import QuestionNavigateItem from './QuestionNavigateItem'

export default function QuestionNavigationList() {
    const { currentAnswers } = useUserStore()
    return (
        <div className='grid grid-cols-5 justify-items-center h-full w-full gap-y-3'>
            {
                currentAnswers.map((_, i) => (
                    <QuestionNavigateItem
                        id={`${i + 1}`}
                        key={`navigation-to-question-${i + 1}`}
                    />
                ))
            }
        </div>
    )
}
