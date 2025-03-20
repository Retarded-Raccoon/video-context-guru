
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Video } from '@/lib/mockData';
import { PlayCircle, SkipForward, SkipBack, Loader2 } from 'lucide-react';

interface VideoPlayerProps {
  video: Video | null;
  onNextVideo: () => void;
  onPreviousVideo: () => void;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  video,
  onNextVideo,
  onPreviousVideo,
  className
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Reset loading state when video changes
  useEffect(() => {
    setIsLoading(true);
  }, [video]);

  if (!video) {
    return (
      <div className={cn(
        "aspect-video w-full bg-widget-muted flex items-center justify-center",
        className
      )}>
        <div className="text-center p-4">
          <PlayCircle size={40} className="mx-auto mb-2 text-widget-muted-foreground/50" />
          <p className="text-widget-muted-foreground text-sm">Select a video to play</p>
        </div>
      </div>
    );
  }

  // Handle iframe load event
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // Format channel name
  const formatChannelName = (name: string) => {
    return name.length > 20 ? `${name.substring(0, 20)}...` : name;
  };

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Video container with aspect ratio */}
      <div className="relative aspect-video w-full bg-black">
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
            <Loader2 size={40} className="animate-spin text-white" />
          </div>
        )}
        
        {/* YouTube iframe */}
        <iframe
          ref={iframeRef}
          src={`${video.videoUrl}?autoplay=1&modestbranding=1&rel=0`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          onLoad={handleIframeLoad}
        ></iframe>
      </div>
      
      {/* Video info and controls */}
      <div className="p-3 bg-widget-background">
        {/* Title */}
        <h3 className="text-sm font-medium line-clamp-2 mb-2">
          {video.title}
        </h3>
        
        {/* Channel and navigation controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <img 
                src={video.channel.avatarUrl} 
                alt={video.channel.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs text-widget-muted-foreground">
              {formatChannelName(video.channel.name)}
            </span>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={onPreviousVideo}
              className="p-1 rounded-full hover:bg-widget-muted transition-colors"
              aria-label="Previous video"
            >
              <SkipBack size={16} className="text-widget-foreground" />
            </button>
            
            <button
              onClick={onNextVideo}
              className="p-1 rounded-full hover:bg-widget-muted transition-colors"
              aria-label="Next video"
            >
              <SkipForward size={16} className="text-widget-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
