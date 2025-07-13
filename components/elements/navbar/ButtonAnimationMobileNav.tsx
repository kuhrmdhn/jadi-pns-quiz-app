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
        <>
            <Link href={href} className='hidden xl:block'>
                <ButtonIconAnimation icon={icon} variant="ghost">
                    {text}
                </ButtonIconAnimation>
            </Link>
            <Link href={href} className="xl:hidden w-full">
                <Button variant={"ghost"} className='w-full flex items-start justify-start px-0'>
                    {text}
                </Button>
            </Link>
        </>
    )
}
