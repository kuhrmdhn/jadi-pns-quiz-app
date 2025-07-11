"use client"
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useCompletedExercise from "@/utils/hooks/useCompletedExercise";
import { useUserExerciseAnswer } from "@/utils/store/useUserExerciseAnswer";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

type DialogProps = {
    dialogOpen: boolean
    setDialogOpen: (state: boolean) => void
    exerciseId: string
}

export default function ExerciseTestDialog({ dialogOpen, setDialogOpen, exerciseId }: DialogProps) {
    const isEvaluated = useRef(false)
    const { push } = useRouter()
    const { userAnswers } = useUserExerciseAnswer()
    const { evaluatedExercise } = useCompletedExercise(userAnswers, exerciseId)
    const [reviewId, setReviewId] = useState("")

    function moveToReviewPage() {
        push(`/exercise/review/${reviewId}`)
    }
    
    const evaluated = async () => {
        const review = await evaluatedExercise()
        setReviewId(review.data.id)
        isEvaluated.current = true
    }

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
                    {
                        !isEvaluated.current ?
                            <Button onClick={evaluated}>Kumpulkan</Button>
                            :
                            <AlertDialogAction onClick={moveToReviewPage}>Tinjau</AlertDialogAction>
                    }
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}