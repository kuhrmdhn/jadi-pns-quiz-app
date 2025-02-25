import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  exerciseHistoryId: string;
  setExerciseHistoryId: (exerciseId: string) => void;
  deleteExerciseHistoryId: () => void;
};

export const useExerciseHistory = create<Store>()(
  persist(
    (set) => ({
      exerciseHistoryId: "",
      setExerciseHistoryId: (exerciseId) =>
        set({ exerciseHistoryId: exerciseId }),
      deleteExerciseHistoryId: () => set({ exerciseHistoryId: "" }),
    }),
    {
      name: "exercise-history-storage",
    }
  )
);
