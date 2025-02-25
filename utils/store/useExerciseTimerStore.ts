import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  exerciseCompletionTime: number;
  setExerciseCompletionTime: (time: number) => void;
  deleteExerciseCompletionTime: () => void;
};

export const useExerciseTimerStore = create<Store>()(
  persist(
    (set) => ({
      exerciseCompletionTime: 0,
      setExerciseCompletionTime: (time) => {
        const targetTime = Date.now() + time * 1000;
        set({ exerciseCompletionTime: targetTime });
      },
      deleteExerciseCompletionTime: () => set({ exerciseCompletionTime: 0 }),
    }),
    {
      name: "exerciseCompletionTime",
    }
  )
);
