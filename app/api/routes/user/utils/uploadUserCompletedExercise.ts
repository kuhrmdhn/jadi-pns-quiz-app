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

    const completedExerciseCollectionRef = firebaseAdminStore.collection(`users/${userId}/completed_exercise`);
    const snapshot = await completedExerciseCollectionRef
        .where("exerciseId", "==", exerciseResultData.exerciseId)
        .get();

    let uploadData;
    let docRef;
    if (!snapshot.empty) {
        const docSnap = snapshot.docs[0];
        const existingData = docSnap.data();
        uploadData = { ...existingData, score: exerciseResultData.score };
        docRef = docSnap.ref;
    } else {
        uploadData = { id: '', ...exerciseResultData };
        docRef = completedExerciseCollectionRef.doc();
        uploadData.id = docRef.id;
    }

    await docRef.set(uploadData);

    return uploadData;
}