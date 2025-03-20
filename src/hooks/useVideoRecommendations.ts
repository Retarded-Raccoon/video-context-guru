
import { useState, useEffect } from 'react';
import { Video, getRecommendedVideos } from '@/lib/mockData';

interface UseVideoRecommendationsOptions {
  initialContext?: string;
  autoLoad?: boolean;
}

export const useVideoRecommendations = (options: UseVideoRecommendationsOptions = {}) => {
  const { initialContext = '', autoLoad = true } = options;
  
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentContext, setCurrentContext] = useState<string>(initialContext);
  const [isLoading, setIsLoading] = useState<boolean>(autoLoad);
  const [error, setError] = useState<Error | null>(null);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  // Load videos when context changes or on initial load
  useEffect(() => {
    if (!autoLoad && !currentContext) return;
    
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const recommendedVideos = await getRecommendedVideos(currentContext);
        setVideos(recommendedVideos);
        
        // Set the first video as active if we don't have an active video yet
        if (!activeVideo && recommendedVideos.length > 0) {
          setActiveVideo(recommendedVideos[0]);
        }
      } catch (err) {
        console.error('Error fetching video recommendations:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch recommendations'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, [currentContext, autoLoad]);

  // Function to refresh recommendations with a new context
  const refreshRecommendations = (newContext: string) => {
    setCurrentContext(newContext);
  };

  // Function to play a specific video
  const playVideo = (video: Video) => {
    setActiveVideo(video);
  };

  // Function to play the next video in the list
  const playNextVideo = () => {
    if (!activeVideo || videos.length <= 1) return;
    
    const currentIndex = videos.findIndex(v => v.id === activeVideo.id);
    if (currentIndex < 0 || currentIndex >= videos.length - 1) {
      // Loop back to the beginning if we're at the end
      setActiveVideo(videos[0]);
    } else {
      setActiveVideo(videos[currentIndex + 1]);
    }
  };

  // Function to play the previous video in the list
  const playPreviousVideo = () => {
    if (!activeVideo || videos.length <= 1) return;
    
    const currentIndex = videos.findIndex(v => v.id === activeVideo.id);
    if (currentIndex <= 0) {
      // Loop to the end if we're at the beginning
      setActiveVideo(videos[videos.length - 1]);
    } else {
      setActiveVideo(videos[currentIndex - 1]);
    }
  };

  return {
    videos,
    activeVideo,
    isLoading,
    error,
    currentContext,
    refreshRecommendations,
    playVideo,
    playNextVideo,
    playPreviousVideo
  };
};
