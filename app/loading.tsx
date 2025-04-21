import { Dot } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function Loading() {
    const loadingDots = [...Array(3)]
    return (
        <section className='h-[100dvh] w-full flex flex-col justify-center items-center fixed top-0 left-0 z-[9999]'>
            <Image
                src="/logo.png"
                width={1080}
                height={1080}
                alt="Jadi PNS Logo"
                className="size-64 aspect-square"
                priority
            />
            <div className="flex -mt-5">
                {
                    loadingDots.map((_, index: number) => (
                        <Dot
                            key={index}
                            size={48}
                            style={{ animationDelay: `${index * 150}ms` }}
                            className={`-mr-3 animate-dot-bounce`}
                        />
                    ))
                }
            </div>
        </section>
    )
}
