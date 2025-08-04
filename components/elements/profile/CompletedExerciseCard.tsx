import { Card } from '@/components/ui/card'
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
        <Card className='h-32 w-full p-2 flex flex-col justify-between'>
            <div>
                <h3 className="text-lg font-semibold mb-2">
                    {title}
                </h3>
                <p className="flex gap-4 items-center">Skor:
                    <span
                        className={`inline-block mt-1 px-3 py-1 text-sm font-semibold rounded-full ${score >= 25
                            ? "bg-green-600 text-white"
                            : score >= 15
                                ? "bg-yellow-600 text-white"
                                : "bg-red-600 text-white"
                            }`}
                    >
                        {score}
                    </span>
                </p>
            </div>
            <Link
                className="mt-4 text-primary underline underline-offset-2"
                href={reviewUrl}
            >
                Lihat Review
            </Link>
        </Card>
    );
};
