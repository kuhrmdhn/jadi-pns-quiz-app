export async function setToken(token: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/set-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
    })
    if (!response.ok) {
        throw new Error("Failed to set cookie on server");
    }
}