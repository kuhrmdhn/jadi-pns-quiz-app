import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { Exercise, ExerciseCategory } from "../../../../utils/schema/exerciseSchema";
import { fetchExerciseAnswers } from "./utils/fetchExerciseAnswers";
import { fetchExerciseQuestion } from "./utils/fetchExerciseQuestion";
import { fetchExercisesByCategory } from "./utils/fetchExercisesByCategory";
import { uploadNewExercise } from "./utils/uploadNewExercise";
import { validateAdminToken } from "./utils/validateAdminToken";
import { validateExerciseData } from "./utils/validateExerciseData";
import { validateUserToken } from "./utils/validateUserToken";
import { fetchUserCompletedExercise } from "./utils/fetchUserCompletedExercise";
import { uploadUserCompletedExercise } from "./utils/uploadUserCompletedExercise";
import { evaluateExercise } from "./utils/evaluatingExercise";

const exercise = new Hono()

exercise.onError((err, c) => {
    const error = err as Error
    console.error(error);
    return c.json({ message: error.message }, 500)
})

exercise.get("/exercise-list/:exercise_category/topic", async (c) => {
    const { exercise_topic } = c.req.query()
    const { exercise_category } = c.req.param();
    const exerciseLists = await fetchExercisesByCategory(exercise_category as ExerciseCategory)
    let exerciseListData = exerciseLists.filter((exercise) => exercise.topic !== null)

    if (exercise_topic) {
        const keyword = exercise_topic.toLowerCase()
        exerciseListData = exerciseListData.filter((exercise) => exercise.topic?.toLowerCase().includes(keyword))
    }

    return c.json({
        data: exerciseListData,
        message: `Success get question list for ${exercise_category} category`
    }, 200);
});

exercise.get("/exercise-list/:exercise_category/package", async (c) => {
    const { exercise_category } = c.req.param();
    const exerciseLists = await fetchExercisesByCategory(exercise_category as ExerciseCategory)
    const exerciseListData = exerciseLists.filter((exercise) => exercise.topic === null)

    return c.json({
        data: exerciseListData,
        message: `Success get question list for ${exercise_category} category`
    }, 200);
})

exercise.get("/question-lists/:exercise_id", async (c) => {
    const { question_id } = c.req.query()
    const { exercise_id } = c.req.param()

    if (question_id) {
        const question = await fetchExerciseQuestion(exercise_id, question_id)
        return c.json({
            message: `Success get question exercise id: ${exercise_id} and question id: ${question_id}`,
            data: question
        }, 200)
    }

    const questionDoc = await fetchExerciseQuestion(exercise_id)
    return c.json({
        message: `Success get all question data exercise id: ${exercise_id}`,
        data: questionDoc,
        totalQuestions: questionDoc.length
    }, 200)
})

exercise.post("/evaluation/:exercise_id", async (c) => {
    const { user_answers } = await c.req.json()
    const { exercise_id } = c.req.param()
    const authToken = getCookie(c, "firebase_token")

    await validateUserToken(authToken)
    if (!user_answers) {
        return c.json("User answers is required", 400)
    }

    const result = await evaluateExercise(exercise_id, user_answers);
    return c.json({
        message: `Evaluation done for exercise ${exercise_id}`,
        ...result
    }, 200)
})

exercise.post("/new-exercise", async (c) => {
    const { exerciseData } = await c.req.json()
    const validateExerciseSchema = await validateExerciseData(exerciseData)
    const authToken = getCookie(c, "firebase_token");
    await validateAdminToken(authToken)

    const { total_question, questions, answers } = validateExerciseSchema
    if (total_question > questions.length) {
        return c.json("Total question not match with questions length", 400)
    }
    if (total_question > answers.length) {
        return c.json("Total question not match with answers length", 400)
    }

    await uploadNewExercise(validateExerciseSchema as Exercise)
    return c.json("New exercise created!", 201)
})

exercise.get("/completed-exercise/:user_id", async (c) => {
    const { user_id } = c.req.param()
    if (!user_id) {
        return c.json({ message: "User id is required" }, 400)
    }

    const authToken = getCookie(c, "firebase_token")
    await validateUserToken(authToken)

    const completedExercise = await fetchUserCompletedExercise(user_id)

    return c.json({
        message: "Success get user completed exercise",
        data: completedExercise
    }, 200)
})

exercise.post("/completed-exercise/new", async (c) => {
    const { userId, exerciseResultData } = await c.req.json()
    const authToken = getCookie(c, "firebase_token")
    await validateUserToken(authToken)

    if (!userId) return c.json({ message: "User id is required" }, 400)

    const { score } = await evaluateExercise(exerciseResultData.exerciseId, exerciseResultData.userAnswers);

    const uploadData = await uploadUserCompletedExercise(userId, { ...exerciseResultData, score })
    return c.json({
        message: "Success upload user completed exercise",
        data: uploadData
    }, 200)
})

export default exercise