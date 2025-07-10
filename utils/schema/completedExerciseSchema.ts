import { z } from "zod";

export const completedExerciseSchema = z.object({
    userAnswers: z.string().array(),
    score: z.number(),
    exerciseId: z.string()
})

export type CompletedExercise = z.infer<typeof completedExerciseSchema>