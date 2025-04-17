"use client";
import { useExerciseTimerStore } from "@/utils/store/useExerciseTimerStore";
import { useEffect, useState } from "react";
import ExerciseTestDialog from "./ExerciseTestDialog";
import { useExerciseTestDialogStore } from "@/utils/store/useExerciseTestDialogStore";

type Props = {
  exerciseId: string
}

export default function Timer({ exerciseId }: Props) {
  const { exerciseCompletionTime, hasHydrated } = useExerciseTimerStore()
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const { dialogOpen, setDialogOpen } = useExerciseTestDialogStore()

  useEffect(() => {
    if (!hasHydrated) return;

    const endTime = exerciseCompletionTime;
    const remainingTime = Math.floor((endTime - Date.now()) / 1000);
    setTimeLeft(remainingTime <= 0 ? 0 : remainingTime)
    if (remainingTime <= 0) {
      setDialogOpen(true)
    }
  }, [hasHydrated, exerciseCompletionTime])

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timerInterval)
          setDialogOpen(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerInterval)
  }, [timeLeft])

  return (
    <>
      <ExerciseTestDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} exerciseId={exerciseId} />
      <div className="flex justify-center items-center gap-3">
        Sisa Waktu:
        {
          timeLeft &&
          <span className={`${timeLeft < 20 ? "bg-red-500" : "bg-primary"} text-white p-3 rounded-md duration-300`}>
            {`${String(Math.floor(timeLeft / 60)).padStart(2, "0")}:${String(timeLeft % 60).padStart(2, "0")}`}
          </span>
        }
      </div>
    </>
  );
}
