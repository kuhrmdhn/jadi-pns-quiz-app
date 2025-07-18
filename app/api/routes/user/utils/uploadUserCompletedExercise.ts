import { firebaseAdminStore } from "@/utils/firebase/admin";
import { Exercise } from "@/utils/schema/exerciseSchema";

type ExerciseCompleted = {
    exerciseId: string
    exerciseData: Exercise
    userAnswers: string[]
    score: number
}

export async function uploadUserCompletedExercise(userId: string, exerciseResultData: ExerciseCompleted) {
    const userDoc = await firebaseAdminStore.collection('users').doc(userId).get();
    if (!userDoc.exists) {
        throw new Error(`User with ID: ${userId} is not found`);
    }

    const completedExerciseColl = firebaseAdminStore.collection(`users/${userId}/completed_exercise`).doc()
    const uploadData = {
        id: completedExerciseColl.id,
        ...exerciseResultData
    }

    await completedExerciseColl.set(uploadData)
    return uploadData
}