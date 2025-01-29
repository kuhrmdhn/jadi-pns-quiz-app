import React from 'react'
import AppLogo from '../icons/AppLogo'

type Props = {
    subText: string
}

export default function AuthHeader({ subText }: Props) {
    return (
        <header className="w-full h-1/5 flex flex-col justify-center items-center">
            <AppLogo />
            <p className='font-light text-xs sm:text-sm'>{subText}</p>
        </header>
    )
}
