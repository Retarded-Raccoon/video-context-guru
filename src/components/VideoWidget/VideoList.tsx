
import React from 'react';
import { cn } from '@/lib/utils';
import { Video } from '@/lib/mockData';
import VideoCard from './VideoCard';
import { Loader2 } from 'lucide-react';

interface VideoListProps {
  videos: Video[];
  activeVideo: Video | null;
  isLoading: boolean;
  onSelectVideo: (video: Video) => void;
  className?: string;
}

const VideoList: React.FC<VideoListProps> = ({
  videos,
  activeVideo,
  isLoading,
  onSelectVideo,
  className
}) => {
  if (isLoading) {
    return (
      <div className={cn(
        "flex flex-col items-center justify-center py-10", 
        className
      )}>
        <Loader2 size={30} className="animate-spin text-widget-accent" />
        <p className="text-widget-muted-foreground text-sm mt-3">Loading videos...</p>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className={cn(
        "flex flex-col items-center justify-center py-10 text-center px-4", 
        className
      )}>
        <p className="text-widget-muted-foreground">No videos found for this context.</p>
        <p className="text-xs text-widget-muted-foreground mt-2">Try a different context or check back later.</p>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex flex-col overflow-y-auto scroll-hidden max-h-[400px]",
      className
    )}>
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          isActive={activeVideo?.id === video.id}
          onClick={() => onSelectVideo(video)}
          className="animate-fade-in"
          style={{
            animationDelay: `${parseInt(video.id) * 50}ms`
          }}
        />
      ))}
    </div>
  );
};

export default VideoList;
