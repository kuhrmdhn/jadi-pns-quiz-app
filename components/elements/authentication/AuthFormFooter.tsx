import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

type Props = {
    buttonText: string
    redirectUrl: string
    redirectText: string
    redirectTriggerText: string
}

export default function AuthFormFooter({ buttonText, redirectUrl, redirectText, redirectTriggerText }: Props) {
    return (
        <div className='flex flex-col gap-4 items-center'>
            <Button type='submit' className='w-full'>
                {buttonText}
            </Button>
            <p className="text-xs md:text-sm">
                {redirectText}
                <Link href={redirectUrl} className='text-primary ml-1 underline hover:no-underline underline-offset-2'>
                    {redirectTriggerText}
                </Link>
            </p>
        </div>)
}
