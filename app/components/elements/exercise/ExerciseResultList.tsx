import { useUserStore } from '@/app/utils/store/useUserStore'
import React from 'react'
import { useShallow } from 'zustand/shallow'
import ExerciseResultCard from './ExerciseResultCard'

export default function ExerciseResultList() {
    const { userData } = useUserStore(useShallow((state) => ({
        userData: state.userData
    })))
    return (
        <section className='home-section-container'>
            <h1 className='text-lg font-bold'>Tes Selesai</h1>
            <div className='h-auto w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 justify-items-center'>
                {
                    userData.completedTest?.map((exercise) => (
                        <ExerciseResultCard
                            key={exercise.id}
                            {...exercise}
                        />
                    ))
                }
            </div>
        </section>
    )
}
