import { firebaseAdminStore } from "@/utils/firebase/admin"
import { ExerciseCategorySchema } from "@/utils/schema/exerciseSchema"

export default async function getLearningTopicContent(category: string, topic: string) {
    const learningCategoryParse = await ExerciseCategorySchema.safeParseAsync(category)
    if (!learningCategoryParse.success) {
        throw new Error(`${category} is not exist in valid learning category, ${learningCategoryParse.error}`)
    }

    const snapshotQuery = firebaseAdminStore.collection("learning").where("category", "==", learningCategoryParse.data)
    const snapshot = await snapshotQuery.get()
    if (snapshot.empty) {
        throw new Error(`Can't find learning list for ${learningCategoryParse.data}, learning list is maybe empty`)
    }

    const learningCategoryId = snapshot.docs[0].id

    const topicsCollection = await firebaseAdminStore.collection(`learning/${learningCategoryId}/topics`).where("topic", "==", topic).get()
    if (topicsCollection.empty) {
        throw new Error(`${topic} topic on ${category} category is not found, it maybe empty or not available. Please make sure topic is valid`)
    }
    const { content } = topicsCollection.docs[0].data()

    return content
}