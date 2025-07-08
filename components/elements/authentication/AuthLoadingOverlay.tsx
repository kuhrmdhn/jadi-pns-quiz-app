import React from 'react'

type Props = {
    message: string
}

export default function AuthLoadingOverlay({ message }: Props) {
    return (
        <div className='w-full h-[100dvh] text-xl text-primary backdrop-blur-xs flex justify-center items-center fixed top-0 z-[999999]'>
            <p className='inline-flex justify-end items-end gap-1'>
                {message}
                <span className='loading-dots loading'></span>
            </p>
        </div>
    )
}
