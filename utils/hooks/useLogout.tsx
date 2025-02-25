"use client"
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { firebaseAuth } from '../firebase/firebase'

export default function useLogout() {
    const router = useRouter()

    const logOut = async () => {
        try {
            await signOut(firebaseAuth)
            await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/logout`)
            router.push("/")
        } catch (error) {
            console.error(error);
        }
    }

    return { logOut }
}