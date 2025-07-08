import { firebaseAdminStore } from "@/utils/firebase/admin"

export async function fetchUserCompletedExercise(userId: string) {
    const completedExerciseColl = firebaseAdminStore.collection(`users/${userId}/completed_exercise`)
    const snapshot = await completedExerciseColl.get()
    if (snapshot.empty) {
        throw new Error("User not have completed exercise")
    }
    const completedExercise = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

    return completedExercise
}