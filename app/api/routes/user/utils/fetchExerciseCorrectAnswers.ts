import { firebaseAdminStore } from "@/utils/firebase/admin";

export async function fetchExerciseCorrectAnswer(exerciseId: string) {
    const collectionRef = firebaseAdminStore.collection(`exercises/${exerciseId}/correct_answers`)
    const correctAnswersSnap = await collectionRef.get()
    if (correctAnswersSnap.empty) {
        throw new Error(`Cant get user exercise correct answers with exercise id: ${exerciseId}`)
    }
    const answersData = correctAnswersSnap.docs.flatMap((e) => e.data())[0].answers
    return answersData
}