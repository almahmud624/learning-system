import { useParams } from "react-router-dom";
import { FormModal } from "../../components/Modal/FormModal";
import { VideoList } from "../../components/VideoList/VideoList";
import { VideoPlayer } from "../../components/VideoPlayer/VideoPlayer";
import "../../output.css";
import { useGetVideoQuery } from "../../features/videos/videosApi";
import { useSelector } from "react-redux";
import { useGetAssignmentsQuery } from "../../features/assignment/assignmentApi";
import {
  useGetAssignmentMarkQuery,
  useSubmitAssignmentMutation,
} from "../../features/assignmentMark/assignmentMarkApi";
import { useEffect, useState } from "react";
import { VideoPlayerLoader } from "../../components/VideoPlayerLoader/VideoPlayerLoader";
export const Video = () => {
  const { videoId } = useParams();
  const { data: video, isLoading, isError } = useGetVideoQuery(videoId);
  const { user } = useSelector((state) => state.auth);
  const { data: assignments } = useGetAssignmentsQuery();
  const [submitAssignment, { isSuccess, isError: submissonErr }] =
    useSubmitAssignmentMutation();
  const { data: assignmentMarks } = useGetAssignmentMarkQuery();
  const [showModal, setShowModal] = useState(false);
  const [assignmentLink, setAssignmentLink] = useState("");

  // find assignments for this video
  const assignment = assignments?.find(
    (assignment) => assignment?.video_id === Number(videoId)
  );

  // check user assignment submisson
  const assignmentSubmisson = assignmentMarks?.some(
    (assignmentMark) =>
      assignmentMark?.student_id === user?.id &&
      assignmentMark?.assignment_id === assignment?.id
  );

  // submit assigenment
  const handleSubmitAssignment = () => {
    const userAssigenment = {
      student_id: user?.id,
      student_name: user?.name,
      assignment_id: assignment?.id,
      title: assignment?.title,
      totalMark: 100,
      mark: 0,
      repo_link: assignmentLink,
      status: "pending",
      createdAt: new Date(Date.now()).toJSON(),
    };
    submitAssignment(userAssigenment);
  };
  useEffect(() => {
    if (isSuccess) setShowModal(false);
    if (submissonErr) console.log("There wan an error in assignment submisson");
  }, [isSuccess, submissonErr]);
  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="grid grid-cols-3 gap-2 lg:gap-8">
            {!isLoading ? (
              <VideoPlayer
                video={video}
                setShowModal={setShowModal}
                assignmentSubmisson={assignmentSubmisson}
                assignment={assignment}
              />
            ) : (
              <VideoPlayerLoader />
            )}
            <VideoList />
          </div>
        </div>
      </section>
      <FormModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleSubmitAssignment={handleSubmitAssignment}
        setAssignmentLink={setAssignmentLink}
        assignment={assignment}
      />
    </>
  );
};
