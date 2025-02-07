"use client";
import { firebaseAuth, firestore } from "@/app/utils/firebase/firebase";
import useToken from "@/app/utils/hooks/useToken";
import { useUserStore } from "@/app/utils/store/useUserStore";
import { onIdTokenChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

export default function AuthProvider() {
    const { setToken } = useToken();
    const { setUserData } = useUserStore(useShallow((state: any) => ({
        setUserData: state.setUserData
    })));

    useEffect(() => {
        const unsubscribe = onIdTokenChanged(firebaseAuth, async (user) => {
            if (!user) return;

            try {
                const newToken = await user.getIdToken();
                await setToken(newToken);

                const userDocRef = doc(firestore, "users", user.uid);
                const userSnapshot = await getDoc(userDocRef);

                if (userSnapshot.exists()) {
                    const completedTestRef = collection(firestore, `users/${user.uid}/test_completed`);
                    const snapshot = await getDocs(completedTestRef);
                    const completedTest = snapshot.docs.map((doc) => doc.data());

                    setUserData({ ...userSnapshot.data(), completedTest });
                }
            } catch (error) {
                console.error("Error during authentication:", error);
            }
        });

        return () => unsubscribe();
    }, []);

    return null;
}
