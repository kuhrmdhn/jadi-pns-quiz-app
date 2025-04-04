import { firestore } from "@/utils/firebase/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"

export async function fetchExerciseQuestion(exerciseId: string, questionId?: string) {
    const questionListsRef = collection(firestore, `exercises/${exerciseId}/questions`)
    const questionSnapshot = await getDocs(questionListsRef)

    if (questionSnapshot.empty) {
        throw new Error("Cant get exercise question")
    }

    let questionDoc = questionSnapshot.docs.flatMap((snapshot) => snapshot.data())
    const questionLength = questionDoc.length
    
    if (questionId) {
        if (parseInt(questionId) > questionLength) {
            throw new Error(`Invalid question id, max questions is ${questionLength}, cant get question number ${questionId}`)
        }

        const questionIdQuery = query(questionListsRef, where("id", "==", parseInt(questionId)))
        const questionByIdSnapShoot = await getDocs(questionIdQuery)
        const question = questionByIdSnapShoot.docs[0].data()
        return question
    }

    return questionDoc
}