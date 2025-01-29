import { Question } from '@/app/types/questionType'
import React from 'react'

export default function QuestionCard({ id, options, question }: Question) {
    return (
        <div className='card'>
            <h1>{question}</h1>
            {
                options.map((option, index) => (
                    <label htmlFor={`${question}-option-${index}`}>
                        {option}
                        <input type="checkbox" name={option} id={`${question}-option-${index}`} />
                    </label>
                ))
            }
        </div>
    )
}
