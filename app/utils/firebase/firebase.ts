import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "./config";
import { getAuth } from "firebase/auth";

export const firestore = getFirestore(firebaseApp)
export const firebaseAuth = getAuth(firebaseApp);