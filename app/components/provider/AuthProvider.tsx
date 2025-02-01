"use client";
import { firebaseAuth, firestore } from "@/app/utils/firebase/firebase";
import { useUserStore } from "@/app/utils/store/useUserStore";
import { onIdTokenChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import useToken from "@/app/utils/hooks/useToken";

export default function AuthProvider() {
    const { setToken } = useToken()
    const router = useRouter();
    const { setUserData } = useUserStore(useShallow((state: any) => ({
        setUserData: state.setUserData
    })));

    useEffect(() => {
        const unsubscribe = onIdTokenChanged(firebaseAuth, async (user) => {
            if (user) {
                const userDocRef = doc(firestore, "users", user.uid);
                const data = await getDoc(userDocRef);

                if (data.exists()) {
                    setUserData(data.data());
                } else {
                    console.error("User document not found");
                }

                const newToken = await user.getIdToken();
                await setToken(newToken);
                router.push("/");
            } else {
                router.replace("/login");
            }
        });

        return () => unsubscribe();
    }, [router]);

    return null;
}
