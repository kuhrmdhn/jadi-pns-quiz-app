import { z } from "zod";

export const authSchema = z.object({
    email: z.string().email({
        message: "Masukkan alamat email yang valid"
    }),
    password: z.string().min(8, {
        message: "Kata sandi minimal 8 karakter"
    })
})