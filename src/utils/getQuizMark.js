export const getQuizMark = (videoQuizzes, checkAns, user) => {
  let totalCorrect = 0;
  let totalWrong = 0;
  videoQuizzes?.forEach((q) => {
    const selectQuizId = checkAns?.filter((a) => a[q.id]);
    const quizId = selectQuizId[0] && Number(Object.keys(selectQuizId[0]));
    if (quizId === q.id) {
      const selectedQuizAns = q?.options
        ?.filter((option) =>
          selectQuizId?.some((qId) => qId[q?.id] === option?.id)
        )
        .map((option) => option.isCorrect)
        .join(",");
      const expectedQuizAns = q?.options
        ?.filter((option) => option.isCorrect)
        .map((option) => option.isCorrect)
        .join(",");

      if (selectedQuizAns === expectedQuizAns) {
        totalCorrect++;
      } else {
        totalWrong++;
      }
    } else {
      totalWrong++;
    }

    // const selectedQuizId = checkAns?.filter((a) => a[q.id]);
    // const correctAnswer = selectedQuizId?.every(
    //   (i) => q?.options?.find((a) => a.id === i[q.id])?.isCorrect
    // );

    // if (correctAnswer) {
    //   totalCorrect++;
    // } else {
    //   totalWrong++;
    // }
  });
  const userQuizMark = {
    student_id: user?.id,
    student_name: user?.name,
    video_id: videoQuizzes[0]?.video_id,
    video_title: videoQuizzes[0]?.video_title,
    totalQuiz: videoQuizzes?.length,
    totalCorrect,
    totalWrong,
    totalMark: videoQuizzes?.length * 5,
    mark: totalCorrect * 5,
  };
  return userQuizMark;
};
