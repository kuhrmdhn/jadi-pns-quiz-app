import React from 'react'

type Props = {
    children: React.ReactNode
}

export default function AuthPageContainer({ children }: Props) {
    return (
        <section className="min-h-[100dvh] h-auto py-10 md:p-0 w-full flex gap-10 xl:gap-0 sm:flex-col-reverse lg:flex-row justify-center sm:justify-end items-center bg-white-darken overflow-hidden">
            {children}
        </section>
    )
}
