"use client"
import useFetch from '@/app/utils/hooks/useFetch'
import React, { use } from 'react'

type Props = {
    params: Promise<{
        questionName: string,
        questionPack: string
    }>
}

export default function QuestionPage({ params }: Props) {
    const { questionName, questionPack } = use(params)
    const { response, error } = useFetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/question/${questionName}/${questionPack}`)
    console.log({ response })
    return (
        <div>
            <h1>Question Page</h1>
        </div>
    )
}
