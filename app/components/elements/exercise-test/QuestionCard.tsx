"use client"
import { ExerciseCategory, ExerciseQuestion } from "@/app/types/exerciseType";
import useFetch from "@/app/utils/hooks/useFetch";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const questionAlphabet = ["A", "B", "C", "D"]

type Props = {
    question: string
    options: string[]
    category: ExerciseCategory
    packageId: string
}

export default function QuestionCard({ question, options, category, packageId }: Props) {
    const currentUserAnswers = JSON.parse(localStorage.getItem("currentUserAnswers") || "[]")
    const { error, fetchData, loading, response } = useFetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/answer/${category}/${packageId}`, {
        method: "POST",
        body: JSON.stringify({ userAnswers: currentUserAnswers })
    }, false)
    const totalQuestion = currentUserAnswers.length
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const questionIdParams = searchParams.get("question_id")

    function navigateQuestion(questionId: string) {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("question_id", questionId);
        router.replace(`${pathname}?${newSearchParams.toString()}`);
    }

    function nextQuestion() {
        if (!questionIdParams || questionIdParams === totalQuestion) return;
        const nextQuestionId = parseInt(questionIdParams) + 1;
        navigateQuestion(String(nextQuestionId));
    }

    function prevQuestion() {
        if (!questionIdParams) return;
        const prevQuestionId = Math.max(1, parseInt(questionIdParams) - 1);
        navigateQuestion(String(prevQuestionId));
    }

    function checklistOption(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        if (questionIdParams) {
            const index = parseInt(questionIdParams) - 1
            currentUserAnswers.splice(index, 1, value);
            localStorage.setItem("currentUserAnswers", JSON.stringify(currentUserAnswers))
        }
    }

    async function submitExercise() {
        try {
            await fetchData()
            if (!loading) console.log(response)
        } catch (e) {
            console.error(error);
        }
    }

    return (
        <div className="p-6 max-w-xl mx-auto shadow-lg rounded-2xl bg-white">
            <section className="mb-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                    {question}
                </h2>
            </section>
            <section className="space-y-3">
                {
                    options.map((option, index) => (
                        <label key={index} className="h-max w-full flex items-center gap-5" htmlFor={`option-${option}`}>
                            <input
                                onChange={(e) => checklistOption(e)}
                                className="cursor-pointer"
                                value={questionAlphabet[index]}
                                type="radio"
                                name="option"
                                id={`option-${option}`}
                            />
                            <p className="label w-full cursor-pointer">
                                {option}
                            </p>
                        </label>
                    ))
                }
            </section>
            <section className="flex justify-between mt-6">
                <button
                    disabled={parseInt(questionIdParams || '1') === 1}
                    onClick={prevQuestion}
                    className="btn btn-warning"
                >
                    Kembali
                </button>
                <button
                    onClick={parseInt(questionIdParams || '25') === totalQuestion ? submitExercise : nextQuestion}
                    className="btn btn-primary">
                    {
                        parseInt(questionIdParams || '25') === totalQuestion ? "Selesai" : "Selanjutnya"
                    }
                </button>
            </section>
        </div>
    );
}
