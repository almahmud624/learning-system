import { LeaderboardTopPosition } from "../../components/LeaderboardPosition/LeaderboardTopPosition";
import { LoggedInPosition } from "../../components/LeaderboardPosition/LoggedInPosition";
import { useGetAssignmentMarkQuery } from "../../features/assignmentMark/assignmentMarkApi";
import { useGetQuizMarkQuery } from "../../features/quizMark/quizMarkApi";
import { useGetUserQuery } from "../../features/user/userApi";
import { calculateMark } from "../../utils/calculateMark";
import { setStudentRank } from "../../utils/setStudentRank";

export const Leaderboard = () => {
  const { data: assignmentMark } = useGetAssignmentMarkQuery();
  const { data: quizMark } = useGetQuizMarkQuery();
  const { data: users } = useGetUserQuery();

  // find users of student
  const students = users?.filter((student) => student.role === "student");

  // calculate multiple assignment & quiz marks
  const finalAssignmentMark = calculateMark(
    students,
    assignmentMark,
    "assignmentMark"
  );
  const finalQuizMark = calculateMark(students, quizMark, "quizMark");

  // merge students marks
  const mergedStdMark = finalAssignmentMark?.map((aMark) => {
    const qMark = finalQuizMark?.find((qMark) => qMark?.id === aMark?.id);
    const totalMark = aMark?.assignmentMark + qMark?.quizMark;
    return {
      ...aMark,
      ...qMark,
      totalMark,
    };
  });

  // set student rank
  const rankedStd = setStudentRank(mergedStdMark);

  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <LoggedInPosition studentsMark={rankedStd} />
          <LeaderboardTopPosition studentsMark={rankedStd} />
        </div>
      </section>
    </>
  );
};
