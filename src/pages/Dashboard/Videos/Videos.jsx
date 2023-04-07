import { DataNotFound } from "../../../components/DataNotFound/DataNotFound";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";
import { Loader } from "../../../components/Loader/Loader";
import { VideoTable } from "../../../components/VideoTable/VideoTable";
import { useGetVideosQuery } from "../../../features/videos/videosApi";

export const Videos = () => {
  const { data: videos, isLoading, isError } = useGetVideosQuery();
  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (!isLoading && isError) {
    content = <ErrorMessage />;
  } else if (!isLoading && !isError && videos.length === 0) {
    content = <DataNotFound message={"Videos not found"} />;
  } else if (!isLoading && !isError && videos.length > 0) {
    content = <VideoTable videos={videos} />;
  }
  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">{content}</div>
      </section>
    </>
  );
};
