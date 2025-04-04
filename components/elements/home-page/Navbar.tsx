"use client"
import { SidebarTrigger } from '@/components/elements/home-page/Sidebar'
import Logo from './Logo'
import NavigationBarMenu from './NavigationBarMenu'

export default function Navbar() {
    return (
        <header className='px-7 sm:px-10 sticky z-50 flex items-center justify-between sm:justify-around w-full h-24 shadow-md rounded-b-lg'>
            <div className='w-1/5'>
                <Logo />
            </div>
            <NavigationBarMenu/>
            <SidebarTrigger/>
        </header>
    )
}