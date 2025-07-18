import { firebaseAdminStore } from "@/utils/firebase/admin";
import { Exercise } from "@/utils/schema/exerciseSchema";

export async function fetchExerciseBaseData(exerciseId: string) {
    const collectionRef = firebaseAdminStore.doc(`exercises/${exerciseId}`)
    const exerciseAnswersRef = firebaseAdminStore.collection(`${collectionRef.path}/correct_answers`)
    const exerciseQuestionsRef = firebaseAdminStore.collection(`${collectionRef.path}/questions`)

    const exerciseSnap = await collectionRef.get()
    if (!exerciseSnap.exists) {
        throw new Error(`Cant get user exercise data exercise id: ${exerciseId}`)
    }
    const { id, ...exerciseData } = exerciseSnap.data() as Exercise

    const answersSnap = await exerciseAnswersRef.get()
    if (answersSnap.empty) {
        throw new Error(`Cant get user exercise answers data exercise id: ${exerciseId}`)
    }
    const { answers: correctAnswers } = answersSnap.docs.flatMap((answer) => answer.data())[0]

    const questionsSnap = await exerciseQuestionsRef.get()
    if (questionsSnap.empty) {
        throw new Error(`Cant get user exercise questions data exercise id: ${exerciseId}`)
    }
    const questions = questionsSnap.docs.flatMap((question) => question.data())

    const baseData = { ...exerciseData, correctAnswers, questions }
    return baseData
}