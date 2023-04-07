import { useSelector } from "react-redux";

export const QuizOptions = ({
  option,
  questionNo,
  optionNo,
  quizId,
  checkAns,
  setCheckAns,
  videoId,
}) => {
  const { user } = useSelector((state) => state.auth);
  const gettingAns = (quizId, optionId) => {
    const ansAvail = checkAns.find(
      (ans) => Number(ans[quizId]) === Number(option.id)
    );
    if (ansAvail) {
      setCheckAns(
        checkAns.filter((ans) => Number(ans[quizId]) !== Number(option.id))
      );
    } else {
      setCheckAns([...checkAns, { [quizId]: optionId }]);
    }
  };

  // get sotored quiz option id from local storage
  const gettingLocalDBAns = JSON.parse(localStorage.getItem("ca")) || [];
  const filterCurrentUserAns = gettingLocalDBAns?.filter(
    (ans) => ans.studentId === user?.id
  );
  const checkedAns = filterCurrentUserAns?.find((a) => a[Number(videoId)])?.[
    Number(videoId)
  ];
  const selectedAns = checkedAns?.some((ans) => ans[quizId] === option?.id);
  const lableStyle =
    checkedAns?.length > 0
      ? ` ${selectedAns && "!text-red-500"}  ${
          option?.isCorrect && "!bg-green-500"
        }`
      : "";
  return (
    <>
      <label
        htmlFor={`option${optionNo}_q${questionNo}`}
        className={lableStyle}
      >
        <input
          type="checkbox"
          id={`option${optionNo}_q${questionNo}`}
          name={quizId}
          value={option.option}
          checked={checkAns.some((ans) => ans[quizId] === option?.id)}
          onChange={() => gettingAns(quizId, option?.id)}
          disabled={checkedAns?.length > 0}
        />
        {option.option}
      </label>
    </>
  );
};
