import { firestore } from "@/app/utils/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Hono } from "hono";
import { validateQuestionCategory } from "./utils/validateQuestionCategory";

const exercise = new Hono()

exercise.get("exercise-list/:exercise_category", async (c) => {
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

exercise.get("question-lists/:exercise_id", async (c) => {
    const { question_id } = c.req.query()
    const { exercise_id } = c.req.param()

    try {
        const questionListsRef = collection(firestore, `exercises/${exercise_id}/questions`)

        const questionSnapShoot = await getDocs(questionListsRef)
        const questionDoc = questionSnapShoot.docs.flatMap((snapShoot) => snapShoot.data())
        const questionLength = questionDoc.length

        if(parseInt(question_id) > questionLength) {
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

export default exercise