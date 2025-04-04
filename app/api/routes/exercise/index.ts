import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { Exercise, ExerciseCategory } from "./utils/exerciseSchema";
import { fetchExerciseAnswers } from "./utils/fetchExerciseAnswers";
import { fetchExerciseQuestion } from "./utils/fetchExerciseQuestion";
import { fetchExercisesByCategory } from "./utils/fetchExercisesByCategory";
import { uploadNewExercise } from "./utils/uploadNewExercise";
import { validateAdminToken } from "./utils/validateAdminToken";
import { validateExerciseData } from "./utils/validateExerciseData";
import { validateUserToken } from "./utils/validateUserToken";

const exercise = new Hono()

exercise.get("/exercise-list/:exercise_category/topic", async (c) => {
    try {
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

    } catch (error) {
        console.error(error);
        const errors = error as Error
        return c.json({ message: errors.message }, 500);
    }
});

exercise.get("/exercise-list/:exercise_category/package", async (c) => {
    try {
        const { exercise_category } = c.req.param();
        const exerciseLists = await fetchExercisesByCategory(exercise_category as ExerciseCategory)
        const exerciseListData = exerciseLists.filter((exercise) => exercise.topic === null)

        return c.json({
            data: exerciseListData,
            message: `Success get question list for ${exercise_category} category`
        }, 200);
    } catch (err) {
        console.log(err)
    }
})

exercise.get("/question-lists/:exercise_id", async (c) => {
    try {
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

    } catch (error) {
        console.error(error);
        const errors = error as Error
        return c.json({ message: errors.message }, 500)
    }
})

exercise.post("/evaluation/:exercise_id", async (c) => {
    try {
        const { user_answers } = await c.req.json()
        const { exercise_id } = c.req.param()
        const authToken = getCookie(c, "firebase_token")
        
        await validateUserToken(authToken)
        if (!user_answers) {
            return c.json("User answers is required", 400)
        }

        const answers = await fetchExerciseAnswers(exercise_id)
        const score = answers.filter(((e: string, i: number) => e == user_answers[i])).length
        const wrongAnswer = answers.length - score
        return c.json({
            message: `Evaluation done for exercise ${exercise_id}`,
            score,
            wrongAnswer
        }, 200)

    } catch (err) {
        const error = err as Error
        return c.json({
            message: error.message
        }, 500)
    }
})

exercise.post("/new-exercise", async (c) => {
    try {
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
    } catch (e) {
        console.log(e)
        return c.json("Internal server error", 500)
    }
})

export default exercise