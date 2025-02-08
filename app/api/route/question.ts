import { Hono } from "hono";
import fs from "fs/promises"
import path from "path";

const question = new Hono()
const questionFilePath = "./app/exercise_source/question"

question.get("question-list/:question_category", async (c) => {
    const { question_category } = c.req.param();

    if (!question_category) {
        return c.json({
            message: "Question category not found or empty, please check request"
        }, 400);
    }

    const folderDir = path.join(process.cwd(), `${questionFilePath}/${question_category}`);

    try {
        const fileList = (await fs.readdir(folderDir)).filter(file => file.endsWith('.json'))
        const data = await Promise.all(fileList.map(async (file) => {
            try {
                const filePath = path.join(folderDir, file);
                const fileContent = await fs.readFile(filePath, "utf-8");
                const jsonData = JSON.parse(fileContent);
                return {
                    id: jsonData.id,
                    name: jsonData.name,
                    total_question: jsonData.total_question,
                    test_duration: jsonData.test_duration
                };
            } catch (error) {
                return { name: `Error reading ${file}`, total_question: 0, test_duration: 0 };
            }
        }))

        return c.json({
            data,
            message: `Success get question list for ${question_category} category`
        }, 200);
    } catch (error) {
        return c.json({
            message: `Can't get question list for '${question_category}' category. It may not exist.`,
            error: error instanceof Error ? error.message : "Unknown error"
        }, 404);
    }
});

question.get("/:question_category/:question_package", async (c) => {
    const { question_id } = c.req.query()
    const { question_category, question_package } = c.req.param()
    const filePath = path.resolve(questionFilePath, `${question_category}/${question_package}.json`)

    if (!question_package) {
        return c.json({
            message: "Bad request: question package invalid or empty"
        }, 400)
    }

    try {
        const fileData = await fs.readFile(filePath, "utf-8")
        const questionsData = JSON.parse(fileData)
        if (question_id) {
            const questionData = questionsData.questions.filter((e: any) => e.id == question_id)
            return c.json({
                message: `Success get question, category: ${question_category}, package: ${question_package} and id: ${question_id}`,
                data: questionData
            })
        }
        return c.json({
            message: `Success get question, category: ${question_category} and package: ${question_package}`,
            data: questionsData
        }, 200)
    } catch (error) {
        console.error(error);
        return c.json({
            message: "Question package not found",
            error
        }, 404)
    }
})

question.post("/new-question", async (c) => {
    const { json_data, file_name } = await c.req.json()
    if (!json_data || !file_name) {
        return c.json({
            message: "JSON Data or file name cant be empty"
        }, 400)
    }
    try {
        const newData = JSON.stringify(json_data, null, 2)
        await fs.writeFile(`${questionFilePath}/${file_name}`, newData)
        return c.json({
            message: `Success write new file JSON: ${file_name}`
        }, 200)
    } catch (error) {
        console.error(error);
        return c.json({
            message: `Failed write new file JSON: ${file_name}`,
            error
        }, 404)
    }
})

export default question