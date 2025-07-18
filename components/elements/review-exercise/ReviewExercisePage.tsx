"use client"
import Loading from '@/app/loading'
import useFetch from '@/utils/hooks/useFetch'
import ReviewExerciseHeading from './ReviewExerciseHeading'
import ReviewQuestionCardLists from './ReviewQuestionCardLists'

type Props = {
    reviewId: string
}

export default function ReviewExercisePage({ reviewId }: Props) {
    const { response, loading } = useFetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/completed-exercise/${reviewId}`)
    if (loading) return <Loading />

    return (
        <div>
            {
                response?.data &&
                <div>
                    <ReviewExerciseHeading exerciseId={response.data.exerciseId} score={response.data.score} />
                    <ReviewQuestionCardLists data={response.data} />
                </div>
            }
        </div>
    )
}
