import { create } from "zustand";

type Store = {
    dialogOpen: boolean
    setDialogOpen: (state: boolean) => void
}

export const useExerciseTestDialogStore = create<Store>()((set) => ({
    dialogOpen: false,
    setDialogOpen: (state) => set({ dialogOpen: state })
}))