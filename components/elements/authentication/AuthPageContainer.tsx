import React from 'react'

type Props = {
    children: React.ReactNode
    className?: string
}

export default function AuthPageContainer({ children, className }: Props) {
    return (
        <section className={`min-h-[100dvh] h-auto p-5 xl:p-0 w-full flex gap-10 xl:gap-0 sm:flex-col-reverse xl:flex-row justify-center xl:justify-end items-center bg-white-darken overflow-hidden ${className}`}>
            {children}
        </section>
    )
}
