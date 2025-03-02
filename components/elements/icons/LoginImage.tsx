import Image from 'next/image'
import React from 'react'

export default function LoginImage() {
    return (
        <Image
            src={"/auth/login-image.webp"}
            alt='Login icon'
            height={1080}
            width={1080}
            className='w-full aspect-auto'
            priority
        />
    )
}
