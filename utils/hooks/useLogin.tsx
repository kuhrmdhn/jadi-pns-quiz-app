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
  const [loginInput, setLoginInput] = useState<UserAuthentication>({ email: "", password: "" })
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")
  const { successAlert, errorAlert, setMessage } = useAlertStore(useShallow((state) => ({
    successAlert: state.successAlert,
    errorAlert: state.errorAlert,
    setMessage: state.setMessage
  })))

  const loginInputData: FormInputData[] = [
    {
      id: 1,
      name: "email",
      label: "Nama Pengguna",
      placeholder: "Nama email kamu",
      value: loginInput.email,
    },
    {
      id: 2,
      name: "password",
      label: "Kata Sandi",
      placeholder: "Kata sandi Kamu",
      value: loginInput.password,
      type: "password"
    }
  ]

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
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
      console.log({ user })
      const idToken = await user.getIdToken()
      Cookies.set("firebase_token", idToken, { expires: 1, secure: true, sameSite: "strict" });

      setMessage("Kamu berhasih masuk, Selamat Belajar 🚀")
      successAlert();
      router.push("/")
    } catch (error) {
      const typedError = error as Error;
      setMessage(typedError.message)
      errorAlert();
    } finally {
      setLoading(false);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginInput((previous) => ({
      ...previous,
      [name]: value
    }))
  }

  return { loginInputData, handleOnChange, signIn, loading, error };
}
