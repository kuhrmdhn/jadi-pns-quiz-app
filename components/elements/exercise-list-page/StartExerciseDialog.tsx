import React, { useState } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { useExerciseHistory } from '@/utils/store/useExerciseHistory'
import { useExerciseTimerStore } from '@/utils/store/useExerciseTimerStore'
import { useUserExerciseAnswer } from '@/utils/store/useUserExerciseAnswer'
import { useRouter } from 'next/navigation'
import { Exercise } from '@/app/api/routes/exercise/utils/exerciseSchema'

type Props = {
    children: React.ReactNode
    exerciseData: Exercise
}

export default function StartExerciseDialog({ children, exerciseData }: Props) {
    const [dialogText, setDialogText] = useState({ title: "", description: "", confirmButton: "" })
    const { push } = useRouter()
    const { id, duration, total_question, category } = exerciseData
    const { setExerciseHistoryId, exerciseHistoryId } = useExerciseHistory()
    const { setExerciseCompletionTime, exerciseCompletionTime } = useExerciseTimerStore()
    const { setInitialUserAnswers } = useUserExerciseAnswer()

    function startExercise() {
        if (id == exerciseHistoryId) {
            const now = Date.now()
            if (now > exerciseCompletionTime) {
                setExerciseCompletionTime(duration)
                setInitialUserAnswers(total_question)
            }
        } else {
            setExerciseHistoryId(id)
            setExerciseCompletionTime(duration)
            setInitialUserAnswers(total_question)
        }

        push(`${category}/${id}/start`)
    }

    function dialogTrigger() {
        if (id == exerciseHistoryId) {
            const now = Date.now()
            if (now > exerciseCompletionTime) {
                setDialogText({
                    title: "Waktu tes habis!",
                    description: "Waktu tes habis. Kamu akan mengerjakan ulang tes.",
                    confirmButton: "Ulangi Tes"
                })
                return
            }

            setDialogText({
                title: "Lanjutkan Tes?",
                description: "Tes ini sudah pernah kamu mulai. Jawaban sebelumnya sudah tersimpan.",
                confirmButton: "Lanjutkan"
            })
            return
        }

        setDialogText({
            title: "Mulai Tes?",
            description: "Kamu akan memulai tes ini. Pastikan kamu sudah siap, karena waktu akan langsung berjalan setelah kamu mulai.",
            confirmButton: "Mulai Tes"
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild onClick={dialogTrigger}>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {dialogText.title}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {dialogText.description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction onClick={startExercise}>
                        {dialogText.confirmButton}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
