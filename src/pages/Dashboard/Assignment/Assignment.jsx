import { AssignmentTable } from "../../../components/AssignmentTable/AssignmentTable";
import { DataNotFound } from "../../../components/DataNotFound/DataNotFound";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";
import { Loader } from "../../../components/Loader/Loader";
import { useGetAssignmentsQuery } from "../../../features/assignment/assignmentApi";

export const Assignment = () => {
  const { data: assignments, isLoading, isError } = useGetAssignmentsQuery();
  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (!isLoading && isError) {
    content = <ErrorMessage />;
  } else if (!isLoading && !isError && assignments?.length === 0) {
    content = <DataNotFound message={"Assignments not found"} />;
  } else if (!isLoading && !isError && assignments?.length > 0) {
    content = <AssignmentTable assignments={assignments} />;
  }
  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">{content}</div>
      </section>
    </>
  );
};
