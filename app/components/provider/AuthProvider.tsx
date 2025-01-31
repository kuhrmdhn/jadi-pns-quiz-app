"use client";
import { firebaseAuth, firestore } from "@/app/utils/firebase/firebase";
import { useUserStore } from "@/app/utils/store/useUserStore";
import { onIdTokenChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

export default function AuthProvider() {
    const router = useRouter();
    const { setUserData } = useUserStore(useShallow((state: any) => ({
        setUserData: state.setUserData
    })));

    async function setTokenToServer(token: string) {
        try {
            const res = await fetch(`api/auth`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
            });

            console.log(res)

            if (!res.ok) {
                console.error("Failed to set cookie on server");
                console.log(res.statusText)
            }
        } catch (error) {
            console.error("Error sending token to server:", error);
        }
    }

    useEffect(() => {
        const unsubscribe = onIdTokenChanged(firebaseAuth, async (user) => {
            if (user) {
                const userDocRef = doc(firestore, "users", user.uid);
                const data = await getDoc(userDocRef);

                if (data.exists()) {
                    setUserData(data.data());
                    console.log("User data:", data.data());
                } else {
                    console.warn("User document not found");
                }

                const newToken = await user.getIdToken();
                await setTokenToServer(newToken);
                router.push("/");
            } else {
                console.log("user kosong")
                router.replace("/login");
            }
        });

        return () => unsubscribe();
    }, [router]);

    return null;
}
