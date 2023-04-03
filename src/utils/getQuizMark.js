export const getQuizMark = (videoQuizzes, checkAns, user) => {
  let totalCorrect = 0;
  let totalWrong = 0;
  videoQuizzes?.forEach((q) => {
    const selectedQuizId = checkAns?.filter((a) => a[q.id]);
    const correctAnswer = selectedQuizId?.every(
      (i) => q?.options?.find((a) => a.id === i[q.id])?.isCorrect
    );
    if (correctAnswer) {
      totalCorrect++;
    } else {
      totalWrong++;
    }
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
