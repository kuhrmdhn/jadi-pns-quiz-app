import Image from 'next/image'
import React from 'react'

type Props = {
    source: string
}

export default function BannerImage({source}: Props) {
    return (
        <Image
            className="w-full h-full absolute top-0 object-cover"
            width={1366}
            height={386}
            src={source}
            alt="Jadi PNS Banner"
            priority
        />)
}
