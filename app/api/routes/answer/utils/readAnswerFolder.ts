import path from "path";
import { readdir, readFile } from "fs/promises"
import { ExerciseCategory } from "@/app/types/exerciseType";

export const readAnswerFolder = async (category: ExerciseCategory) => {
    const folderPath = `${process.env.NEXT_PUBLIC_ANSWER_SOURCE_ENDPOINT}`
    const folderDirectory = path.join(process.cwd(), `${folderPath}/${category}`);
    const fileDir = await readdir(folderDirectory)
    const fileLists = fileDir.filter(file => file.endsWith('.json'))
    
    const files = await Promise.all(fileLists.map(async (file) => {
        try {
            const filePath = path.join(folderDirectory, file);
            const fileContent = await readFile(filePath, "utf-8");
            const jsonData = JSON.parse(fileContent);
            return {
                id: jsonData.id,
                name: jsonData.name,
                total_question: jsonData.total_question,
                test_duration: jsonData.test_duration
            };
        } catch (error) {
            throw new Error(`Cant reading question files for ${category}`)
        }
    }))

    return files
}