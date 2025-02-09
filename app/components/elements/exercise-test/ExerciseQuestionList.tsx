"use client"
import { ExerciseCategory } from '@/app/types/exerciseType'
import useFetch from '@/app/utils/hooks/useFetch'
import React, { useEffect } from 'react'
import QuestionCard from './QuestionCard'
import { useSearchParams } from 'next/navigation'

type Props = {
  category: ExerciseCategory
  packageId: string
}

export default function ExerciseQuestionList({ category, packageId }: Props) {
  const searchParams = useSearchParams()
  const question_id = searchParams.get("question_id")

  const { response, loading, fetchData } = useFetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/question/${ExerciseCategory[category]}/${packageId}?question_id=${question_id}`,
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
              category={ExerciseCategory[category]}
              packageId={packageId}
              question={questionData.question}
              options={questionData.options}
            />
          )
      }
    </div>
  )
}
