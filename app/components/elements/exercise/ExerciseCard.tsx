import useFetch from '@/app/utils/hooks/useFetch'
import React from 'react'

type Props = {
    question_id: string
    question_category: string
}

export default function ExerciseCard({ question_id, question_category }: Props) {
    const { response } = useFetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/question/${question_category}/${question_id}`)
    console.log({response})
    return (
        <div>ExerciseCard</div>
    )
}
