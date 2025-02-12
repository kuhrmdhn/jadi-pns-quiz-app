import { AuthRole } from "@/app/types/tokenPayloadType";
import { create } from "zustand";

const initialUserData: UserData = {
    id: "",
    username: "",
    email: "",
    password: "",
    role: AuthRole.USER,
    created_at: new Date(),
    completedTest: []
}

enum ExerciseCategory {
    TWK = "TWK",
    TIU = "TIU",
    TKP = "TKP"
}

export type Exercise = {
    id: string
    name: string
    score: number
    max_score: number
    category: ExerciseCategory
    answers: string[]
}

type UserData = {
    id: string
    username: string
    email: string
    password: string
    role: AuthRole
    created_at: Date
    completedTest?: Exercise[]
}

type Store = {
    userData: UserData
    setUserData: (user: UserData) => void
    currentAnswers: string[]
    setCurrentAnswers: (index: number, answer: string) => void
}

export const useUserStore = create<Store>()((set) => ({
    userData: initialUserData,
    setUserData: (user: UserData) => set({ userData: user }),
    currentAnswers: JSON.parse(localStorage.getItem("currentUserAnswers") || "[]"),
    setCurrentAnswers: (index: number, answer: string) =>
        set((state) => {
            const newAnswer = [...state.currentAnswers]
            newAnswer[index] = answer
            localStorage.setItem("currentUserAnswers", JSON.stringify(newAnswer));
            return { currentAnswers: newAnswer }
        })

}))