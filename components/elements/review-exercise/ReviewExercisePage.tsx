"use client"
import useFetch from '@/utils/hooks/useFetch'
import React from 'react'

type Props = {
    reviewId: string
}

export default function ReviewExercisePage({ reviewId }: Props) {
    const { response } = useFetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/completed-exercise/${reviewId}`)
    console.log(response)
    return (
        <div>ReviewExercisePage</div>
    )
}
