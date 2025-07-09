import { registerSchema } from "@/utils/schema/authSchema"

export const validateRegisterData = (registerData: any) => {
    const validateRegisterDataSchema = registerSchema.safeParse(registerData)
    if (!validateRegisterDataSchema.success) {
        const allSchemaError = validateRegisterDataSchema.error.issues.map((issue) => issue.message)
        const validateSchemaErrorMessage = allSchemaError.join(", ")
        return {
            success: false,
            errorMessage: validateSchemaErrorMessage
        }
    }

    const { password, confirmPassword } = validateRegisterDataSchema.data
    if (password !== confirmPassword) {
        return {
            success: false,
            errorMessage: "Konfirmasi kata sandi dengan benar"
        }
    }

    return {
        success: true,
        data: validateRegisterDataSchema.data
    }
}