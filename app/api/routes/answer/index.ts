import { Hono } from "hono";
import path from "path";
import fs from "fs/promises"
import { validateUserAnswer } from "./utils/validateUserAnswer";
import { calculateScore } from "./utils/calculateScore";
import { reviewAnswer } from "./utils/reviewAnswer";

const answer = new Hono()
const answerFilePath = "./app/exercise_source/answer"

answer.post("/:question_category/:question_package", async (c) => {
    const { question_category, question_package } = c.req.param()
    try {
        const answerPath = path.resolve(answerFilePath, `${question_category}/${question_package}.json`)
        const answerFile = await fs.readFile(answerPath, "utf-8")
        const { answers } = JSON.parse(answerFile)
        const { userAnswers } = await c.req.json()

        validateUserAnswer(userAnswers, answers)

        const reviewResult = reviewAnswer(answers, userAnswers)
        const score = calculateScore(reviewResult)

        return c.json({ answerReview: reviewResult, score }, 200)
    } catch (error) {
        const errors = error as Error
        console.error(error);
        return c.json({ message: errors.message }, 400);
    }
})

answer.post("/new-answer", async (c) => {
    const { answersData, fileName } = await c.req.json()
    if (!answersData || !fileName) {
        return c.json({
            message: "Answers data or file name cant be empty"
        }, 400)
    }
    try {
        const newData = JSON.stringify(answersData, null, 2)
        await fs.writeFile(`${answerFilePath}/${fileName}`, newData)
        return c.json({
            message: `Success write new file JSON: ${fileName}`
        }, 200)
    } catch (error) {
        console.error(error);
        return c.json({
            message: `Failed write new file JSON: ${fileName}`,
            error
        }, 404)
    }
})


export default answer