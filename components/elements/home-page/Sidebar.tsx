"use client"
import React from 'react'
import { Button } from '../../ui/button'
import { useShallow } from 'zustand/shallow'
import { AlignJustify, X } from 'lucide-react'
import { navigation } from '@/constant/navigationListData'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion'
import Link from 'next/link'
import AuthButton from './AuthButton'
import { ThemeToggleButton } from '@/components/ui/theme-toggle-button'
import { useSidebarStore } from '@/utils/store/useSidebarStore'

function SidebarProvider() {
    const { isSidebarOpen, hideSidebar } = useSidebarStore((useShallow((state) => ({
        isSidebarOpen: state.isSidebarOpen,
        hideSidebar: state.hideSidebar
    }))))

    return (
        <div className={`fixed top-0 z-[9999] bg-white dark:bg-black ${isSidebarOpen ? "right-0" : "-right-full"} duration-300 w-full h-[100dvh] pt-16 px-6`}>
            <Button onClick={hideSidebar} className='absolute top-3 right-3' variant={"ghost"}>
                <X className="text-xl" />
            </Button>
            <Accordion type="single" collapsible className='w-full'>
                {
                    navigation.map((navigate) => (
                        <AccordionItem key={navigate.id} value={navigate.title} className="mb-5">
                            <AccordionTrigger>{navigate.title}</AccordionTrigger>
                            {
                                navigate.content.map((content) => (
                                    <Link key={content.id} href={content.url}>
                                        <AccordionContent>
                                            <h1 className='font-bold text-md'>{content.title}</h1>
                                            <h2 className="font-semibold text-sm text-gray-900 dark:text-gray-300">{content.subTitle}</h2>
                                            <p className="text-xs text-justify text-gray-700 dark:text-gray-100 font-medium line-clamp-1">{content.description}</p>
                                        </AccordionContent>
                                    </Link>
                                ))
                            }
                        </AccordionItem>
                    ))
                }
            </Accordion>
            <AuthButton />
            <ThemeToggleButton />
        </div>
    )
}

function SidebarTrigger() {
    const { showSidebar } = useSidebarStore((useShallow((state) => ({
        showSidebar: state.showSidebar
    }))))

    return (
        <Button className='block md:hidden' variant="ghost" size="icon" onClick={showSidebar}>
            <AlignJustify />
        </Button>
    )
}

export { SidebarProvider, SidebarTrigger }