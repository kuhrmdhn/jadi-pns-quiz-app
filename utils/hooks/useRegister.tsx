"use client"
import { UserAuthentication } from "@/types/authPayloadType"
import { FormInputData } from "@/types/formInputType"
import { AuthRole } from "@/types/tokenPayloadType"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useState } from "react"
import { z } from "zod"
import { useShallow } from "zustand/shallow"
import { firebaseAuth, firestore } from "../firebase/firebase"
import { authSchema } from "../schema/authSchema"
import { useAlertStore } from "../store/useAlertStore"
import { hashPassword } from "../bcrypt/hashPassword"


interface RegistrationInput extends UserAuthentication {
    confirmPassword: string
}


export default function useRegister() {
    const { successAlert, errorAlert, setMessage } = useAlertStore(useShallow((state) => ({
        successAlert: state.successAlert,
        errorAlert: state.errorAlert,
        setMessage: state.setMessage
    })))
    const [userRegisterData, setUserRegisterData] = useState<RegistrationInput>({ email: "", password: "", confirmPassword: "" })
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const registerInputData: FormInputData[] = [
        {
            id: 1,
            name: "email",
            value: userRegisterData.email,
            label: "Email",
            type: "email",
            placeholder: "Email kamu",
            alt: "Masukkan alamat email yang valid"
        },
        {
            id: 2,
            name: "password",
            value: userRegisterData.password,
            label: "Kata sandi",
            placeholder: "Buat kata sandi",
            alt: "Kata sandi minimal 8 karakter",
            type: "password"
        },
        {
            id: 3,
            name: "confirmPassword",
            value: userRegisterData.confirmPassword,
            label: "Ulangi Kata sandi",
            placeholder: "Konfirmasi kata sandi",
            alt: "Masukkan kata sandi sebelumnya",
            type: "password"
        }
    ]

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setUserRegisterData((prev) => ({ ...prev, [name]: value }))
    }

    const handleRegisterError = (message: string) => {
        setError(message)
        setMessage(message)
        errorAlert()
    }

    const handleRegisterSuccess = (message: string) => {
        setMessage(message)
        successAlert()
    }

    const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const validatePassword = userRegisterData.password === userRegisterData.confirmPassword
        if (!validatePassword) {
            const validatePasswordErrorMessage = "Konfirmasi kata sandi dengan benar"
            handleRegisterError(validatePasswordErrorMessage)
            return
        }
        const validationRegisterData = authSchema.safeParse(userRegisterData)
        if (!validationRegisterData.success) {
            const allSchemaError = validationRegisterData.error.issues.map((issue) => issue.message)
            const validateSchemaErrorMessage = allSchemaError.join(", ")
            handleRegisterError(validateSchemaErrorMessage)
            return
        }
        try {
            setLoading(true)
            const { email, password } = userRegisterData
            const registerData = await createUserWithEmailAndPassword(firebaseAuth, email, password)
            const { uid: userId } = registerData.user
            const userDoc = doc(firestore, "/users", userId)
            const hashedUserPassword = await hashPassword(password)
            await setDoc(userDoc, {
                id: userId,
                email,
                username: "username acak",
                password: hashedUserPassword,
                role: AuthRole.USER
            })
            const successRegisterMessage = "Kamu Berhasil Mendaftarkan Akun Kamu!"
            handleRegisterSuccess(successRegisterMessage)
            await signInWithEmailAndPassword(firebaseAuth, email, password)
        } catch (err) {
            console.error(err);
            if (err instanceof z.ZodError) {
                handleRegisterError(err.message)
            } else {
                const registerUnexpectError = err as Error
                handleRegisterError(registerUnexpectError.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, signUp, registerInputData, handleOnChange }
}
