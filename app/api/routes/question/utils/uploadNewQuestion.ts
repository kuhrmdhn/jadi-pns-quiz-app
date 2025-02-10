import { Exercise } from "@/app/types/exerciseType"
import { writeFile } from "fs/promises"

export const uploadNewQuestion = async (data: Exercise) => {
    const folderPath = `${process.env.NEXT_PUBLIC_QUESTION_SOURCE_ENDPOINT}`
    const newData = JSON.stringify(data, null, 2)
    const { category, id: name } = data

    await writeFile(`${folderPath}/${category}/${name}.json`, newData)
}