import React from 'react'

type Props = {
    params: Promise<{
        exerciseId: string
    }>
}

export default async function ExerciseStartPage({ params }: Props) {
    const { exerciseId } = await params
    return (
        <div>Exercise for {exerciseId} </div>
    )
}
