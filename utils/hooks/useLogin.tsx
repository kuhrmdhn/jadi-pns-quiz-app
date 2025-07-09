import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useShallow } from "zustand/shallow";
import { firebaseAuth } from "../firebase/firebase";
import { useAlertStore } from "../store/useAlertStore";
import { useRouter } from "next/navigation";
import { LoginData, loginSchema } from "../schema/authSchema";
import { validateLoginData } from "./utils/validateLoginData";

export default function useLogin() {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const { successAlert, errorAlert, setMessage } = useAlertStore(useShallow((state) => ({
    successAlert: state.successAlert,
    errorAlert: state.errorAlert,
    setMessage: state.setMessage
  })))

  const handleLoginError = (message: string) => {
    setMessage(message)
    errorAlert()
  }

  const handleLoginSuccess = (message: string) => {
    setMessage(message)
    successAlert()
  }

  const signIn = async (e: React.FormEvent<HTMLFormElement>, loginInput: LoginData) => {
    e.preventDefault()
    try {
      setLoading(true);
      const { success: isValidLoginData, data, errorMessage } = validateLoginData(loginInput)

      if (!isValidLoginData) {
        handleLoginError(errorMessage || "Data tidak valid!")
      }

      if (data) {
        const { email, password } = data
        const { user } = await signInWithEmailAndPassword(firebaseAuth, email, password)
        const idToken = await user.getIdToken()
        await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/set-token`, { method: "POST", body: JSON.stringify({ token: idToken }) })

        setMessage("Kamu berhasih masuk, Selamat Belajar 🚀")
        successAlert();
        router.push("/")
      }
    } catch (error) {
      console.error(error);
      setMessage("Email atau kata sandi salah. Pastikan menggunakan email dan kata sandi yang sudah terdaftar.")
      errorAlert();
    } finally {
      setLoading(false);
    }
  };

  return { signIn, loading };
}
