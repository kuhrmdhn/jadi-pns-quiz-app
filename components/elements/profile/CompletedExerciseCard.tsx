import useFetch from '@/utils/hooks/useFetch'
import Link from 'next/link'

type Props = {
    exerciseId: string
    score: number
    reviewId: string
}

export default function CompletedExerciseCard({ exerciseId, score, reviewId }: Props) {
    const { response } = useFetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/exercise/title/${exerciseId}`)
    const title = response?.data as string
    const reviewUrl = `exercise/review/${reviewId}`
    return (
        <div className="bg-background p-6 rounded-xl shadow-md w-full max-w-sm transition-transform hover:-translate-y-1 hover:shadow-lg">
            <div className="text-xl font-semibold dark:text-gray-100 text-gray-800 mb-2">
                {title}
            </div>
            <div className="font-medium text-base mb-4">
                Skor: <span className='text-green-600 '>{score}</span>
            </div>
            <Link
                href={reviewUrl}
                className="inline-block bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
                Lihat Review
            </Link>
        </div>

    );
};
