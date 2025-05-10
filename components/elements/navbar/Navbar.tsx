"use client"
import { SidebarTrigger } from '@/components/elements/navbar/Sidebar'
import Logo from './Logo'
import NavigationBarMenu from './NavigationBarMenu'
import { usePathname } from 'next/navigation'

export default function Navbar() {
    const pathname = usePathname()
    const hideNavbar = (pathname.startsWith('/exercise/') && pathname.endsWith('/start')) || pathname.startsWith("/login") || pathname.startsWith("/register")
    return (
        <>
            {
                !hideNavbar && (
                    <header className='px-7 sm:px-10 sticky z-50 flex items-center justify-between sm:justify-around w-full h-24 shadow-md rounded-b-lg'>
                        <div className='w-1/5'>
                            <Logo />
                        </div>
                        <NavigationBarMenu />
                        <SidebarTrigger />
                    </header>
                )
            }
        </>
    )
}