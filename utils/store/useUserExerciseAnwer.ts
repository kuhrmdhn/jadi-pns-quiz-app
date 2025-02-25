import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  userAnswers: string[];
  setUserAnswers: (answer: string, index: number) => void;
  setInitialUserAnswers: (totalQuestion: number) => void;
  deleteUserAnswers: () => void;
};

export const useUserExerciseAnswer = create<Store>()(
  persist(
    (set) => ({
      userAnswers: [],
      setUserAnswers: (answer, index) =>
        set((state) => {
          const newAnswers = [...state.userAnswers];
          newAnswers[index] = answer;
          return { userAnswers: newAnswers };
        }),
      setInitialUserAnswers: (totalQuestion) => {
        set({ userAnswers: Array(totalQuestion).fill("null") });
      },
      deleteUserAnswers: () => set({ userAnswers: [] }),
    }),
    {
      name: "userAnswers",
    }
  )
);
