
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useVideoRecommendations } from '@/hooks/useVideoRecommendations';
import { useDraggable } from '@/hooks/useDraggable';
import DraggableHeader from './DraggableHeader';
import VideoPlayer from './VideoPlayer';
import VideoList from './VideoList';
import { Search } from 'lucide-react';

interface VideoWidgetProps {
  initialContext?: string;
  className?: string;
}

const VideoWidget: React.FC<VideoWidgetProps> = ({
  initialContext = '',
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState(initialContext);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // Create separate refs for the widget and the button
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Setup draggable behavior
  const { position, elementRef, handleMouseDown } = useDraggable({
    initialPosition: { x: 20, y: 20 },
    boundarySelector: 'body'
  });

  // Setup video recommendations
  const {
    videos,
    activeVideo,
    isLoading,
    currentContext,
    refreshRecommendations,
    playVideo,
    playNextVideo,
    playPreviousVideo
  } = useVideoRecommendations({
    initialContext,
    autoLoad: true
  });

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refreshRecommendations(searchTerm);
  };

  // Update widget title based on context
  const getWidgetTitle = () => {
    if (currentContext) {
      return `Videos: ${currentContext}`;
    }
    return 'Smart Video Recommendations';
  };

  // Handle external context updates via postMessage
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Only accept messages from trusted origins (customize this based on your needs)
      // if (event.origin !== window.location.origin) return;
      
      if (event.data && event.data.type === 'UPDATE_CONTEXT') {
        const newContext = event.data.context;
        if (newContext && typeof newContext === 'string') {
          setSearchTerm(newContext);
          refreshRecommendations(newContext);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [refreshRecommendations]);

  // If widget is closed, show only a small button to reopen it
  if (!isOpen) {
    return (
      <button
        ref={buttonRef}
        style={{
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        className="bg-widget-accent text-white p-3 rounded-full shadow-lg animate-fade-in hover:bg-widget-accent/90 transition-colors"
        onClick={() => setIsOpen(true)}
        aria-label="Open video widget"
      >
        <PlayCircleIcon size={24} />
      </button>
    );
  }

  return (
    <div
      ref={elementRef}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: isExpanded ? '320px' : '280px',
        zIndex: 999,
      }}
      className={cn(
        "bg-widget-background border border-widget-border rounded-lg shadow-lg",
        "transition-all duration-300 ease-in-out animate-fade-in",
        "flex flex-col",
        className
      )}
    >
      {/* Draggable header */}
      <DraggableHeader
        onMouseDown={handleMouseDown}
        title={getWidgetTitle()}
        isExpanded={isExpanded}
        onToggleExpand={() => setIsExpanded(!isExpanded)}
        onClose={() => setIsOpen(false)}
      />
      
      {/* Search bar */}
      <form onSubmit={handleSearch} className="p-3 border-b border-widget-border">
        <div className={cn(
          "flex items-center bg-widget-muted rounded-md px-3 transition-all",
          isSearchFocused && "ring-2 ring-widget-accent"
        )}>
          <Search 
            size={16} 
            className={cn(
              "text-widget-muted-foreground mr-2 transition-colors",
              isSearchFocused && "text-widget-accent"
            )} 
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            placeholder="Search videos by context..."
            className="py-2 bg-transparent border-none outline-none text-sm w-full"
          />
        </div>
      </form>

      {/* Video player (when expanded) or active video card (when collapsed) */}
      {isExpanded && (
        <VideoPlayer
          video={activeVideo}
          onNextVideo={playNextVideo}
          onPreviousVideo={playPreviousVideo}
        />
      )}
      
      {/* Video list */}
      <VideoList
        videos={videos}
        activeVideo={activeVideo}
        isLoading={isLoading}
        onSelectVideo={playVideo}
      />
    </div>
  );
};

// PlayCircle icon for the collapsed button
const PlayCircleIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="10 8 16 12 10 16 10 8" />
  </svg>
);

export default VideoWidget;
