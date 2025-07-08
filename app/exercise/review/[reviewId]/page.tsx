import ReviewExercisePage from '@/components/elements/review-exercise/ReviewExercisePage'
import React from 'react'

type Props = {
    params: Promise<{
        reviewId: string
    }>
}

export default async function page({ params }: Props) {
    const { reviewId } = await params
    return (
        <div>
            <ReviewExercisePage reviewId={reviewId} />
        </div>
    )
}
