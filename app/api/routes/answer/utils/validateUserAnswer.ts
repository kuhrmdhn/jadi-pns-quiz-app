export const validateUserAnswer = (userAnswers: string[], correctAnswer: string[]) => {
    // Validate is empty user answers
    if (!userAnswers || userAnswers.length === 0) {
        throw new Error("Missing all question to answer");
    }

    // Validate user answer is not larger to correct answer
    const totalCorrectAnswer = correctAnswer.length;
    const totalUserAnswer = userAnswers.length;
    if(totalUserAnswer > totalCorrectAnswer) {
        throw new Error(`Answer is too much ${totalUserAnswer - totalCorrectAnswer} answer(s)`)
    }

    // Validate all question is answered
    const emptyAnswers = userAnswers
        .map((answer: string, index: number) => answer === null || answer === "" ? index + 1 : -1)
        .filter((index) => index !== -1);
    if (emptyAnswers.length > 0) {
        throw new Error(`Missing ${emptyAnswers.length} question to answer!, Question(s) number ${emptyAnswers.join(", ")} is missing to answer`);
    }
};
