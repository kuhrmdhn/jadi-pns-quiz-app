import useFetch from "./useFetch";

export default function useExerciseEvaluation(userAnswers: string[]) {
    const { error, fetchData, loading, response } = useFetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/exercise/evaluation/zz2dmWeBoKPY9FsF6Dyh`, {
        method: "POST",
        body: JSON.stringify({ user_answers: userAnswers })
    }, false)

    async function evaluatedExercise() {
        await fetchData()
    }

    return { error, loading, response, evaluatedExercise }
}
