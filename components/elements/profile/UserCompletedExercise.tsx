import { useUserStore } from '@/utils/store/useUserStore'
import React from 'react'

export default function UserCompletedExercise() {
    const { userData } = useUserStore()
    return (
        <div>
            {userData?.completedExercise ? "ada" : "Nggak"}
        </div>
    )
}
