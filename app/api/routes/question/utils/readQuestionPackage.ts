import { Exercise } from "@/app/types/exerciseType"
import { readFile } from "fs/promises"

export const readQuestionPackage = async (filePath: string, questionId?: string) => {
    const fileData = await readFile(filePath, "utf-8")
    const questionsData = await JSON.parse(fileData)

    if(questionId) {
        const questionData = questionsData.questions.find((question:Exercise) => question.id == questionId)
        if(!questionData) {
            throw new Error(`Question with ID ${questionId} not found`)
        }
        return questionData
    }

    return questionsData
}