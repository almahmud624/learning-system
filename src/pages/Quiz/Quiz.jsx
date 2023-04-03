import { useParams } from "react-router-dom";
import { QuizList } from "../../components/QuizList/QuizList";
import { useGetQuizzesQuery } from "../../features/quiz/quizApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getQuizMark } from "../../utils/getQuizMark";
import {
  useGetQuizMarkQuery,
  useUpdateQuizMarkMutation,
} from "../../features/quizMark/quizMarkApi";

export const Quiz = () => {
  const { videoId } = useParams();
  const { data: quizzes, isLoading, isError } = useGetQuizzesQuery();
  const [checkAns, setCheckAns] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [
    updateQuizMark,
    { isSuccess, isLoading: submissionLoading, isError: submissonErr },
  ] = useUpdateQuizMarkMutation();
  const { data: quizMarks } = useGetQuizMarkQuery();

  // check users quiz submission
  const checkQuizSubmisson = quizMarks?.some(
    (mark) =>
      mark?.student_id === user?.id && mark?.video_id === Number(videoId)
  );

  // find quizzes for that video
  const videoQuizzes = quizzes?.filter(
    (quiz) => quiz?.video_id === Number(videoId)
  );

  // content shown depend on response condition
  let content;
  if (isLoading) content = <span>Quiz Loading...</span>;
  if (!isLoading && isError) content = <span>There was an error</span>;
  if (!isLoading && !isError && videoQuizzes.length === 0)
    content = <span>Quiz not found</span>;
  if (!isLoading && !isError && videoQuizzes.length > 0)
    content = videoQuizzes?.map((quiz) => (
      <QuizList key={quiz.id} quiz={quiz} />
    ));

  // submit quiz answer
  const handleSubmitAns = () => {
    const userQuizMark = getQuizMark(videoQuizzes, checkAns, user);
    updateQuizMark(userQuizMark);
  };

  useEffect(() => {
    console.log(isSuccess);
    if (submissonErr) console.log("There wan an error in quiz submisson");
  }, [isSuccess, submissonErr]);

  return (
    <>
      <section className="py-6 bg-primary">
        {!isLoading && !isError && videoQuizzes.length > 0 ? (
          <div className="mx-auto max-w-7xl px-5 lg:px-0">
            <div className="mb-8">
              <h1 className="text-2xl font-bold">
                Quizzes for "Debounce Function in JavaScript - JavaScript Job
                Interview question"
              </h1>
              <p className="text-sm text-slate-200">
                Each question contains 5 Mark
              </p>
            </div>
            {videoQuizzes?.map((quiz, i) => (
              <QuizList
                key={quiz.id}
                quiz={quiz}
                questionNo={i + 1}
                checkAns={checkAns}
                setCheckAns={setCheckAns}
              />
            ))}
            <button
              onClick={handleSubmitAns}
              className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 disabled:bg-cyan-600 disabled:text-gray-600"
              disabled={checkQuizSubmisson || submissionLoading}
            >
              Submit
            </button>
          </div>
        ) : (
          content
        )}
      </section>
    </>
  );
};
