import { Hono } from "hono";
import path from "path";
import fs from "fs/promises"
import { validateUserAnswer } from "./utils/validateUserAnswer";
import { calculateScore } from "./utils/calculateScore";
import { reviewAnswer } from "./utils/reviewAnswer";
import { validateAnswerFileName } from "./utils/validateAnswerFileName";
import { uploadNewAnswer } from "./utils/uploadNewAnswer";

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
    try {
        const { answersData, fileName, category } = await c.req.json()
        await validateAnswerFileName(category, fileName)

        await uploadNewAnswer(answersData, category, fileName)
        return c.json({
            message: `Success write new file JSON: ${fileName}`
        }, 200)
    } catch (error) {
        console.error(error);
        const errors = error as Error
        return c.json({ message: errors.message }, 400)
    }
})


export default answer