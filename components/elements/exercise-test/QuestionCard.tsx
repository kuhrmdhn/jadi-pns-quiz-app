"use client"
import { Button } from "@/components/ui/button";
import { useExerciseHistory } from "@/utils/store/useExerciseHistory";
import { useExerciseTestDialogStore } from "@/utils/store/useExerciseTestDialogStore";
import { useUserExerciseAnswer } from "@/utils/store/useUserExerciseAnswer";
import { useUserStore } from "@/utils/store/useUserStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const questionAlphabet = ["A", "B", "C", "D"];

type Props = {
  question: string;
  options: string[];
};

export default function QuestionCard({ question, options }: Props) {
  const { userAnswers, setUserAnswers } = useUserExerciseAnswer();
  const { setDialogOpen } = useExerciseTestDialogStore()
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

  function finishExercise() {
    setDialogOpen(true)
  }

  return (
    <div className="p-6 max-w-xl mx-auto shadow-lg rounded-2xl">
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
        <Button
          disabled={parseInt(questionIdParams || "1") === 1}
          onClick={prevQuestion}
          variant={"destructive"}
        >
          Kembali
        </Button>
        <Button
          onClick={parseInt(questionIdParams || "1") === totalQuestion ? finishExercise : nextQuestion}
          variant={parseInt(questionIdParams || "1") === totalQuestion ? "outline" : "default"}
        >
          {
            parseInt(questionIdParams || "1") === totalQuestion ?
              "Selesai" : "Selanjutnya"
          }
        </Button>
      </section>
    </div>
  );
}
