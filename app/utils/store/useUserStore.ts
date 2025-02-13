import { AuthRole } from "@/app/types/tokenPayloadType";
import { create } from "zustand";

const initialUserData: UserData = {
    id: "",
    username: "",
    email: "",
    password: "",
    role: AuthRole.USER,
    completedTest: []
}

const getCurrentAnswers = () => {
    if (typeof window !== "undefined") {
        return JSON.parse(localStorage.getItem("currentUserAnswers") || "[]");
    }
    return [];
};

const removeUserCurrentAnswers = () => {
    if (typeof window !== "undefined") {
        return localStorage.removeItem("currentUserAnswers")
    }
    return [];
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
    completedTest?: Exercise[]
}

type Store = {
    userData: UserData
    setUserData: (user: UserData) => void
    currentAnswers: string[]
    setChangeCurrentAnswers: (index: number, answer: string) => void
    removeCurrentAnswers: () => void
    setInitialUserAnswers: (totalQuestion: number) => void
    setUserAnswers: (newAnswers: string[]) => void
    removeExerciseEndTime: () => void
    setExerciseEndTime: (time: number) => void
}

export const useUserStore = create<Store>()((set) => ({
    userData: initialUserData,
    setUserData: (user: UserData) => set({ userData: user }),
    currentAnswers: getCurrentAnswers(),
    setChangeCurrentAnswers: (index: number, answer: string) =>
        set((state) => {
            const newAnswer = [...state.currentAnswers]
            newAnswer[index] = answer
            state.setUserAnswers(newAnswer)
            return { currentAnswers: newAnswer }
        }),
    removeCurrentAnswers: () => {
        const newUserAnswers = removeUserCurrentAnswers()
        return { currentAnswers: newUserAnswers }
    },
    setInitialUserAnswers: (totalQuestion: number) => {
        const initialAnswers = [...Array(totalQuestion)].map(() => null)
        localStorage.setItem("currentUserAnswers", JSON.stringify(initialAnswers))

    },
    setUserAnswers: (newAnswers: string[]) => {
        set(() => {
            localStorage.setItem("currentUserAnswers", JSON.stringify(newAnswers))
            return { currentAnswers: newAnswers }
        })
    },
    removeExerciseEndTime: () => {
        localStorage.removeItem("savedExerciseEndTime")
    },
    setExerciseEndTime: (time: number) => {
        localStorage.setItem("savedExerciseEndTime", JSON.stringify(time))
    }
}))