import { create } from "zustand"

type Store = {
    modalTitle: string
    modalDescription: string
    modalChild?: React.ReactNode
    showModal: () => void
    setModalChild: (child: React.ReactNode) => void
    setModalTitle: (title: string) => void
    setModalDescription: (desc: string) => void
}

export const useModalShow = create<Store>()((set) => ({
    showModal: () => {
        const modal = document.getElementById("modal-1") as HTMLDialogElement
        if (modal) {
            modal.showModal()
        }
    },
    setModalChild: (child) => set({ modalChild: child }),
    setModalDescription: (desc) => set({ modalDescription: desc }),
    setModalTitle: (title) => set({ modalTitle: title }),
    modalDescription: "",
    modalTitle: "",
    modalChild: null
}))