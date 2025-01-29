import Image from 'next/image'
import React from 'react'

export default function RegisterImage() {
    return (
        <Image
            src={"/assets/register-image.svg"}
            alt='Login icon'
            height={1080}
            width={1080}
            className='size-full aspect-square'
            priority
        />
    )
}
