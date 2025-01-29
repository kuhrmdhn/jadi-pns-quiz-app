"use client"
import { signOut } from 'firebase/auth'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { firebaseAuth } from '../firebase/firebase'

export default function useLogout() {
    const router = useRouter()
    const removeCookie = () => Cookies.remove("firebase_token")

    const logOut = async () => {
        try {
            removeCookie()
            await signOut(firebaseAuth)
            router.push("/")
        } catch (error) {
            console.error(error);
        }
    }

    return { logOut }
}