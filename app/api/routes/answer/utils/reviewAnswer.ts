import { AnswerReview } from "./calculateScore";

export const reviewAnswer = (correctAnswer: string[], userAnswers: string[]): AnswerReview[] => {
    const review: AnswerReview[] = correctAnswer.map((answer, index) => {
        return {
            question_number: index + 1,
            correct_answer: answer,
            user_answer: userAnswers[index],
            is_correct: userAnswers[index] === answer
        }
    })

    return review
}