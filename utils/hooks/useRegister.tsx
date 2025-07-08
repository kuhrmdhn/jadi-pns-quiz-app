"use client"
import { RegistrationInput } from "@/components/elements/authentication/registerPage/RegisterInputForm"
import { AuthRole } from "@/types/tokenPayloadType"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { z } from "zod"
import { useShallow } from "zustand/shallow"
import { firebaseAuth, firestore } from "../firebase/firebase"
import { authSchema } from "../schema/authSchema"
import { useAlertStore } from "../store/useAlertStore"

export default function useRegister() {
    const { successAlert, errorAlert, setMessage } = useAlertStore(useShallow((state) => ({
        successAlert: state.successAlert,
        errorAlert: state.errorAlert,
        setMessage: state.setMessage
    })))
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleRegisterError = (message: string) => {
        setError(message)
        setMessage(message)
        errorAlert()
    }

    const handleRegisterSuccess = (message: string) => {
        setMessage(message)
        successAlert()
    }

    const signUp = async (e: React.FormEvent<HTMLFormElement>, userRegisterData: RegistrationInput) => {
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
            await setDoc(userDoc, {
                id: userId,
                email,
                username: "username acak",
                role: AuthRole.USER
            })
            const successRegisterMessage = "Kamu Berhasil Mendaftarkan Akun Kamu!"
            handleRegisterSuccess(successRegisterMessage)
            await signInWithEmailAndPassword(firebaseAuth, email, password)
            router.push("/")
        } catch (err) {
            console.error(err);
            if (err instanceof z.ZodError) {
                handleRegisterError(err.message)
            } else {
                handleRegisterError("Email sudah sudah terdaftar, silahkan masuk menggunakan email tersebut.")
            }
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, signUp }
}
