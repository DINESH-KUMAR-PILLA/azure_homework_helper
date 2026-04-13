import VideoCard from './VideoCard';

export default function VideoList({ videos }) {
  if (!videos || videos.length === 0) return null;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map((v, i) => <VideoCard key={i} {...v} />)}
    </div>
  );
}
