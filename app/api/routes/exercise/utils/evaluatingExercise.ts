import { fetchExerciseAnswers } from "./fetchExerciseAnswers";

export const evaluateExercise = async (exercise_id: string, user_answers: string[]) => {
  const correctAnswers = await fetchExerciseAnswers(exercise_id);
  const score = correctAnswers.filter(((e: string, i: number) => e == user_answers[i])).length
  const wrongAnswer = correctAnswers.length - score;

  return {
    score,
    wrongAnswer
  };
};
