import { Button } from '@/components/ui/button'
import { useUserExerciseAnswer } from '@/utils/store/useUserExerciseAnswer'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
    id: string
}

export default function QuestionNavigateItem({ id }: Props) {
    const { userAnswers } = useUserExerciseAnswer()
    const pathname = usePathname()
    return (
        <Button className='h-7 w-12' variant={userAnswers[parseInt(id) - 1] == "null" ? "outline" : "default"}>
            <Link href={`${pathname}?question_id=${id}`}>
                {id}
            </Link>
        </Button>
    )
}
