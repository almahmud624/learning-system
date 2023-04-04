import { useEffect, useState } from "react";

import { useLocation, useParams } from "react-router-dom";
import { useGetVideosQuery } from "../../features/videos/videosApi";
import {
  useAddAssignmentMutation,
  useEditAssignmentMutation,
  useGetAssignmentQuery,
} from "../../features/assignment/assignmentApi";

export const EditableAssignment = () => {
  const [title, setTitle] = useState("");
  const [videoId, setVideoId] = useState("");
  const [marks, setMarks] = useState("");
  const [err, setErr] = useState({});
  const { assignmentId } = useParams();
  const { pathname } = useLocation();
  const { data: videos } = useGetVideosQuery();
  const { data: assignment } = useGetAssignmentQuery(assignmentId);
  const [addAssignment, { isSuccess: addSuccess, isError: addErr }] =
    useAddAssignmentMutation();
  const [editAssignment, { isSuccess: editSuccess, isError: editErr }] =
    useEditAssignmentMutation();

  // mutation response shown by conditionally
  const isSuccess = addSuccess || editSuccess;
  const isError = addErr || editErr;

  // add & edit assignment
  const handleSubmit = (e) => {
    e.preventDefault();
    // selected video title
    const video_title = videos?.find(
      (video) => video.id === Number(videoId)
    )?.title;

    if (marks > 100) {
      return setErr({
        ...err,
        marks: "Marks should be less than or equal to 100",
      });
    }
    if (!videoId) {
      return setErr({ ...err, videoId: "Please,select a video." });
    }

    const assignmentData = {
      title,
      video_title,
      totalMark: marks,
      video_id: Number(videoId),
    };
    if (pathname === "/admin/assignment/add") {
      addAssignment(assignmentData);
    } else {
      editAssignment({ id: assignmentId, data: assignmentData });
    }
  };

  useEffect(() => {
    if (assignment?.id) {
      const { title, video_id, totalMark } = assignment || {};
      setTitle(title);
      setVideoId(video_id);
      setMarks(totalMark);
    }
  }, [assignment]);
  return (
    <>
      <section className="py-6 bg-primary h-screen">
        <div className="mx-auto max-w-lg px-5 lg:px-0">
          <div>
            <h2 className="my-6 text-center text-3xl font-extrabold text-slate-100">
              Add new assignment
            </h2>
          </div>
          <form className="py-5" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                for="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Assignment title<sup className="text-red-600 font-bold">*</sup>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Assignment title"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                for="videoId"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select video<sup className="text-red-600 font-bold">*</sup>
              </label>
              <select
                id="videoId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={videoId}
                onChange={(e) => {
                  setVideoId(e.target.value);
                  setErr({});
                }}
                required
              >
                <option selected>Choose a video</option>
                {videos?.map((video) => (
                  <option key={video?.id} value={video?.id}>
                    {video?.title}
                  </option>
                ))}
              </select>
            </div>
            {err?.videoId && (
              <div className="flex items-center justify-start px-3 py-3 bg-gray-900 my-3 rounded-lg">
                <div className="text-sm">
                  <span className="text-red-600 capitalize">
                    {err?.videoId}
                  </span>
                </div>
              </div>
            )}
            <div className="">
              <label
                for="marks"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Marks<sup className="text-red-600 font-bold">*</sup>
              </label>
              <input
                type="number"
                id="marks"
                name="marks"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="12:12"
                value={marks}
                required
                maxLength={3}
                onChange={(e) => {
                  setMarks(Number(e.target.value));
                  setErr({});
                }}
              />
            </div>
            {err?.marks && (
              <div className="flex items-center justify-start px-3 py-3 bg-gray-900 my-3 rounded-lg">
                <div className="text-sm">
                  <span className="text-red-600 capitalize">{err?.marks}</span>
                </div>
              </div>
            )}
            <button
              type="submit"
              className="text-white border border-2 border-green-600 hover:bg-green-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-500 mt-6"
            >
              Submit
            </button>
          </form>
          {isError && (
            <div className="flex items-center justify-start px-3 py-3 bg-gray-900 my-3 rounded-lg">
              <div className="text-sm">
                <span className="text-red-600 capitalize">
                  There was an error
                </span>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
