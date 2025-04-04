import { firebaseAdminStore } from "@/utils/firebase/admin"

export async function fetchExerciseAnswers(exerciseId:string) {
            const correctAnswerDoc = firebaseAdminStore.collection(`exercises/${exerciseId}/correct_answers`)
    
            if (!correctAnswerDoc) {
                throw new Error(`Cant get correct answer for exercise with id ${exerciseId}`)
            }
    
            const data = await correctAnswerDoc.get()
            const { answers } = data.docs.map(e => e.data())[0]
            return answers
}