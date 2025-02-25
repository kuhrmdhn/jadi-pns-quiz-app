"use client"
import useFetch from '@/utils/hooks/useFetch'
import React, { useEffect } from 'react'
import QuestionCard from './QuestionCard'
import { useSearchParams } from 'next/navigation'

type Props = {
  packageId: string
}

export default function ExerciseQuestionList({ packageId }: Props) {
  const searchParams = useSearchParams()
  const question_id = searchParams.get("question_id")

  const { response, loading, fetchData } = useFetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/exercise/question-lists/${packageId}?question_id=${question_id}`,
    {},
    false
  )

  useEffect(() => {
    if (question_id) {
      fetchData()
    }
  }, [question_id])

  const questionData = response?.data

  return (
    <div>
      {
        loading ? <p>Load data...</p> :
          questionData && (
            <QuestionCard
              key={questionData.id}
              question={questionData.question}
              options={questionData.options}
            />
          )
      }
    </div>
  )
}
