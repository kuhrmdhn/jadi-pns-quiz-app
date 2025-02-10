import { ExerciseCategory } from "@/app/types/exerciseType"

export const validateQuestionCategory = (category: string) => {
    if(!category || category === "") {
        throw new Error("Category cannot empty")
    }

    if(!Object.values(ExerciseCategory).includes(category as ExerciseCategory)) {
        throw new Error(`${category} is not exist in category type ${Object.values(ExerciseCategory).join(", ")}`)
    }
}