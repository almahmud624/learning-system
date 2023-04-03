import { VideoTable } from "../../../components/VideoTable/VideoTable";
import { useGetVideosQuery } from "../../../features/videos/videosApi";

export const Videos = () => {
  const { data: videos, isLoading, isError } = useGetVideosQuery();
  let content;
  if (isLoading) content = <span>Videos Loading...</span>;
  if (!isLoading && isError) content = <span>There was an error</span>;
  if (!isLoading && !isError && videos.length === 0)
    content = <span>Videos not found</span>;
  if (!isLoading && !isError && videos.length > 0)
    content = <VideoTable videos={videos} />;
  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">{content}</div>
      </section>
    </>
  );
};
