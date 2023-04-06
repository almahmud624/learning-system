import { useState } from "react";
import { useUpdateAssignmentMarkMutation } from "../../features/assignmentMark/assignmentMarkApi";

const getDateAndTime = (date) => {
  const dateAndTime = new Date(date).toLocaleString();
  return dateAndTime;
};

export const AssignmentMarkTable = ({ assignmentMarks = [] }) => {
  const [assignmentMark, setAssignmentLink] = useState(0);
  const [updateAssignmentMark, { isSuccess, isError }] =
    useUpdateAssignmentMarkMutation();
  // getting pending assignment
  const pendingAssignment = assignmentMarks?.filter(
    (mark) => mark?.status === "pending"
  );
  const publishAssigmentHandler = (id) => {
    // find selected student assignment
    const selectedAssignment = assignmentMarks?.find((mark) => mark?.id === id);

    // update assignment mark
    const newAssignmentMark = {
      ...selectedAssignment,
      mark: Number(assignmentMark),
      status: "published",
    };
    updateAssignmentMark({
      id: selectedAssignment?.id,
      data: newAssignmentMark,
    });
  };
  console.log(isSuccess);
  return (
    <>
      <div className="px-3 py-20 bg-opacity-10">
        <ul className="assignment-status">
          <li>
            Total <span>{assignmentMarks?.length}</span>
          </li>
          <li>
            Pending <span>{pendingAssignment?.length}</span>
          </li>
          <li>
            Mark Sent{" "}
            <span>{assignmentMarks?.length - pendingAssignment?.length}</span>
          </li>
        </ul>
        <div className="overflow-x-auto mt-4">
          <table className="divide-y-1 text-base divide-gray-600 w-full">
            <thead>
              <tr>
                <th className="table-th">Assignment</th>
                <th className="table-th">Date</th>
                <th className="table-th">Student Name</th>
                <th className="table-th">Repo Link</th>
                <th className="table-th">Mark</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-600/50">
              {assignmentMarks?.map((mark, i) => (
                <tr key={i}>
                  <td className="table-td">{mark?.title}</td>
                  <td className="table-td">
                    {getDateAndTime(mark?.createdAt)}
                  </td>
                  <td className="table-td">{mark?.student_name}</td>
                  <td className="table-td">{mark?.repo_link}</td>
                  {mark?.status === "published" && (
                    <td className="table-td">{mark?.mark}</td>
                  )}
                  {mark?.status === "pending" && (
                    <td className="table-td input-mark">
                      <input
                        max="100"
                        defaultValue={0}
                        onChange={(e) => setAssignmentLink(e.target.value)}
                      />

                      <span onClick={() => publishAssigmentHandler(mark?.id)}>
                        <svg
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      </span>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
