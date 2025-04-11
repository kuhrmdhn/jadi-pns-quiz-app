"use client"
import { useEffect, useState } from 'react'

export default function useFetch(url: RequestInfo | URL | string, option?: RequestInit, firstRenderFetch = true) {
    const [loading, setLoading] = useState<boolean>(true)
    const [response, setResponse] = useState<any>(null)
    const [error, setError] = useState<Error | null>(null)
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
            return responseData
        } catch (err) {
            const error = err as Error
            setError(error)
            return null
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (firstRenderFetch) {
            fetchData()
        }
    }, [firstRenderFetch])

    return { fetchData, response, error, loading }
}
