import { exerciseSchema } from "../../../../../utils/schema/exerciseSchema";

export async function validateExerciseData(exerciseData: any) {
    const validateExerciseSchema = exerciseSchema.safeParse(exerciseData)
    if (!validateExerciseSchema.success) {
        const { issues } = validateExerciseSchema.error
        const errorMessage = issues
            .map(issue => `Error on ${issue.path.join(".")} path: ${issue.message}`)
            .join("\n");

        throw new Error(errorMessage)
    }

    return validateExerciseSchema.data
}