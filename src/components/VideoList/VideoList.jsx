import { useGetVideosQuery } from "../../features/videos/videosApi";
import { VideoListLoader } from "../VideoListLoader/VideoListLoader";
import { VideoListItem } from "./VideoListItem";

export const VideoList = () => {
  const { data: videos, isLoading, isError } = useGetVideosQuery();

  let content;
  if (isLoading) {
    content = <VideoListLoader />;
  } else if (!isLoading && isError) {
    content = <span>There was an error</span>;
  } else if (!isLoading && !isError && videos.length === 0) {
    content = <span>Video not found</span>;
  } else if (!isLoading && !isError && videos.length > 0) {
    content = videos?.map((video) => (
      <VideoListItem key={video.id} video={video} />
    ));
  }

  return (
    <>
      <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
        {content}
      </div>
    </>
  );
};
