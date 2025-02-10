import { ExerciseCategory } from "@/app/types/exerciseType"
import { readAnswerFolder } from "./readAnswerFolder"
import { validatePackageName } from "../../question/utils/validateQuestionPackage"

export const validateAnswerFileName = async (category: ExerciseCategory, planName: string) => {
    validatePackageName(planName)
    const answerFiles = await readAnswerFolder(category)
    const isSameNameFile = answerFiles.find((file) => file.name == planName)

    if(isSameNameFile) {
        throw new Error(`${planName} is exist in answer ${category} category`)
    }
}