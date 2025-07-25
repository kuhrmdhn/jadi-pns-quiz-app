import { firebaseAdminStore } from "@/utils/firebase/admin"
import { Exercise } from "@/utils/schema/exerciseSchema"

export const fetchExerciseTitle = async (exerciseId: string) => {
    const exerciseDoc = firebaseAdminStore.doc(`exercises/${exerciseId}`)
    const exerciseSnapshot = await exerciseDoc.get()
    const { name, ...exerciseData } = exerciseSnapshot.data() as Exercise
    return name
}