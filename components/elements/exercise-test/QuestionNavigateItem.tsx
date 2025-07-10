import { Button, ButtonProps, ButtonVariant } from '@/components/ui/button'
import { useQuestionNavigationMenuStore } from '@/utils/store/useQuestionNavigationMenuStore'
import { useUserExerciseAnswer } from '@/utils/store/useUserExerciseAnswer'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { RefAttributes, useEffect, useState } from 'react'

type Props = {
    id: string
}

export default function QuestionNavigateItem({ id }: Props) {
    const { closeMenu } = useQuestionNavigationMenuStore()
    const [buttonVariant, setButtonVariant] = useState<ButtonVariant>("default")
    const { userAnswers } = useUserExerciseAnswer()
    const pathname = usePathname()
    const searchParam = useSearchParams()
    const currentQuestionIdParameter = searchParam.get("question_id")

    useEffect(() => {
        if (userAnswers[parseInt(id) - 1] == "null") {
            setButtonVariant("outline")
        }
        if (currentQuestionIdParameter == id) {
            setButtonVariant("secondary")
        }
    }, [])
    return (
        <Button onClick={closeMenu} className='h-7 w-12 p-0' variant={buttonVariant}>
            <Link href={`${pathname}?question_id=${id}`} className='size-full flex justify-center items-center'>
                {id}
            </Link>
        </Button>
    )
}
