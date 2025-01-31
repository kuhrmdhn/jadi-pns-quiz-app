import { Hono } from "hono";
import fs from "fs/promises"
import path from "path";

const question = new Hono()

question.get("question-list/:question_category", async (c) => {
    const { question_category } = c.req.param();

    if (!question_category) {
        return c.json({
            message: "Question category not found or empty, please check request"
        }, 400);
    }

    const folderDir = path.join(process.cwd(), "app" ,"constant", "question", question_category);

    try {
        const fileList = (await fs.readdir(folderDir))
            .filter(file => file.endsWith('.json'))
            .map(file => path.parse(file).name);

        return c.json({
            data: fileList,
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
    const { question_category, question_package } = c.req.param()
    const filePath = path.resolve("./app/constant/question", `${question_category}/${question_package}.json`)

    if (!question_package) {
        return c.json({
            message: "Bad request: question package invalid or empty"
        }, 400)
    }

    try {
        const fileData = await fs.readFile(filePath, "utf-8")
        const questionData = JSON.parse(fileData)
        return c.json({
            message: `Success get question, category: ${question_category} and package: ${question_package}`,
            data: questionData
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
        await fs.writeFile(`./app/constant/question/${file_name}`, newData)
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