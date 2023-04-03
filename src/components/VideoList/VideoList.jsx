import { useGetVideosQuery } from "../../features/videos/videosApi";
import { VideoListItem } from "./VideoListItem";

export const VideoList = () => {
  const { data: videos, isLoading, isError } = useGetVideosQuery();

  let content;
  if (isLoading) content = <span>Videos Loading...</span>;
  if (!isLoading && isError) content = <span>There was an error</span>;
  if (!isLoading && !isError && videos.length === 0)
    content = <span>Video not found</span>;
  if (!isLoading && !isError && videos.length > 0)
    content = videos?.map((video) => (
      <VideoListItem key={video.id} video={video} />
    ));

  return (
    <>
      <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
        {content}
      </div>
    </>
  );
};
