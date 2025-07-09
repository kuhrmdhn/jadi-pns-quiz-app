import { loginSchema } from "@/utils/schema/authSchema"

export const validateLoginData = (loginData: any) => {
    const validateLoginDataSchema = loginSchema.safeParse(loginData)
    if (!validateLoginDataSchema.success) {
        const allSchemaError = validateLoginDataSchema.error.issues.map((issue) => issue.message)
        const validateSchemaErrorMessage = allSchemaError.join(", ")
        return {
            success: false,
            errorMessage: validateSchemaErrorMessage
        }
    }

    return {
        success: true,
        data: validateLoginDataSchema.data
    }
}