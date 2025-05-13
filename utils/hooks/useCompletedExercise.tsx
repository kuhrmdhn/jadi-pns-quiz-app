import useFetch from "./useFetch";

export default function useCompletedExercise(userAnswers: string[], exerciseId: string) {
    const { error, fetchData, loading } = useFetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/completed-exercise`,
        {
            method: "POST",
            body: JSON.stringify({
                exerciseResultData: { exerciseId, userAnswers }
            })
        },
        false)

    async function evaluatedExercise() {
        return await fetchData()
    }

    return { error, loading, evaluatedExercise }
}
