"use client"
import { useEffect, useState } from 'react'

export default function useFetch(url: RequestInfo | URL | string, option?: RequestInit) {
    const [loading, setLoading] = useState<boolean>(true)
    const [response, setResponse] = useState<any>(null)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setError(null)
            try {
                const request = await fetch(url, option)
                if (!request.ok) {
                    throw new Error(`Fetch Error: ${request.status} ${request.statusText}`)
                }
                const responseData = await request.json()
                setResponse(responseData)
            } catch (error) {
                setError(error as Error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [url, option])

    return { response, error, loading }
}
