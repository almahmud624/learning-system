import { useEffect, useState } from "react";
import {
  useAddVideoMutation,
  useEditVideoMutation,
  useGetVideosQuery,
} from "../../features/videos/videosApi";
import { useLocation, useParams } from "react-router-dom";

export const EditableVideo = () => {
  const [addVideo, { isSuccess: addSuccess, isError: addError }] =
    useAddVideoMutation();
  const [editVideo, { isSuccess: editSuccess, isError: editError }] =
    useEditVideoMutation();
  const { data: videos } = useGetVideosQuery();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [views, setViews] = useState("");
  const [duration, setDuration] = useState("");
  const [err, setErr] = useState({});
  const { videoId } = useParams();
  const { pathname } = useLocation();

  // checking form validation
  const formValidation = (url, duration, views) => {
    let formErr = {};
    if (!/https?:\//.test(url)) {
      formErr = { ...formErr, url: "Url is invalid!" };
    }
    if (!/^\d{1,2}(:\d{1,2})?$/.test(duration)) {
      formErr = { ...formErr, duration: "Duration is invalid!" };
    }
    if (!/\d*\.\d*k|\d+k/.test(views)) {
      formErr = { ...formErr, views: "Views is invalid!" };
    }
    setErr(formErr);
    return formErr;
  };
  // find editable video
  const video = videos?.find((video) => video?.id === Number(videoId));

  // add & edit video
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErr = formValidation(url, duration, views);
    if (Object.keys(formErr).length !== 0) return;
    const createdAt = new Date(Date.now()).toJSON();
    const videoData = { title, description, url, views, duration };
    if (pathname === "/admin/video/add") {
      videoData.createdAt = createdAt;
      addVideo(videoData);
    } else {
      videoData.createdAt = video?.createdAt;
      editVideo({ videoId, videoData });
    }
  };

  console.log(editSuccess);
  useEffect(() => {
    if (video?.id) {
      const { title, description, views, duration, url } = video || {};
      setTitle(title);
      setDescription(description);
      setDuration(duration);
      setViews(views);
      setUrl(url);
    }
  }, [video]);

  return (
    <>
      <section class="py-6 bg-primary h-screen">
        <div class="mx-auto max-w-lg px-5 lg:px-0">
          <div>
            <h2 class="my-6 text-center text-3xl font-extrabold text-slate-100">
              Add new video
            </h2>
          </div>
          <form className="py-5" onSubmit={handleSubmit}>
            <div class="mb-6">
              <label
                for="title"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Video title<sup className="text-red-600 font-bold">*</sup>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="lorem ipsum dolar emmet"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div class="mb-6">
              <label
                for="description"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description<sup className="text-red-600 font-bold">*</sup>
              </label>
              <input
                type="text"
                id="description"
                name="description"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="lorem ipsum dolar emmet"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div class="mb-6">
              <label
                for="url"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Url<sup className="text-red-600 font-bold">*</sup>
              </label>
              <input
                type="text"
                id="url"
                name="url"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="https://example.com"
                value={url}
                required
                onChange={(e) => {
                  setUrl(e.target.value);
                  setErr({});
                }}
              />
            </div>
            {err?.url && (
              <div className="flex items-center justify-start px-3 py-3 bg-gray-900 my-3 rounded-lg">
                <div className="text-sm">
                  <span className="text-red-600 capitalize">{err?.url}</span>
                </div>
              </div>
            )}
            <div class="mb-6">
              <label
                for="views"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Views<sup className="text-red-600 font-bold">*</sup>
              </label>
              <input
                type="text"
                id="views"
                name="views"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="12.4k"
                value={views}
                required
                onChange={(e) => {
                  setViews(e.target.value);
                  setErr({});
                }}
              />
            </div>
            {err?.views && (
              <div className="flex items-center justify-start px-3 py-3 bg-gray-900 my-3 rounded-lg">
                <div className="text-sm">
                  <span className="text-red-600 capitalize">{err?.views}</span>
                </div>
              </div>
            )}
            <div class="mb-6">
              <label
                for="duration"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Duration<sup className="text-red-600 font-bold">*</sup>
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="12:12"
                value={duration}
                required
                onChange={(e) => {
                  setDuration(e.target.value);
                  setErr({});
                }}
              />
            </div>
            {err?.duration && (
              <div className="flex items-center justify-start px-3 py-3 bg-gray-900 my-3 rounded-lg">
                <div className="text-sm">
                  <span className="text-red-600 capitalize">
                    {err?.duration}
                  </span>
                </div>
              </div>
            )}
            <button
              type="submit"
              class="text-white border border-2 border-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-500 mb-5"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
};
