import { ExerciseCategory } from "@/app/types/exerciseType"
import { writeFile } from "fs/promises"

export const uploadNewAnswer = async (answersData: string[], category: ExerciseCategory, fileName: string) => {
    const folderPath = `${process.env.NEXT_PUBLIC_ANSWER_SOURCE_ENDPOINT}`
    const newData = JSON.stringify(answersData, null, 2)
    await writeFile(`${folderPath}/${category}/${fileName}.json`, newData)
}