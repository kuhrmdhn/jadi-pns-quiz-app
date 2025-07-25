import { z } from "zod";

export const userSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string().min(1),
    username: z.string().min(1).max(18),
    completedExercise: z.array(z.object({
        id: z.string(),
        exerciseId: z.string(),
        userAnswers: z.array(z.string()),
        score: z.number()
    }))
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
        message: "Kata sandi minimal 8 karakter"
    })
})

export const registerSchema = loginSchema.extend({
    confirmPassword: z.string(),
    name: z.string().min(1)
})

export type User = z.infer<typeof userSchema>
export type LoginData = z.infer<typeof loginSchema>
export type RegisterData = z.infer<typeof registerSchema>
