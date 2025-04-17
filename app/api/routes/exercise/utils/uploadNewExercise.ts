import { firebaseAdminStore } from "@/utils/firebase/admin";
import { Exercise } from "../../../../../utils/schema/exerciseSchema";

export async function uploadNewExercise(exerciseData: Exercise) {
    try {
        const { answers, questions, ...exercise } = exerciseData
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
    } catch (err) {
        const error = err as Error
        throw new Error(error.message)
    }
}