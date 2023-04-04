import { QuizTable } from "../../../components/QuizTable/QuizTable";
import { useGetQuizzesQuery } from "../../../features/quiz/quizApi";

export const Quizzes = () => {
  const { data: quizzes, isLoading, isError } = useGetQuizzesQuery();
  let content;
  if (isLoading) content = <span>Quizzes Loading...</span>;
  if (!isLoading && isError) content = <span>There was an error</span>;
  if (!isLoading && !isError && quizzes?.length === 0)
    content = <span>Quizzes not found</span>;
  if (!isLoading && !isError && quizzes?.length > 0)
    content = <QuizTable quizzes={quizzes} />;
  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">{content}</div>
      </section>
    </>
  );
};
