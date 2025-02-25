import bcrypt from "bcryptjs"

export async function verifyPassword(planPassword: string, hashedPassword: string): Promise<boolean> {
    const comparePassword = await bcrypt.compare(planPassword, hashedPassword)
    return comparePassword
}