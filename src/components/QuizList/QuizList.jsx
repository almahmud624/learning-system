import { QuizOptions } from "./QuizOptions";

export const QuizList = ({ quiz = {}, questionNo, checkAns, setCheckAns }) => {
  return (
    <>
      <div className="space-y-8 my-5">
        <div className="quiz">
          <h4 className="question">
            Quiz {questionNo} - {quiz?.question}
          </h4>
          <form className="quizOptions">
            {quiz?.options.map((option, i) => (
              <QuizOptions
                key={option.id}
                option={option}
                questionNo={questionNo}
                optionNo={i + 1}
                quizId={quiz?.id}
                checkAns={checkAns}
                setCheckAns={setCheckAns}
              />
            ))}
          </form>
        </div>
      </div>
    </>
  );
};
