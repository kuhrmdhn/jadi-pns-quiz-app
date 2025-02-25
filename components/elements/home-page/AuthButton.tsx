"use client"
import { ButtonVariant } from '@/components/ui/button'
import { ButtonIconAnimation } from '@/components/ui/button-icon-animation'
import { useUserStore } from '@/utils/store/useUserStore'
import { LogIn, User, UserPlus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useShallow } from 'zustand/shallow'

type AuthNavigation = {
    id: number
    variant: string
    title: string
    url: string
    icon: React.ReactNode
}

export default function AuthButton() {
    const { userData } = useUserStore(useShallow((state) => ({ userData: state.userData })))
    return (
        <div>
            {
                userData ?
                    <ButtonIconAnimation
                        icon={<User />}
                        variant={"ghost"}
                    >
                        Profil
                    </ButtonIconAnimation>
                    :
                    <ul className="flex gap-5">
                        {
                            authNavigation.map((auth) => (
                                <li key={auth.id}>
                                    <Link href={auth.url}>
                                        <ButtonIconAnimation
                                            icon={auth.icon}
                                            className={`${auth.variant === "outline" && "border-primary text-primary hover:text-primary hover:bg-transparent hover:shadow hover:shadow-primary"}`}
                                            variant={auth.variant as ButtonVariant}
                                        >
                                            {auth.title}
                                        </ButtonIconAnimation>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
            }
        </div>
    )
}


const authNavigation: AuthNavigation[] = [
    {
        id: 1,
        variant: "outline",
        title: "Masuk",
        url: "/login",
        icon: <LogIn />
    },
    {
        id: 2,
        variant: "default",
        title: "Daftar",
        url: "/register",
        icon: <UserPlus />
    }
]