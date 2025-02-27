import { create } from "zustand";

type Store = {
    isSidebarOpen: boolean
    showSidebar: () => void
    hideSidebar: () => void
}

export const useSidebarStore = create<Store>()((set) => ({
    isSidebarOpen: false,
    showSidebar() {
        set({ isSidebarOpen: true })
    },
    hideSidebar() {
        set({ isSidebarOpen: false })
    },
}))