import { AssignmentMarkTable } from "../../../components/AssignmentMarkTable/AssignmentMarkTable";
import { DataNotFound } from "../../../components/DataNotFound/DataNotFound";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";
import { Loader } from "../../../components/Loader/Loader";
import { useGetAssignmentMarkQuery } from "../../../features/assignmentMark/assignmentMarkApi";

export const AssignmentMark = () => {
  const {
    data: assignmentMarks,
    isLoading,
    isError,
  } = useGetAssignmentMarkQuery();

  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (!isLoading && isError) {
    content = <ErrorMessage />;
  } else if (!isLoading && !isError && assignmentMarks?.length === 0) {
    content = <DataNotFound message={"Assignment Marks not found"} />;
  } else if (!isLoading && !isError && assignmentMarks?.length > 0) {
    content = <AssignmentMarkTable assignmentMarks={assignmentMarks} />;
  }
  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">{content}</div>
      </section>
    </>
  );
};
