import { Button } from '@/components/ui/button'
import { ButtonIconAnimation } from '@/components/ui/button-icon-animation'
import Link from 'next/link'
import React from 'react'

type Props = {
    icon: React.ReactNode
    href: string
    text: string
}

export default function ButtonAnimationMobileNav({ href, icon, text }: Props) {
    return (
        <Link href={href}>
            <ButtonIconAnimation className='hidden xl:block' icon={icon} variant="ghost">
                {text}
            </ButtonIconAnimation>
            <Button variant={"ghost"} className="flex items-start justify-start xl:hidden w-full px-0">
                {text}
            </Button>
        </Link>)
}
