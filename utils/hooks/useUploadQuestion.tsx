import { useState } from "react";
import { addDoc, collection, doc, updateDoc, writeBatch } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { Exercise } from "../schema/exerciseSchema";

export default function useUploadExercise(exerciseData: Exercise, correctAnswers: string[]) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function uploadExerciseData() {
        setLoading(true);
        setError(null);
        try {
            const { questions, ...data } = exerciseData;
            const exerciseDoc = await addDoc(collection(firestore, "exercises"), data);
            const exerciseRef = doc(firestore, "exercises", exerciseDoc.id);
            await updateDoc(exerciseRef, { id: exerciseDoc.id });

            const batch = writeBatch(firestore);

            const correctAnswersDocRef = doc(firestore, `exercises/${exerciseDoc.id}/correct_answers`, "answers");
            batch.set(correctAnswersDocRef, { answers: correctAnswers });

            const questionsRef = collection(firestore, `exercises/${exerciseDoc.id}/questions`);
            questions.forEach((question) => {
                const questionDocRef = doc(questionsRef);
                batch.set(questionDocRef, question);
            });

            await batch.commit();
        } catch (err: any) {
            setError(err.message);
            console.error("Upload failed:", err);
        } finally {
            setLoading(false);
        }
    }

    return { uploadExerciseData, loading, error };
}
