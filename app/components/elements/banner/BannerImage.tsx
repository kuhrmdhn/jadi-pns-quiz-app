import Image from 'next/image'
import React from 'react'

export default function BannerImage() {
    return (
        <Image
            className="w-full h-full absolute top-0 object-cover"
            width={1366}
            height={386}
            src={"/assets/banner.png"}
            alt="Jadi PNS Banner"
            priority
        />)
}
