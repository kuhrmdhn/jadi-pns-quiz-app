import React from 'react'

type Props = {
    question: string
    correctAnswer: string
    userAnswer: string
    questionOptions: string[]
}

export default function ReviewQuestionCard({
    question,
    correctAnswer,
    userAnswer,
    questionOptions,
}: Props) {
    const options = ["A", "B", "C", "D"]
    const correctIndex = options.indexOf(correctAnswer)
    const userIndex = options.indexOf(userAnswer)

    const correctOption = questionOptions[correctIndex] ?? "-"
    const userOption = questionOptions[userIndex] ?? "-"

    const isCorrect = userAnswer === correctAnswer

    return (
        <div className={`w-11/12 xl:w-[500px] max-w-xl p-6 rounded-2xl border bg-background shadow-md space-y-4 ${!isCorrect && "border-2 border-red-500"}`}>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{question}</h2>

            <div className="space-y-2">
                {questionOptions.map((optionText, index) => {
                    const label = options[index]
                    const isSelected = userAnswer === label
                    const isCorrectOption = correctAnswer === label

                    const base =
                        "w-full text-left px-4 py-2 rounded-xl border transition-colors duration-200"

                    const style =
                        userAnswer === "null"
                            ? "bg-gray-50 dark:bg-black border-gray-300"
                            : isCorrectOption
                                ? "bg-green-100 border-green-500 text-green-800"
                                : isSelected
                                    ? "bg-red-100 border-red-400 text-red-700"
                                    : "bg-gray-50 dark:bg-black border-gray-200 text-gray-500 dark:text-gray-200"

                    return (
                        <div key={index} className={`${base} ${style}`}>
                            <span className="font-semibold mr-2">{label}.</span>
                            {optionText}
                        </div>
                    )
                })}
            </div>

            <div className="mt-4 space-y-1 text-sm text-gray-700 dark:text-gray-200">
                <p>
                    <span className="font-medium">Jawabanmu:</span>{" "}
                    <span className={isCorrect ? "text-green-700" : "text-red-600"}>
                        {userAnswer === "null" ? "Belum dijawab" : userOption}
                    </span>
                </p>
                <p>
                    <span className="font-medium">Jawaban benar:</span>{" "}
                    <span className="text-green-600">{correctOption}</span>
                </p>
            </div>
        </div>
    )
}
