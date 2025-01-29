import React from 'react'

type Props = {
    className?: string
}

export default function AppLogo({ className }: Props) {
    return (
        <h1 className={`font-extrabold text-4xl text-[#EB9400] ${className}`}>
            Jadi
            <span className='text-primary'>PNS</span>
        </h1>
    )
}
