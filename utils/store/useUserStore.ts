import { create } from "zustand";
import { User } from "../schema/authSchema";

type Store = {
    userData: User | null
    setUserData: (user: User) => void
}

export const useUserStore = create<Store>()((set) => ({
    userData: null,
    setUserData: (user: User) => set({ userData: user }),
}))