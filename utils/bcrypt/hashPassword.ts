import bcrypt from "bcryptjs"

export async function hashPassword(planPassword: string): Promise<string> {
    const salt = 15
    const hashedPassword = await bcrypt.hash(planPassword, salt)
    return hashedPassword
}