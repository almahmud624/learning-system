import { useSelector } from "react-redux";

export const LoggedInPosition = ({ studentsMark = [] }) => {
  // find LoggedIn user mark
  const auth = useSelector((state) => state.auth);
  const loggedInUserRank = studentsMark?.find(
    (std) => std?.id === auth?.user?.id
  );
  const { name, rank, assignmentMark, quizMark, totalMark } =
    loggedInUserRank || {};

  return (
    <>
      <div>
        <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
        <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
          <thead>
            <tr>
              <th className="table-th !text-center">Rank</th>
              <th className="table-th !text-center">Name</th>
              <th className="table-th !text-center">Quiz Mark</th>
              <th className="table-th !text-center">Assignment Mark</th>
              <th className="table-th !text-center">Total</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-2 border-cyan">
              <td className="table-td text-center font-bold">{rank}</td>
              <td className="table-td text-center font-bold">{name}</td>
              <td className="table-td text-center font-bold">{quizMark}</td>
              <td className="table-td text-center font-bold">
                {assignmentMark}
              </td>
              <td className="table-td text-center font-bold">{totalMark}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
