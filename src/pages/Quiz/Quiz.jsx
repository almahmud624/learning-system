import { useNavigate, useParams } from "react-router-dom";
import { QuizList } from "../../components/QuizList/QuizList";
import { useGetQuizzesQuery } from "../../features/quiz/quizApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getQuizMark } from "../../utils/getQuizMark";
import {
  useGetQuizMarkQuery,
  useUpdateQuizMarkMutation,
} from "../../features/quizMark/quizMarkApi";
import { Loader } from "../../components/Loader/Loader";
import { DataNotFound } from "../../components/DataNotFound/DataNotFound";

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
  const navigate = useNavigate();
  const [trackUnselected, setTrackUnselected] = useState();

  // check users quiz submission
  const checkQuizSubmisson = quizMarks?.find(
    (mark) =>
      mark?.student_id === user?.id && mark?.video_id === Number(videoId)
  );

  // find quizzes for that video
  const videoQuizzes = quizzes?.filter(
    (quiz) => quiz?.video_id === Number(videoId)
  );

  // content shown depend on response condition
  const contentNotFound = !isLoading && !isError && videoQuizzes?.length === 0;

  // submit quiz answer
  const handleSubmitAns = () => {
    const { unSelectedQuestion, userQuizMark } = getQuizMark(
      videoQuizzes,
      checkAns,
      user
    );

    // track unselected question
    if (unSelectedQuestion > 0) {
      return setTrackUnselected(unSelectedQuestion);
    }

    // updateQuizMark(userQuizMark);
    updateQuizMark(userQuizMark);
  };

  useEffect(() => {
    if (isSuccess) {
      // set checked ans in local storage for testing
      const storedAnsId = JSON.parse(localStorage.getItem("ca")) || [];
      storedAnsId.push({ studentId: user?.id, [videoId]: checkAns });
      localStorage.setItem("ca", JSON.stringify(storedAnsId));

      navigate("/leaderboard");
    }
    if (submissonErr) console.log("There wan an error in quiz submisson");
  }, [isSuccess, submissonErr, navigate, checkAns, user?.id, videoId]);

  return (
    <>
      <section className="py-6 bg-primary">
        {isLoading ? (
          <Loader />
        ) : contentNotFound ? (
          <DataNotFound message={"Quiz Not Found"} />
        ) : (
          <div className="mx-auto max-w-7xl px-5 lg:px-0">
            <div className="mb-8">
              <h1 className="text-2xl font-bold">
                Quizzes for "Debounce Function in JavaScript - JavaScript Job
                Interview question"
              </h1>
              <p className="text-sm text-slate-200">
                Each question contains 5 Mark
              </p>

              {checkQuizSubmisson && (
                <>
                  {" "}
                  <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white mt-5">
                    For understanding answer:
                  </h2>
                  <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400 ">
                    <li className="flex items-center">
                      <div className="w-4 h-4 bg-green-600 rounded-full mr-2">
                        <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
                      </div>
                      Correct answer
                    </li>
                    <li className="flex items-center">
                      <div className="w-4 h-4 bg-green-600 rounded-full mr-2">
                        <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                      </div>
                      Selected correct answer
                    </li>
                    <li className="flex items-center">
                      <div className="w-4 h-4 bg-slate-600 rounded-full mr-2">
                        <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                      </div>
                      Selected wrong answer
                    </li>
                  </ul>
                </>
              )}

              {checkQuizSubmisson && (
                <div className="border border-slate-700 inline-block p-3 rounded mt-5">
                  <p className="text-sm text-slate-200 font-semibold my-1 text-md">
                    Total Question:{" "}
                    <span className="font-normal">
                      {checkQuizSubmisson?.totalQuiz}
                    </span>
                  </p>
                  <p className="text-sm text-slate-200 font-semibold my-1 text-md">
                    Total Mark:{" "}
                    <span className="font-normal">
                      {checkQuizSubmisson?.totalMark}
                    </span>
                  </p>
                  <p className="text-sm text-slate-200 font-semibold my-1 text-md">
                    Correct Ans:{" "}
                    <span className="font-normal">
                      {checkQuizSubmisson?.totalCorrect}
                    </span>
                  </p>
                  <p className="text-sm text-slate-200 font-semibold my-1 text-md">
                    Wrong Ans:{" "}
                    <span className="font-normal">
                      {checkQuizSubmisson?.totalWrong}
                    </span>
                  </p>
                  <p className="text-sm text-slate-200 font-semibold my-1 text-md">
                    Final Mark:{" "}
                    <span className="font-normal">
                      {checkQuizSubmisson?.mark}
                    </span>
                  </p>
                </div>
              )}
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
            {trackUnselected > 0 && (
              <div className="flex items-center justify-start px-3 py-3 bg-gray-900 my-3 rounded-lg">
                <div className="text-sm">
                  <span className="text-red-600 capitalize font-bold">
                    {trackUnselected <= 10 && 0}
                    {trackUnselected}{" "}
                    {trackUnselected <= 1 ? "question" : "questions"} left.
                  </span>
                </div>
              </div>
            )}
            <button
              onClick={handleSubmitAns}
              className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 disabled:bg-slate-700 disabled:text-gray-500 disabled:cursor-not-allowed"
              disabled={checkQuizSubmisson || submissionLoading}
            >
              {checkQuizSubmisson ? "Submitted" : "Submit"}
            </button>
          </div>
        )}
      </section>
    </>
  );
};
