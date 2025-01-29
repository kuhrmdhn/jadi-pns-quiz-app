import { Hono } from "hono";
import path from "path";
import fs from "fs/promises"

type Review = {
    question_number: number,
    is_correct: boolean
}

const answer = new Hono()

answer.post("/:question_category/:question_package", async (c) => {
    const { question_category, question_package } = c.req.param()
    try {
        const answerPath = path.resolve("./app/constant/answer", `${question_category}/${question_package}.json`)
        const answerFile = await fs.readFile(answerPath, "utf-8")
        const { answers } = JSON.parse(answerFile)
        const { userAnswers } = await c.req.json()

        if(!userAnswers || userAnswers.length === 0) {
            return c.json({
                message: "User Answers cant be empty"
            }, 400)
        }

        const reviewResult = answers.map((a: string, i: number) => {
            return {
                question_number: i + 1,
                is_correct: userAnswers[i] === a,
                correct_answer: a,
                user_answer: userAnswers[i]
            }
        })
        const correctAnswer = reviewResult.filter((review: Review) => review.is_correct).length
        return c.json({ data: reviewResult, correct: correctAnswer }, 200)
    } catch (error) {
        console.error(error);
        
    }
})

answer.post("/new-answer", async (c) => {
    const { json_data, file_name } = await c.req.json()
    if (!json_data || !file_name) {
        return c.json({
            message: "JSON Data or file name cant be empty"
        }, 400)
    }
    try {
        const newData = JSON.stringify(json_data, null, 2)
        await fs.writeFile(`./app/constant/answer/${file_name}`, newData)
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


export default answer