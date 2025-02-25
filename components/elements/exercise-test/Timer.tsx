"use client";
import { ExerciseCategory } from "@/app/types/exerciseType";
import useFetch from "@/app/utils/hooks/useFetch";
import { useExerciseTimerStore } from "@/app/utils/store/useExerciseTimerStore";
import React, { useEffect, useState, useMemo } from "react";

type Props = {
  category: ExerciseCategory;
  packageId: string;
};

export default function Timer({ category, packageId }: Props) {
  const { exerciseCompletionTime } = useExerciseTimerStore()
  const { response, fetchData } = useFetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/question/${category}/${packageId}`, {}, false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  // Fetching test duration when end exercise time not saved, set time left to remaining time
  useEffect(() => {
    if (!exerciseCompletionTime) {
      fetchData()
    } else {
      const endTime = exerciseCompletionTime;
      const remainingTime = Math.floor((endTime - Date.now()) / 1000);
      setTimeLeft(remainingTime <= 0 ? 0 : remainingTime)
      if (remainingTime <= 0) {
        console.log("Nguawor, waktu sudah habis. Soro soro jikan da ⌚")
      }
    }
  }, [])
  // Set initial time left to test duration and save end exercise time
  useEffect(() => {
    const testDuration = response?.data.test_duration
    if (testDuration && !exerciseCompletionTime) {
      const endTime = Date.now() + testDuration * 1000
      localStorage.setItem("exerciseCompletionTime", JSON.stringify(endTime))
      setTimeLeft(testDuration)
    }
  }, [response, exerciseCompletionTime])
  // Timer
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timerInterval)
          console.log("Nguawor, soro soro jikan da ⌚")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timerInterval)
  }, [timeLeft])


  return (
    <div className="flex justify-center items-center gap-3">
      Sisa Waktu:
      {
        timeLeft !== null ?
          <span className={`${timeLeft < 20 ? "bg-red-500" : "bg-primary"} text-white p-3 rounded-md duration-300`}>
            {`${String(Math.floor(timeLeft / 60)).padStart(2, "0")}:${String(timeLeft % 60).padStart(2, "0")}`}
          </span>
          :
          <span>
            "00:00"
          </span>
      }
    </div>
  );
}
