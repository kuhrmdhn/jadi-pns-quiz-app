export default function useCookie() {
    async function setTokenToServer(token: string) {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/set-cookie`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
            });

            if (!res.ok) {
                console.error("Failed to set cookie on server");
                console.log(res.statusText)
            }
        } catch (error) {
            console.error("Error sending token to server:", error);
        }
    }

    return { setTokenToServer }
}
