import { completedExerciseSchema } from "@/utils/schema/completedExerciseSchema";

export async function validateExerciseCompletedData(completedExerciseData: any) {
    const validateCompletedExerciseSchema = completedExerciseSchema.safeParse(completedExerciseData)
    if (!validateCompletedExerciseSchema.success) {
        const { issues } = validateCompletedExerciseSchema.error
        const errorMessage = issues
            .map(issue => `Error on ${issue.path.join(".")} path: ${issue.message}`)
            .join("\n");

        throw new Error(errorMessage)
    }

    return validateCompletedExerciseSchema.data
}