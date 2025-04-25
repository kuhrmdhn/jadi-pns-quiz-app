import React, { useState } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { useExerciseHistory } from '@/utils/store/useExerciseHistory'
import { useExerciseTimerStore } from '@/utils/store/useExerciseTimerStore'
import { useUserExerciseAnswer } from '@/utils/store/useUserExerciseAnswer'
import { useRouter } from 'next/navigation'
import { Exercise } from '@/utils/schema/exerciseSchema'

type Props = {
    children: React.ReactNode
    exerciseData: Exercise
}

export default function StartExerciseDialog({ children, exerciseData }: Props) {
    const [dialogText, setDialogText] = useState({ title: "", confirmButton: "" })
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
                    confirmButton: "Ulangi Tes"
                })
                return
            }

            setDialogText({
                title: "Lanjutkan Tes?",
                confirmButton: "Lanjutkan"
            })
            return
        }

        setDialogText({
            title: "Mulai Tes?",
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
                    <AlertDialogTitle className="text-xl">
                        {dialogText.title}
                    </AlertDialogTitle>
                    <div className='text-justify flex flex-col mt-3 text-sm'>
                        <b className="font-bold">
                            Latihan ini memiliki batas waktu. Setelah dimulai, waktu tidak bisa dijeda atau diulang.
                            Harap perhatikan hal-hal berikut sebelum mulai:
                        </b>
                        <ul className='list-disc px-5'>
                            <li>Waktu akan terus berjalan setelah kamu mulai, dan tidak bisa dihentikan atau diulang.</li>
                            <li>Gunakan perangkat dengan koneksi stabil.</li>
                            <li>Jangan keluar dari halaman selama pengerjaan.</li>
                            <li>Jawaban akan tersimpan otomatis.</li>
                        </ul>
                    </div>
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
