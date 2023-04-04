import { AssignmentMarkTable } from "../../../components/AssignmentMarkTable/AssignmentMarkTable";
import { useGetAssignmentMarkQuery } from "../../../features/assignmentMark/assignmentMarkApi";

export const AssignmentMark = () => {
  const {
    data: assignmentMarks,
    isLoading,
    isError,
  } = useGetAssignmentMarkQuery();

  let content;
  if (isLoading) content = <span>Assignment Marks Sheet Loading...</span>;
  if (!isLoading && isError) content = <span>There was an error</span>;
  if (!isLoading && !isError && assignmentMarks?.length === 0)
    content = <span>Assignment Marks not found</span>;
  if (!isLoading && !isError && assignmentMarks?.length > 0)
    content = <AssignmentMarkTable assignmentMarks={assignmentMarks} />;
  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">{content}</div>
      </section>
    </>
  );
};
