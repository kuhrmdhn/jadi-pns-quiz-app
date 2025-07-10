import { create } from "zustand";

type Store = {
    menuOpen: boolean
    toggleMenu: () => void
    openMenu: () => void
    closeMenu: () => void
}

export const useQuestionNavigationMenuStore = create<Store>()((set) => ({
    menuOpen: false,
    toggleMenu() {
        set((state) => ({ menuOpen: !state.menuOpen }))
    },
    openMenu() {
        set({ menuOpen: true })
    },
    closeMenu() {
        set({ menuOpen: false })
    },
}))