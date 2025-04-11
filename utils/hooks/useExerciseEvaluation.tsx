import useFetch from "./useFetch";

export default function useExerciseEvaluation(userAnswers: string[], exerciseId: string, userId: string) {
    const { error, fetchData, loading } = useFetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/exercise/completed-exercise/new`, {
        method: "POST",
        body: JSON.stringify({
            userId,
            exerciseResultData: { exerciseId, userAnswers }
        })
    }, false)

    async function evaluatedExercise() {
        return await fetchData()
    }

    return { error, loading, evaluatedExercise }
}
