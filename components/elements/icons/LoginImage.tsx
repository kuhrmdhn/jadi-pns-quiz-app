import Image from 'next/image'
import React from 'react'

export default function LoginImage() {
    return (
        <Image
            src={"/assets/login-image.svg"}
            alt='Login icon'
            height={1080}
            width={1080}
            className='size-full aspect-square'
            priority
        />
    )
}
