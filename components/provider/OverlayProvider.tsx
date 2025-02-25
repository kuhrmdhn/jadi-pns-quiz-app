"use client"
import { useOverlayStore } from '@/utils/store/useOverlayStore'
import React from 'react'
import { useShallow } from 'zustand/shallow'

export default function OverlayProvider() {
    const { isOverlayShow, content } = useOverlayStore(useShallow((state) => ({
        isOverlayShow: state.isOverlayShow,
        content: state.content
    })))
    return (
        <div
            className={`fixed top-0 z-[99999] h-[100dvh] w-full bg-gray-400/25 backdrop-blur-xs duration-500  ${isOverlayShow ? "block" : "hidden"}`}
        >
            {content}
        </div>
    )
}
