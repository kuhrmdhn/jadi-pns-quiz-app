export type AnswerReview = {
    question_number: number
    is_correct: boolean
    correct_answer: string
    user_answer: string
}

export const calculateScore = (correctAnswer: AnswerReview[]): number => {
    const score = correctAnswer.filter((review: AnswerReview) => review.is_correct).length
    return score
}