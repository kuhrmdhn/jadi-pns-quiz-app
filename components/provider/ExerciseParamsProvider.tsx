"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { ReactNode, useEffect } from 'react'

type Props = {
    children: ReactNode
}

export default function ExerciseParamsProvider({children}: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!searchParams.has("question_id")) {
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set("question_id", "1");

            router.replace(`${pathname}?${newSearchParams.toString()}`);
        }
    }, [searchParams, pathname, router]);

    return (
        <section>
            {children}
        </section>
    )
}
