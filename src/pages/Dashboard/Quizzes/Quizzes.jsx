import { QuizTable } from "../../../components/QuizTable/QuizTable";

export const Quizzes = () => {
  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <QuizTable />
        </div>
      </section>
    </>
  );
};
