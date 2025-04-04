"use client";
import { firebaseAuth, firestore } from "@/utils/firebase/firebase";
import { useUserStore } from "@/utils/store/useUserStore";
import { setToken } from "@/utils/token/setToken";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

export default function AuthProvider() {
  const { setUserData } = useUserStore(
    useShallow((state: any) => ({
      setUserData: state.setUserData,
    }))
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      if (!user) {
        setUserData(null);
        return
      }

      try {
        const tokenResult = await user.getIdTokenResult(true);
        const { token } = tokenResult;
        await setToken(token);

        const userDocRef = doc(firestore, "users", user.uid);
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
          const completedTestRef = collection(
            firestore,
            `users/${user.uid}/test_completed`
          );
          const snapshot = await getDocs(completedTestRef);
          const completedTest = snapshot.docs.map((doc) => doc.data());
          const { password, ...userData } = userSnapshot.data()
          setUserData({
            ...userData,
            completedTest,
          });
        } else {
          console.warn("User document not found.");
        }
      } catch (error) {
        console.error("Error during authentication:", error);
      }
    });

    return () => unsubscribe();
  }, [setUserData]);

  return null;
}
