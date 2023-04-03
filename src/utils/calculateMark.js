export const calculateMark = (students, marks, markType) => {
  return students?.map((student) => {
    const findMultipleMark = marks?.filter(
      (mark) => mark.student_id === student.id
    );
    const totalAssignmentMark = findMultipleMark?.reduce(
      (acc, cur) => acc + cur?.mark,
      0
    );
    return {
      id: student.id,
      name: student.name,
      [markType]: totalAssignmentMark,
    };
  });
};
