import { create } from "zustand";
import React from "react";

type Store = {
    isOverlayShow: boolean
    setOverlayShow: (status: boolean) => void
    content?: React.ReactNode
    setContent: (content: React.ReactNode) => void
    toggleOverlay: (duration?: number) => void
}

export const useOverlayStore = create<Store>()((set) => ({
    isOverlayShow: false,
    setOverlayShow: (status: boolean) => {
        set({ isOverlayShow: status })
    },
    content: null,
    setContent: (content) => set({ content }),
    toggleOverlay: (duration?: number) => {
        set({ isOverlayShow: true })
        setTimeout(() => {
            set({ isOverlayShow: false })
        }, duration || 1200)
    }
}))