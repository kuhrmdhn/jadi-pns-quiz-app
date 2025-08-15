import { firebaseAdminStore } from "@/utils/firebase/admin";
import { ExerciseCategorySchema } from "@/utils/schema/exerciseSchema";

export async function getLearningTopics(category: string) {
    const learningCategoryParse = await ExerciseCategorySchema.safeParseAsync(category)
    if(!learningCategoryParse.success) {
        throw new Error(`${category} is not exist in valid learning category, ${learningCategoryParse.error}`)
    }

    const snapshotQuery = firebaseAdminStore.collection("learning").where("category", "==", learningCategoryParse.data)
    const snapshot = await snapshotQuery.get()
    if (snapshot.empty) {
        throw new Error(`Can't find learning list for ${learningCategoryParse.data}, learning list is maybe empty`)
    }

    const learningCategoryId = snapshot.docs[0].id

    const topicsCollection = await firebaseAdminStore.collection(`learning/${learningCategoryId}/topics`).get()
    const topics = topicsCollection.docs.map((doc) => {
        const { topic } = doc.data()
        return topic
    })

    return topics
}