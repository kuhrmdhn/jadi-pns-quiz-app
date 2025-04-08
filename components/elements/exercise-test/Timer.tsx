"use client";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useExerciseTimerStore } from "@/utils/store/useExerciseTimerStore";
import { useEffect, useState } from "react";

export default function Timer() {
  const { exerciseCompletionTime, hasHydrated } = useExerciseTimerStore()
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false)

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
      <TimerDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
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


type DialogProps = {
  dialogOpen: boolean
  setDialogOpen: (state: boolean) => void
}

function TimerDialog({ dialogOpen, setDialogOpen }: DialogProps) {
  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Waktu Ujian Sudah Habis</AlertDialogTitle>
          <AlertDialogDescription>
            Jawaban akan dikumpulkan. Jawaban kosong akan tetap dibiarkan kosong.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Kumpulkan</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}