import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
    id: string
}

export default function QuestionNavigateItem({ id }: Props) {
    const pathname = usePathname()
    return (
        <Link href={`${pathname}?question_id=${id}`} className='btn-primary btn h-7 w-12'>
            {id}
        </Link>
    )
}
