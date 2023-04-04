import { useEffect, useState } from "react";
import { useGetVideosQuery } from "../../features/videos/videosApi";
import {
  useEditQuizMutation,
  useGetQuizQuery,
} from "../../features/quiz/quizApi";
import { useParams } from "react-router-dom";

export const EditQuiz = () => {
  const { data: videos } = useGetVideosQuery();
  const [question, setQuestion] = useState("");
  const [videoId, setVideoId] = useState();
  const [options, setOptions] = useState([]);
  const { quizId } = useParams();
  const { data: quiz } = useGetQuizQuery(quizId);
  const [editQuiz, { isSuccess, isError }] = useEditQuizMutation();

  // add & edit video
  const handleSubmit = (e) => {
    e.preventDefault();

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
    editQuiz({ quizId, quizData });
  };

  // set editable value in state
  useEffect(() => {
    if (quiz?.id) {
      const { question, video_id, options } = quiz || {};
      setQuestion(question);
      setVideoId(video_id);
      setOptions(options);
    }
  }, [quiz]);

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
          return { ...option, isCorrect: JSON.parse(value) };
        } else {
          return option;
        }
      })
    );
  };
  console.log(isSuccess);
  return (
    <>
      <section className="py-6 bg-primary">
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

            {options?.map((option, i) => (
              <div key={option?.id} class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    for={`option_${i + 1}`}
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Option - {i + 1}
                  </label>
                  <input
                    type="text"
                    id={`option_${i + 1}`}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Quiz option"
                    value={option?.option}
                    onChange={(e) =>
                      getOptionsValue(e.target.value, option?.id)
                    }
                    required
                  />
                </div>
                <div>
                  <label
                    for={`isCorrect_${i + 1}`}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select ans<sup className="text-red-600 font-bold">*</sup>
                  </label>
                  <select
                    id={`isCorrect_${i + 1}`}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={option?.isCorrect}
                    disabled={
                      !options?.find((v) => v?.id === option?.id)?.option
                    }
                    onChange={(e) =>
                      includeIsCorrect(e.target.value, option?.id)
                    }
                  >
                    <option selected disabled>
                      Choose a answer
                    </option>
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </select>
                </div>
              </div>
            ))}
            <button
              type="submit"
              className="text-white border border-2 border-green-600 hover:bg-green-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-500"
            >
              Submit
            </button>
          </form>
          {isError && (
            <div className="flex items-center justify-start px-3 py-3 bg-gray-900 my-3 rounded-lg">
              <div className="text-sm">
                <span className="text-red-600 capitalize">
                  Please!! Fill the required field
                </span>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
