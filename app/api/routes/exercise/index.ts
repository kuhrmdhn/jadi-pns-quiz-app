import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { Exercise, ExerciseCategory } from "../../../../utils/schema/exerciseSchema";
import { fetchExerciseQuestion } from "./utils/fetchExerciseQuestion";
import { fetchExercisesByCategory } from "./utils/fetchExercisesByCategory";
import { uploadNewExercise } from "./utils/uploadNewExercise";
import { validateAdminToken } from "./utils/validateAdminToken";
import { validateExerciseData } from "./utils/validateExerciseData";

const exercise = new Hono()

exercise.onError((err, c) => {
    const error = err as Error
    console.error(error);
    return c.json({ message: error.message }, 500)
})

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

        if (exerciseLists.length === 0) {
            return c.json({ message: `No exercises found for category ${exercise_category}` }, 404);
        }        

        return c.json({
            data: exerciseListData,
            message: `Success get question list for ${exercise_category} category`
        }, 200);
    } catch (err) {
        const error = err as Error;
        console.error(error);
        return c.json({ message: error.message }, 404);
    }
});

exercise.get("/exercise-list/:exercise_category/package", async (c) => {
    try {
        const { exercise_category } = c.req.param();
        const exerciseLists = await fetchExercisesByCategory(exercise_category as ExerciseCategory)
        const exerciseListData = exerciseLists.filter((exercise) => exercise.topic === null)

        if (exerciseLists.length === 0) {
            return c.json({ message: `No exercises found for category ${exercise_category}` }, 404);
        }        

        return c.json({
            data: exerciseListData,
            message: `Success get question list for ${exercise_category} category`
        }, 200);
    } catch (err) {
        const error = err as Error;
        console.error(error);
        return c.json({ message: error.message }, 404);
    }
});

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

export default exercise