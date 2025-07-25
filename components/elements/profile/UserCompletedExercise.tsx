import { useUserStore } from '@/utils/store/useUserStore'
import React from 'react'
import CompletedExerciseCard from './CompletedExerciseCard'

export default function UserCompletedExercise() {
    const { userData } = useUserStore()
    console.log(userData?.completedExercise)

    return (
        <div>
            {userData?.completedExercise &&
                userData?.completedExercise.map((exercise, index) => (
                    <CompletedExerciseCard
                        key={index}
                        exerciseId={exercise.exerciseId}
                        reviewId={exercise.id}
                        score={exercise.score}
                    />
                ))
            }
        </div>
    )
}
