import { firestore } from "@/utils/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Hono } from "hono";
import { validateQuestionCategory } from "./utils/validateQuestionCategory";
import { firebaseAdminAuth, firebaseAdminStore } from "@/utils/firebase/admin";
import { getCookie } from "hono/cookie";

const exercise = new Hono()

exercise.get("/exercise-list/:exercise_category", async (c) => {
    const { exercise_category } = c.req.param();
    const exerciseCollections = collection(firestore, "exercises")

    try {
        validateQuestionCategory(exercise_category)
        const exerciseQuery = query(exerciseCollections, where("category", "==", exercise_category))
        const exerciseLists = await getDocs(exerciseQuery)

        if (!exerciseLists.docs) {
            throw new Error(`Question for ${exercise_category} is empty`)
        }

        const exerciseListData = exerciseLists.docs.map((exercise) => exercise.data())
        return c.json({
            data: exerciseListData,
            message: `Success get question list for ${exercise_category} category`
        }, 200);

    } catch (error) {
        console.error(error);
        const errors = error as Error
        return c.json({ message: errors.message }, 400);
    }
});

exercise.get("/question-lists/:exercise_id", async (c) => {
    const { question_id } = c.req.query()
    const { exercise_id } = c.req.param()

    try {
        const questionListsRef = collection(firestore, `exercises/${exercise_id}/questions`)

        const questionSnapShoot = await getDocs(questionListsRef)
        const questionDoc = questionSnapShoot.docs.flatMap((snapShoot) => snapShoot.data())
        const questionLength = questionDoc.length

        if (parseInt(question_id) > questionLength) {
            throw new Error(`Questions only ${questionLength}, cant get question number ${question_id}`)
        }

        if (question_id) {
            const questionIdQuery = query(questionListsRef, where("id", "==", parseInt(question_id)))
            const questionByIdSnapShoot = await getDocs(questionIdQuery)
            const question = questionByIdSnapShoot.docs[0].data()
            return c.json({
                message: `Success get question exercise id: ${exercise_id} and question id: ${question_id}`,
                data: question
            }, 200)
        }

        return c.json({
            message: `Success get all question data exercise id: ${exercise_id}`,
            data: questionDoc
        }, 200)

    } catch (error) {
        console.error(error);
        const errors = error as Error
        return c.json({ message: errors.message }, 400)
    }
})

exercise.post("/evaluation/:exercise_id", async (c) => {
    const { user_answers } = await c.req.json()
    const { exercise_id } = c.req.param()
    const token = getCookie(c, "firebase_token")

    try {
        if (!token) {
            throw new Error("Token is undefined or expired")
        }

        if(!user_answers) {
            throw new Error("User answers is required")
        }
        await firebaseAdminAuth.verifyIdToken(token);
        const correctAnswerDoc = firebaseAdminStore.collection(`exercises/${exercise_id}/correct_answers`)

        if (!correctAnswerDoc) {
            throw new Error(`Cant get correct answer for exercise with id ${exercise_id}`)
        }

        const data = await correctAnswerDoc.get()
        const { answers } = data.docs.map(e => e.data())[0]
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

export default exercise