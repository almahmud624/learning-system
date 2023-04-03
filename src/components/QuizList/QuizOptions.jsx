export const QuizOptions = ({
  option,
  questionNo,
  optionNo,
  quizId,
  checkAns,
  setCheckAns,
}) => {
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

  return (
    <>
      <label for={`option${optionNo}_q${questionNo}`}>
        <input
          type="checkbox"
          id={`option${optionNo}_q${questionNo}`}
          name={quizId}
          value={option.option}
          checked={checkAns.find((ans) => ans[quizId] === option?.id)}
          onChange={() => gettingAns(quizId, option?.id)}
        />
        {option.option}
      </label>
    </>
  );
};
