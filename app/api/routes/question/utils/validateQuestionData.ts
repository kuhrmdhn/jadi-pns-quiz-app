import { Exercise, ExerciseCategory, ExerciseQuestion } from "@/app/types/exerciseType";
import { readQuestionFolder } from "./readQuestionFolder";

export const validateQuestionData = async (planData: Exercise) => {
    if (!planData || typeof planData !== "object") {
        throw new Error("Invalid request body: planData is missing or not an object");
    }

    const { id, name, total_question, test_duration, category, questions } = planData;

    if (
        typeof id !== "string" ||
        typeof name !== "string" ||
        typeof total_question !== "number" ||
        typeof test_duration !== "number" ||
        !Object.values(ExerciseCategory).includes(category)
    ) {
        throw new Error(`Invalid planData format. Expected:
            id: string,
            name: string,
            total_question: number,
            test_duration: number,
            category: TWK | TIU | TKP`);
    }

    if (!Array.isArray(questions) || questions.length !== total_question) {
        throw new Error(`Invalid questions array. Expected ${total_question} questions, but got ${questions.length}`);
    }

    const questionIds = new Set<number>();

    for (const question of questions) {
        if (!question || typeof question !== "object") {
            throw new Error("Each question must be an object");
        }

        const { id, question: questionText, options } = question as ExerciseQuestion;

        if (typeof id !== "number" || typeof questionText !== "string" || !Array.isArray(options)) {
            throw new Error(`Invalid question format. Expected:
                id: number,
                question: string,
                options: string[]`);
        }

        if (options.length < 2) {
            throw new Error(`Each question must have at least 2 options. Question ID: ${id}`);
        }

        if (questionIds.has(id)) {
            throw new Error(`Duplicate question ID found: ${id}`);
        }
        questionIds.add(id);
    }

    const readFileData = await readQuestionFolder(category);
    if (readFileData.some((data) => data.id === id)) {
        throw new Error(`ID ${id} already exists in category ${category}`);
    }
};
