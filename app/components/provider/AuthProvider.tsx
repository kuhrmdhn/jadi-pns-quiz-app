"use client";
import { firebaseAuth } from "@/app/utils/firebase/firebase";
import { onIdTokenChanged } from "firebase/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthProvider() {
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onIdTokenChanged(firebaseAuth, async (user) => {
            if (user) {
                const newToken = await user.getIdToken()
                Cookies.set("firebase_token", newToken)
            } else {
                router.push("/login");
            }
        });
        return () => unsubscribe();
    }, [router]);

    return <></>;
}
