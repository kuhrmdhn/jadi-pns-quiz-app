export default function useToken() {
    async function setToken(token: string) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/set-token`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token })
            })
            if (!response.ok) {
                console.error("Failed to set cookie on server");
                return
            }
        } catch (error) {
            console.error("Error sending token to server:", error);
        }
    }

    return { setToken }
}
