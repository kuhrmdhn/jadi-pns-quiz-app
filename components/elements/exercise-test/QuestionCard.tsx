"use client"
import useExerciseEvaluation from "@/utils/hooks/useExerciseEvaluation";
import { useUserExerciseAnswer } from "@/utils/store/useUserExerciseAnwer";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const questionAlphabet = ["A", "B", "C", "D"];

type Props = {
  question: string;
  options: string[];
};

export default function QuestionCard({ question, options }: Props) {
  const { userAnswers, setUserAnswers } = useUserExerciseAnswer();
  const { evaluatedExercise } = useExerciseEvaluation(userAnswers)
  const totalQuestion = userAnswers.length;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const questionIdParams = searchParams.get("question_id");

  function navigateQuestion(questionId: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("question_id", questionId);
    router.replace(`${pathname}?${newSearchParams.toString()}`);
  }

  function nextQuestion() {
    if (!questionIdParams || parseInt(questionIdParams) === totalQuestion) return;
    navigateQuestion(String(parseInt(questionIdParams) + 1));
  }

  function prevQuestion() {
    if (!questionIdParams) return;
    navigateQuestion(String(Math.max(1, parseInt(questionIdParams) - 1)));
  }

  function checklistOption(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    if (questionIdParams) {
      const index = parseInt(questionIdParams) - 1;
      setUserAnswers(value, index);
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto shadow-lg rounded-2xl bg-white">
      <section className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">{question}</h2>
      </section>
      <section className="space-y-3">
        {
          options.map((option, index) => (
            <label key={index} className="h-max w-full flex items-center gap-5" htmlFor={`option-${option}`}>
              <input
                onChange={checklistOption}
                className="cursor-pointer"
                value={questionAlphabet[index]}
                type="radio"
                name="option"
                id={`option-${option}`}
                checked={userAnswers[parseInt(questionIdParams || "0") - 1] === questionAlphabet[index]}
              />
              <p className="label w-full cursor-pointer">{option}</p>
            </label>
          ))
        }
      </section>
      <section className="flex justify-between mt-6">
        <button
          disabled={parseInt(questionIdParams || "1") === 1}
          onClick={prevQuestion}
          className="btn btn-warning"
        >
          Kembali
        </button>
        <button
          onClick={parseInt(questionIdParams || "1") === totalQuestion ? evaluatedExercise : nextQuestion}
          className={`btn ${parseInt(questionIdParams || "1") === totalQuestion ? "btn-error text-white-darken" : "btn-primary"}`}
        >
          {
            parseInt(questionIdParams || "1") === totalQuestion ?
              "Selesai" : "Selanjutnya"
          }
        </button>
      </section>
    </div>
  );
}
