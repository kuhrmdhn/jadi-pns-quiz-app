import { ExerciseCategory } from "@/app/types/exerciseType";
import { Hono } from "hono";
import path from "path";
import { readQuestionFolder } from "./utils/readQuestionFolder";
import { readQuestionPackage } from "./utils/readQuestionPackage";
import { uploadNewQuestion } from "./utils/uploadNewQuestion";
import { validateQuestionCategory } from "./utils/validateQuestionCategory";
import { validateQuestionData } from "./utils/validateQuestionData";
import { validateQuestionPackage } from "./utils/validateQuestionPackage";

const question = new Hono()
const questionFilePath = `${process.env.NEXT_PUBLIC_QUESTION_SOURCE_ENDPOINT}`

question.get("question-list/:question_category", async (c) => {
    const { question_category } = c.req.param();

    try {
        validateQuestionCategory(question_category)
        const fileData = await readQuestionFolder(question_category as ExerciseCategory)

        return c.json({
            data: fileData,
            message: `Success get question list for ${question_category} category`
        }, 200);

    } catch (error) {
        console.error(error);
        const errors = error as Error
        return c.json({ message: errors.message }, 400);
    }
});

question.get("/:question_category/:question_package", async (c) => {
    const { question_id } = c.req.query()
    const { question_category, question_package } = c.req.param()

    try {
        validateQuestionCategory(question_category)
        validateQuestionPackage(question_package)

        const filePath = path.resolve(questionFilePath, `${question_category}/${question_package}.json`)
        const questionsData = await readQuestionPackage(filePath, question_id)
        return c.json({
            message: `Success get question, category: ${question_category} and package: ${question_package} ${question_id && `with id: ${question_id}`}`,
            data: questionsData
        }, 200)

    } catch (error) {
        console.error(error);
        const errors = error as Error
        return c.json({ message: errors.message }, 400)
    }
})

question.post("/new-question", async (c) => {
    const { question_data } = await c.req.json()
    try {
        await validateQuestionData(question_data)
        const { id: file_name } = question_data

        await uploadNewQuestion(question_data)
        return c.json({
            message: `Success write new file JSON: ${file_name}`
        }, 200)
    } catch (error) {
        console.error(error);
        const errors = error as Error
        return c.json({ message: errors.message }, 400)
    }
})

export default question