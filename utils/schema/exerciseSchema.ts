import { z } from "zod";

export enum ExerciseCategoryEnum {
  TWK = "TWK",
  TIU = "TIU",
  TKP = "TKP"
}

export const ExerciseCategorySchema = z.nativeEnum(ExerciseCategoryEnum);
export const ExerciseDifficultySchema = z.enum(["Pemula", "Menengah", "Mahir", "Legenda"]);

export const exerciseQuestionSchema = z.object({
  id: z.string().optional(),
  question: z.string(),
  options: z.array(z.string())
});

export const exerciseSchema = z.object({
  id: z.string().optional(),
  category: ExerciseCategorySchema,
  name: z.string(),
  duration: z.number(),
  total_question: z.number(),
  questions: z.array(exerciseQuestionSchema),
  answers: z.array(z.string()),
  topic: z.string().nullable(),
  difficulty: ExerciseDifficultySchema
});

export type Exercise = Omit<z.infer<typeof exerciseSchema>, "id"> & { id: string };
export type ExerciseDifficulty = z.infer<typeof ExerciseDifficultySchema>;
export type ExerciseCategory = z.infer<typeof ExerciseCategorySchema>;
