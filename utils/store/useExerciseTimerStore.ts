import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  exerciseCompletionTime: number;
  setExerciseCompletionTime: (time: number) => void;
  deleteExerciseCompletionTime: () => void;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
};

export const useExerciseTimerStore = create<Store>()(
  persist(
    (set) => ({
      exerciseCompletionTime: 0,
      hasHydrated: false,
      setExerciseCompletionTime: (time) => {
        const targetTime = Date.now() + time * 1000;
        set({ exerciseCompletionTime: targetTime });
      },
      deleteExerciseCompletionTime: () => set({ exerciseCompletionTime: 0 }),
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "exerciseCompletionTime",
      onRehydrateStorage: (state) => {
        return () => {
          state.setHasHydrated(true);
        };
      },
    }
  )
);
