import { ReviewExerciseData } from '@/utils/schema/exerciseSchema'
import ReviewQuestionCard from './ReviewQuestionCard'

type Props = {
    data: ReviewExerciseData
}

export default function ReviewQuestionCardLists({ data }: Props) {
    const sortedQuestion = data.exerciseQuestions.sort((a, b) => {
        if (a.id && b.id) {
            return parseInt(a.id) - parseInt(b.id)
        }
        return 0
    })

    return (
        <div className='flex flex-col gap-3 items-center'>
            {
                sortedQuestion.map((e, i) => (
                    <ReviewQuestionCard
                        key={i}
                        correctAnswer={data.correctAnswers[i]}
                        question={e.question}
                        questionOptions={e.options}
                        userAnswer={data.userAnswers[i]}
                    />
                ))
            }
        </div>
    )
}
