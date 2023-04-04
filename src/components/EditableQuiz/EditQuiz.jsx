import { useState } from "react";
import { useGetVideosQuery } from "../../features/videos/videosApi";
import { useGetQuizzesQuery } from "../../features/quiz/quizApi";

export const EditQuiz = () => {
  const { data: videos } = useGetVideosQuery();
  const [question, setQuestion] = useState("");
  const [videoId, setVideoId] = useState();
  const [options, setOptions] = useState([]);
  const [isValid, setIsValid] = useState(false);

  const { data: quizzes } = useGetQuizzesQuery();
  console.log(quizzes);
  // add & edit video
  const handleSubmit = (e) => {
    e.preventDefault();

    // field validation
    const checkIsCorrectField = options.every((option) => option?.isCorrect);
    if (!checkIsCorrectField || isNaN(videoId)) {
      return setIsValid(true);
    }
    // selected video title
    const video_title = videos?.find(
      (video) => video.id === Number(videoId)
    )?.title;
    const quizData = {
      question,
      video_id: Number(videoId),
      video_title,
      options: options,
    };

    console.log(quizData);
  };

  // getting options value
  const getOptionsValue = (value, index) => {
    const check = options?.findIndex((option) => option?.id === index);
    if (check !== -1) {
      setOptions(
        options?.map((option) => {
          if (option?.id === index) {
            return { ...option, option: value };
          } else {
            return option;
          }
        })
      );
    } else {
      setOptions([...options, { id: index, option: value }]);
    }
  };

  // add isCorrect property on options
  const includeIsCorrect = (value, index) => {
    setOptions(
      options?.map((option) => {
        if (option?.id === index) {
          setIsValid(false);
          return { ...option, isCorrect: value };
        } else {
          return option;
        }
      })
    );
  };
  return (
    <>
      <section className="py-6 bg-primary h-screen">
        <div className="mx-auto max-w-lg px-5 lg:px-0">
          <div>
            <h2 className="my-6 text-center text-3xl font-extrabold text-slate-100">
              Add new quiz
            </h2>
          </div>
          <form className="py-5" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                for="question"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Question<sup className="text-red-600 font-bold">*</sup>
              </label>
              <input
                type="text"
                id="question"
                name="question"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="New Question"
                value={question}
                required
                onChange={(e) => setQuestion(e.target.value)}
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
                  setIsValid(false);
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
            <div class="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  for="option_1"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Option - 1
                </label>
                <input
                  type="text"
                  id="option_1"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Quiz option"
                  onChange={(e) => getOptionsValue(e.target.value, 1)}
                  required
                />
              </div>
              <div>
                <label
                  for="isCorrect_1"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select ans<sup className="text-red-600 font-bold">*</sup>
                </label>
                <select
                  id="isCorrect_1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  disabled={!options?.find((option) => option.id === 1)?.option}
                  //   value={isCorrect}
                  onChange={(e) => includeIsCorrect(e.target.value, 1)}
                  required
                >
                  <option selected disabled>
                    Choose a answer
                  </option>
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              </div>
            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  for="option_2"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Option - 2
                </label>
                <input
                  type="text"
                  id="option_2"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Quiz option"
                  onChange={(e) => getOptionsValue(e.target.value, 2)}
                  required
                />
              </div>
              <div>
                <label
                  for="isCorrect_2"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select ans<sup className="text-red-600 font-bold">*</sup>
                </label>
                <select
                  id="isCorrect_2"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  //   value={isCorrect}
                  disabled={
                    !options?.find((option) => option?.id === 2)?.option
                  }
                  onChange={(e) => includeIsCorrect(e.target.value, 2)}
                >
                  <option selected disabled>
                    Choose a answer
                  </option>
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              </div>
            </div>

            {isValid && (
              <div className="flex items-center justify-start px-3 py-3 bg-gray-900 my-3 rounded-lg">
                <div className="text-sm">
                  <span className="text-red-600 capitalize">
                    Please!! Fill the required field
                  </span>
                </div>
              </div>
            )}
            <button
              type="submit"
              className="text-white border border-2 border-green-600 hover:bg-green-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-500 my-5"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
};
