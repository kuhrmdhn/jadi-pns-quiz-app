"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
    error: Error & { digest?: string }
    reset: () => void
}

export default function Error({ error, reset }: Props) {
    const router = useRouter()
    console.error(error);
    return (
        <section className="h-[80dvh] flex flex-col justify-center items-center gap-4">
            <Image
                src="/error.png"
                alt='Error image'
                width={1080}
                height={1080}
                className="size-64 aspect-square"
            />
            <div className='flex flex-col items-center gap-3'>
                <h1 className="text-xl font-semibold">Ada Kesalahan!</h1>
                <span className="flex gap-3">
                    <Button onClick={() => reset()}>Muat Ulang</Button>
                    <Button variant={"outline"} onClick={() => router.push("/")}>Halaman Utama</Button>
                </span>
            </div>
        </section>
    )
}
