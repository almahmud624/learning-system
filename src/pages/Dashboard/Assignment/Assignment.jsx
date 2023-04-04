import { AssignmentTable } from "../../../components/AssignmentTable/AssignmentTable";
import { useGetAssignmentsQuery } from "../../../features/assignment/assignmentApi";

export const Assignment = () => {
  const { data: assignments, isLoading, isError } = useGetAssignmentsQuery();
  let content;
  if (isLoading) content = <span>Assignments Loading...</span>;
  if (!isLoading && isError) content = <span>There was an error</span>;
  if (!isLoading && !isError && assignments?.length === 0)
    content = <span>Assignments not found</span>;
  if (!isLoading && !isError && assignments?.length > 0)
    content = <AssignmentTable assignments={assignments} />;
  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">{content}</div>
      </section>
    </>
  );
};
