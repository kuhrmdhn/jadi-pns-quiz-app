import { firebaseAdminStore } from "@/utils/firebase/admin";

export const fetchCompletedExerciseById = async (userId: string, reviewId: string) => {
    const userCompletedExerciseDoc = firebaseAdminStore.doc(`users/${userId}/completed_exercise/${reviewId}`);
    const doc = await userCompletedExerciseDoc.get();

    if (!doc.exists) {
        throw new Error(`Cant get user completed exercise user id: ${userId}, review id: ${reviewId}`)
    }
    console.log(doc.data())

    return doc.data()
}