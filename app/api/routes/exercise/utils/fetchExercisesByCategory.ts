import { collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "@/utils/firebase/firebase"
import { ExerciseCategory } from "./exerciseSchema"

export async function fetchExercisesByCategory(category: ExerciseCategory) {
    const exerciseCollections = collection(firestore, "exercises")
    const exerciseQuery = query(exerciseCollections, where("category", "==", category))
    const exerciseListsSnapshot = await getDocs(exerciseQuery)

    if (exerciseListsSnapshot.empty) {
        throw new Error("Cant get exercise list")
    }

    const exerciseLists = exerciseListsSnapshot.docs.map((exercise) => exercise.data())
    return exerciseLists
}