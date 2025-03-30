import { firebaseAdminAuth, firebaseAdminStore } from "@/utils/firebase/admin";
import { firestore } from "@/utils/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { exerciseSchema } from "./utils/exerciseSchema";
import { validateQuestionCategory } from "./utils/validateQuestionCategory";

const exercise = new Hono()

exercise.get("/exercise-list/:exercise_category", async (c) => {
    try {
        const { exercise_category } = c.req.param();
        const exerciseCollections = collection(firestore, "exercises")
        validateQuestionCategory(exercise_category)
        const exerciseQuery = query(exerciseCollections, where("category", "==", exercise_category))
        const exerciseLists = await getDocs(exerciseQuery)

        if (!exerciseLists.docs) {
            return c.json(`Question for ${exercise_category} is empty or undefined`, 404)
        }

        const exerciseListData = exerciseLists.docs.map((exercise) => exercise.data())
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

exercise.get("/question-lists/:exercise_id", async (c) => {
    try {
        const { question_id } = c.req.query()
        const { exercise_id } = c.req.param()

        const questionListsRef = collection(firestore, `exercises/${exercise_id}/questions`)
        const questionSnapShoot = await getDocs(questionListsRef)
        const questionDoc = questionSnapShoot.docs.flatMap((snapShoot) => snapShoot.data())
        const questionLength = questionDoc.length


        if (question_id) {
            if (parseInt(question_id) > questionLength) {
                return c.json(`Invalid question id, max questions is ${questionLength}, cant get question number ${question_id}`, 400)
            }

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
        const correctAnswerDoc = firebaseAdminStore.collection(`exercises/${exercise_id}/correct_answers`)

        if (!correctAnswerDoc) {
            return c.json(`Cant get correct answer for exercise with id ${exercise_id}`, 404)
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

        const exerciseBatch = firebaseAdminStore.batch()
        const exerciseRef = firebaseAdminStore.collection("exercises").doc();
        exerciseBatch.set(exerciseRef, { ...exercise, id: exerciseRef.id });

        questions.forEach((question, index) => {
            const questionRef = firebaseAdminStore.collection("questions").doc();
            exerciseBatch.set(questionRef, { ...question, id: index + 1, exerciseId: exerciseRef.id });
        });

        const answerRef = firebaseAdminStore.collection("correct_answers").doc();
        exerciseBatch.set(answerRef, { answers, exerciseId: exerciseRef.id });

        await exerciseBatch.commit();

        return c.json("New exercise created!", 201)
    } catch (e) {
        console.log(e)
        return c.json("Internal server error", 500)
    }
})

export default exercise