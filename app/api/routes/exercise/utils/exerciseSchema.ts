import { z } from "zod";

export const ExerciseCategory = z.enum(["TWK", "TIU", "TKP"]);

export const exerciseQuestionSchema = z.object({
    id: z.string().optional(),
    question: z.string(),
    options: z.array(z.string())
});

export const exerciseSchema = z.object({
    id: z.string().optional(),
    category: ExerciseCategory,
    name: z.string(),
    duration: z.number(),
    total_question: z.number(),
    questions: z.array(exerciseQuestionSchema),
    answers: z.array(z.string())
});
