import React from 'react'

type Props = {
    params: {
        reviewId: string
    }
}

export default async function page({ params }: Props) {
    const { reviewId } = await params
    // get review id
    // get users/completed_exercise/reviewId => review id, exercise id, score, and user answers
    // get questions by exercise id
    // assign user answer and correct answer each question

    return (
        <div>
        </div>
    )
}
