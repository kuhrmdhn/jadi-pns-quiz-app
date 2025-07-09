"use client"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useShallow } from "zustand/shallow"
import { firebaseAuth, firestore } from "../firebase/firebase"
import { RegisterData, User } from "../schema/authSchema"
import { useAlertStore } from "../store/useAlertStore"
import { validateRegisterData } from "./utils/validateRegisterData"

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

    const signUp = async (e: React.FormEvent<HTMLFormElement>, userRegisterData: RegisterData) => {
        try {
            e.preventDefault()
            setLoading(true)

            const { data: validRegisterData, errorMessage, success: isValid } = validateRegisterData(userRegisterData)
            if (!isValid) {
                handleRegisterError(errorMessage || "Data tidak valid!")
            }

            if (validRegisterData) {

                const { email, password, name } = validRegisterData
                const registerData = await createUserWithEmailAndPassword(firebaseAuth, email, password)
                const { uid: userId } = registerData.user
                const userDoc = doc(firestore, "/users", userId)

                const userData: User = {
                    id: userId,
                    email,
                    name,
                    username: name.slice(0, 18)
                }
                await setDoc(userDoc, userData)

                await signInWithEmailAndPassword(firebaseAuth, email, password)

                const successRegisterMessage = "Kamu Berhasil Mendaftarkan Akun Kamu!"
                handleRegisterSuccess(successRegisterMessage)
                router.push("/")
            }
        } catch (err) {
            console.error(err);
            const error = err as Error
            handleRegisterError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, signUp }
}
