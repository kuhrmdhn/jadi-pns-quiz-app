import { firebaseAdminAuth } from "@/utils/firebase/admin";

export async function validateUserToken(token?: string) {
    if (!token) {
        throw new Error("Auth Token is not found. Make sure user is logged in")
    }

    try {
        const validateToken = await firebaseAdminAuth.verifyIdToken(token)
        if (!validateToken) {
            throw new Error("Access denied, token invalid")
        }

        return validateToken.uid
    } catch (e) {
        throw new Error("Invalid or expired token. Please log in again.");
    }
}