import { Link } from "react-router-dom";

export const VideoPlayer = ({ video, setShowModal, assignmentSubmisson }) => {
  const { id, title, description, createdAt, url } = video || {};
  return (
    <>
      <div className="col-span-full w-full space-y-8 lg:col-span-2">
        <iframe
          width="100%"
          className="aspect-video"
          src={url}
          title={title}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>

        <div>
          <h1 className="text-lg font-semibold tracking-tight text-slate-100">
            {title}
          </h1>
          <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
            Uploaded on {createdAt}
          </h2>

          <div className="flex gap-4">
            <button
              className={`px-3 font-bold py-1 border rounded-full text-sm ${
                assignmentSubmisson
                  ? "bg-green-600 border-green-600 text-white hover:text-white hover:bg-green-800 "
                  : "border-cyan text-cyan hover:bg-cyan hover:text-primary"
              }`}
              onClick={() => setShowModal(true)}
              disabled={assignmentSubmisson}
            >
              {assignmentSubmisson
                ? "এসাইনমেন্ট জমা দেওয়া হয়েছে"
                : "এসাইনমেন্ট"}
            </button>

            <Link
              to={`/quiz/${id}`}
              className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
            >
              কুইজে অংশগ্রহণ করুন
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-400 leading-6">{description}</p>
        </div>
      </div>
    </>
  );
};
