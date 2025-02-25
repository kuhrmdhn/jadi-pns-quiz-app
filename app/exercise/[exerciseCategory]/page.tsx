
import React from 'react'
import ExercisePackageList from '@/components/elements/exercise/ExercisePackageList'
import { ExerciseCategory } from '@/types/exerciseType'

export default async function QuestionTopicPage({ params }: { params: Promise<{ exerciseCategory: ExerciseCategory }> }) {
  const { exerciseCategory } = await params
  return (
    <ExercisePackageList category={ExerciseCategory[exerciseCategory]} />
  )
}
