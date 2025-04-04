import { firebaseAdminAuth } from "@/utils/firebase/admin";

export async function validateAdminToken(token?: string) {
    if (!token) {
        throw new Error("Auth Token is not found. Make sure user is logged in")
    }

    try {
        const validateUserToken = await firebaseAdminAuth.verifyIdToken(token)
        if (!validateUserToken?.admin) {
            throw new Error("Access denied, token is undefined or user is not admin")
        }
    } catch (e) {
        throw new Error("Invalid or expired token. Please log in again.");
    }
}