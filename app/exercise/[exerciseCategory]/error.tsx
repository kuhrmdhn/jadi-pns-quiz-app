'use client'

type Props = {
    error: Error & { digest?: string }
    reset: () => void
}

export default function Error({ error, reset }: Props) {
    return (
        <div>
            <h2>Something went wrong!</h2>
            <p>{error.message}</p>
            <button
                onClick={() => reset()}
            >
                Try again
            </button>
        </div>
    )
}