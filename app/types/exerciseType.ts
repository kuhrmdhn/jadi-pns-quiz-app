export interface Exercise {
    id: string
    name: string
    total_question: number
    test_duration: number
    category: ExerciseCategory
    questions: ExerciseQuestion[]
}

export interface ExerciseQuestion {
    id: number
    question: string
    options: string[]
}

export enum ExerciseCategory {
    TWK = "TWK",
    TIU = "TIU",
    TKP = "TKP"
}