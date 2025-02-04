"use client";
import { firebaseAuth, firestore } from "@/app/utils/firebase/firebase";
import useToken from "@/app/utils/hooks/useToken";
import { useUserStore } from "@/app/utils/store/useUserStore";
import { onIdTokenChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

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
                    const completedTestRef = collection(firestore, `users/${user.uid}/test_completed`)
                    const snapshot = await getDocs(completedTestRef)
                    const completedTest = snapshot.docs.map(e => e.data())
                    console.log({ completedTest })
                    if (completedTest) {
                        setUserData({ ...data.data(), completedTest })
                    } else {
                        setUserData(data.data());
                    }
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
