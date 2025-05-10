import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "./config";

export const firestore = getFirestore(firebaseApp)
export const firebaseAuth = getAuth(firebaseApp);