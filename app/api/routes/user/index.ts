import { Hono } from "hono"
import { getCookie } from "hono/cookie"
import { validateUserToken } from "../exercise/utils/validateUserToken"
import { evaluateExercise } from "./utils/evaluatingExercise"
import { fetchCompletedExerciseById } from "./utils/fetchCompletedExerciseById"
import { fetchExerciseCorrectAnswer } from "./utils/fetchExerciseCorrectAnswers"
import { fetchUserCompletedExercise } from "./utils/fetchUserCompletedExercise"
import { uploadUserCompletedExercise } from "./utils/uploadUserCompletedExercise"
import { fetchExerciseQuestion } from "../exercise/utils/fetchExerciseQuestion"

const user = new Hono()

user.onError((err, c) => {
    const error = err as Error
    console.error(error);
    return c.json({ message: error.message }, 500)
})

user.get("/completed-exercise/", async (c) => {
    const authToken = getCookie(c, "firebase_token")
    const userId = await validateUserToken(authToken)
    const reviewData = await fetchUserCompletedExercise(userId)

    return c.json({
        message: "Success get completed exercise",
        data: reviewData
    });
})

user.get("/completed-exercise/:reviewId", async (c) => {
    const { reviewId } = c.req.param()
    const authToken = getCookie(c, "firebase_token")
    const userId = await validateUserToken(authToken)
    const reviewData = await fetchCompletedExerciseById(userId, reviewId)

    return c.json({
        message: "Success get completed exercise",
        data: reviewData
    });
})

user.post("/completed-exercise", async (c) => {
    const { exerciseResultData } = await c.req.json()
    const authToken = getCookie(c, "firebase_token")
    const userId = await validateUserToken(authToken)

    if (!userId) return c.json({ message: "User id is required" }, 400)

    const { score } = await evaluateExercise(exerciseResultData.exerciseId, exerciseResultData.userAnswers);
    const correctAnswers = await fetchExerciseCorrectAnswer(exerciseResultData.exerciseId)
    const exerciseQuestions = await fetchExerciseQuestion(exerciseResultData.exerciseId)

    const uploadData = await uploadUserCompletedExercise(userId, { ...exerciseResultData, score, correctAnswers, exerciseQuestions })
    return c.json({
        message: "Success upload user completed exercise",
        data: uploadData
    }, 200)
})


export default user