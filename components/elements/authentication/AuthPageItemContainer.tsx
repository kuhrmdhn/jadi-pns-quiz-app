import React from 'react'

type Props = {
    children: React.ReactNode
    className?: string
}

export default function AuthPageItemContainer({ children, className }: Props) {
    return (
        <div className={`h-full w-1/2 flex justify-center items-center ${className}`}>
            {children}
        </div>
    )
}
