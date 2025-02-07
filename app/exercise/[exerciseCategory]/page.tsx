
import React from 'react'
import ExercisePackageList from '../../components/elements/exercise/ExercisePackageList'

export default async function QuestionTopicPage({ params }: { params: Promise<{ exerciseCategory: string }> }) {
  const { exerciseCategory } = await params
  return (
    <ExercisePackageList category={exerciseCategory} />
  )
}
