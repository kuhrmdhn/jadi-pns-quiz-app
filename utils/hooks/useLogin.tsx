import { UserAuthentication } from "@/types/authPayloadType";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useShallow } from "zustand/shallow";
import { firebaseAuth } from "../firebase/firebase";
import { useAlertStore } from "../store/useAlertStore";
import { authSchema } from "../schema/authSchema";
import { FormInputData } from "@/types/formInputType";
import Cookies from "js-cookie"
import { useRouter } from "next/navigation";

export default function useLogin() {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")
  const { successAlert, errorAlert, setMessage } = useAlertStore(useShallow((state) => ({
    successAlert: state.successAlert,
    errorAlert: state.errorAlert,
    setMessage: state.setMessage
  })))

  const signIn = async (e: React.FormEvent<HTMLFormElement>, loginInput: UserAuthentication) => {
    e.preventDefault()
    try {
      setLoading(true);
      const { email, password } = loginInput
      const validateUserAuthentication = authSchema.safeParse(loginInput)
      if (!validateUserAuthentication.success) {
        const allError = validateUserAuthentication.error.issues.map((issue) => issue.message)
        const errorMessage = allError.join(", ")
        setError(errorMessage)
        setMessage(errorMessage)
        errorAlert()
        return
      }

      const { user } = await signInWithEmailAndPassword(firebaseAuth, email, password)
      const idToken = await user.getIdToken()
      Cookies.set("firebase_token", idToken, { expires: 1, secure: true, sameSite: "strict", httpOnly: true });

      setMessage("Kamu berhasih masuk, Selamat Belajar 🚀")
      successAlert();
      router.push("/")
    } catch (error) {
      console.error(error);
      setMessage("Email atau kata sandi salah. Pastikan menggunakan email dan kata sandi yang sudah terdaftar.")
      errorAlert();
    } finally {
      setLoading(false);
    }
  };

  return { signIn, loading, error };
}
