
import React from 'react';
import { cn } from '@/lib/utils';
import { Video } from '@/lib/mockData';
import { PlayCircle, Clock } from 'lucide-react';

interface VideoCardProps {
  video: Video;
  isActive?: boolean;
  onClick: () => void;
  className?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  video,
  isActive = false,
  onClick,
  className
}) => {
  // Format view count for display
  const formatViews = (views: number): string => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K views`;
    } else {
      return `${views} views`;
    }
  };

  return (
    <div 
      onClick={onClick}
      className={cn(
        "flex gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200",
        "hover:bg-widget-muted group relative",
        isActive && "bg-widget-muted border-l-4 border-widget-accent",
        className
      )}
    >
      {/* Thumbnail */}
      <div className="relative w-24 h-16 shrink-0 overflow-hidden rounded-md">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Duration */}
        <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
          <span className="flex items-center">
            <Clock size={10} className="mr-1" />
            {video.duration}
          </span>
        </div>
        
        {/* Play overlay on hover */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <PlayCircle size={28} className="text-white" />
        </div>
      </div>
      
      {/* Video info */}
      <div className="flex flex-col min-w-0 flex-1">
        <h4 className="text-sm font-medium text-widget-foreground line-clamp-2 mb-1">
          {video.title}
        </h4>
        
        <div className="flex items-center text-xs text-widget-muted-foreground mt-auto">
          <span>{formatViews(video.views)}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
