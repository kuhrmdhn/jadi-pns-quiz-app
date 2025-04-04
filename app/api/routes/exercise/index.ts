import { firebaseAdminAuth, firebaseAdminStore } from "@/utils/firebase/admin";
import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { ExerciseCategory, exerciseSchema } from "./utils/exerciseSchema";
import { fetchExercisesByCategory } from "./utils/fetchExercisesByCategory";
import { fetchExerciseQuestion } from "./utils/fetchExerciseQuestion";
import { fetchExerciseAnswers } from "./utils/fetchExerciseAnswers";

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

        if (!authToken) {
            return c.json("Token is undefined or expired", 403)
        }

        if (!user_answers) {
            return c.json("User answers is required", 400)
        }

        await firebaseAdminAuth.verifyIdToken(authToken);
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
        const validateExerciseSchema = exerciseSchema.safeParse(exerciseData)
        if (!validateExerciseSchema.success) {
            const { issues } = validateExerciseSchema.error
            const errorMessage = issues
                .map(issue => `Error on ${issue.path.join(".")} path: ${issue.message}`)
                .join("\n");

            return c.json(errorMessage, 400)
        }

        const authToken = getCookie(c, "firebase_token");
        if (!authToken) {
            return c.json("Auth Token is not found. Make sure user is logged in", 401)
        }

        try {
            const validateUserToken = await firebaseAdminAuth.verifyIdToken(authToken)
            if (!validateUserToken?.admin) {
                return c.json("Access denied, token is undefined or user is not admin", 403)
            }
        } catch (e) {
            return c.json("Invalid or expired token. Please log in again.", 401);
        }

        const { answers, questions, ...exercise } = validateExerciseSchema.data
        if (exercise.total_question > questions.length) {
            return c.json("Total question not match with questions length", 400)
        }
        if (exercise.total_question > answers.length) {
            return c.json("Total question not match with answers length", 400)
        }

        const exerciseBatch = firebaseAdminStore.batch()
        const exerciseRef = firebaseAdminStore.collection("exercises").doc();
        exerciseBatch.set(exerciseRef, { ...exercise, id: exerciseRef.id });

        questions.forEach((question, index) => {
            const questionRef = exerciseRef.collection("questions").doc();
            exerciseBatch.set(questionRef, { ...question, id: index + 1 });
        });

        const answerRef = exerciseRef.collection("correct_answers").doc();
        exerciseBatch.set(answerRef, { answers });

        await exerciseBatch.commit();

        return c.json("New exercise created!", 201)
    } catch (e) {
        console.log(e)
        return c.json("Internal server error", 500)
    }
})

export default exercise