import { ButtonIconAnimation } from '@/components/ui/button-icon-animation'
import { Home } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function HomePageNav() {
    return (
        <Link href="/">
            <ButtonIconAnimation icon={<Home />} variant="ghost">
                Beranda
            </ButtonIconAnimation>
        </Link>
    )
}
