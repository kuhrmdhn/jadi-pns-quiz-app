export interface Exercise extends ExerciseQuestion {
    id: number
    name: string
    total_question: number
    test_duration: number
    category: ExerciseCategory
}

export interface ExerciseQuestion {
    question: string
    options: string[]
}

export enum ExerciseCategory {
    TWK = "TWK",
    TIU = "TIU",
    TKP = "TKP"
}