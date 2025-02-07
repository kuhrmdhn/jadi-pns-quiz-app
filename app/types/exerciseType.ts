export interface Exercise {
    id: number
    name: string
    question: string
    options: string[]
    total_question: number
    test_duration: number
    category: ExerciseCategory
}


export enum ExerciseCategory {
    TWK = "TWK",
    TIU = "TIU",
    TKP = "TKP"
}