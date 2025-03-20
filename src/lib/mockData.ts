
export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  views: number;
  publishedAt: string;
  channel: {
    name: string;
    avatarUrl: string;
  };
  tags: string[];
}

export const mockVideos: Video[] = [
  {
    id: "1",
    title: "Understanding Context-Aware Applications",
    description: "Learn how modern applications use context to provide personalized experiences.",
    thumbnailUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "4:32",
    views: 15432,
    publishedAt: "2023-10-15",
    channel: {
      name: "Tech Insights",
      avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=TI&backgroundColor=0096ff"
    },
    tags: ["technology", "context", "applications"]
  },
  {
    id: "2",
    title: "Designing Minimal User Interfaces",
    description: "Principles of minimalist design that improve user experience and focus.",
    thumbnailUrl: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "8:15",
    views: 32100,
    publishedAt: "2023-11-05",
    channel: {
      name: "Design Guru",
      avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=DG&backgroundColor=0096ff"
    },
    tags: ["design", "minimal", "UI/UX"]
  },
  {
    id: "3",
    title: "Responsive Layout Techniques",
    description: "Master the art of creating flexible layouts that work on any device.",
    thumbnailUrl: "https://images.unsplash.com/photo-1481887328591-3e277d9473bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "12:42",
    views: 8976,
    publishedAt: "2023-09-28",
    channel: {
      name: "Web Masters",
      avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=WM&backgroundColor=0096ff"
    },
    tags: ["responsive", "CSS", "web development"]
  },
  {
    id: "4",
    title: "Animation Principles for Developers",
    description: "Learn core animation concepts that make interfaces feel alive and responsive.",
    thumbnailUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "15:09",
    views: 21543,
    publishedAt: "2023-12-01",
    channel: {
      name: "Motion Magic",
      avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=MM&backgroundColor=0096ff"
    },
    tags: ["animation", "motion", "UX"]
  },
  {
    id: "5",
    title: "Glass Morphism Design Trend",
    description: "Explore the popular frosted glass effect in modern interface design.",
    thumbnailUrl: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "7:22",
    views: 43210,
    publishedAt: "2023-10-22",
    channel: {
      name: "Design Trends",
      avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=DT&backgroundColor=0096ff"
    },
    tags: ["glass morphism", "design trends", "UI"]
  },
  {
    id: "6",
    title: "Context-Based Recommendations",
    description: "How AI determines what content is relevant to users in different situations.",
    thumbnailUrl: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "10:17",
    views: 12789,
    publishedAt: "2023-11-18",
    channel: {
      name: "AI Explained",
      avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=AE&backgroundColor=0096ff"
    },
    tags: ["AI", "recommendations", "algorithms"]
  }
];

// Function to simulate recommendations based on context
export const getRecommendedVideos = (context?: string): Promise<Video[]> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      if (!context) {
        resolve(mockVideos);
        return;
      }
      
      // Simple filtering based on tags or title containing the context
      const filtered = mockVideos.filter(video => {
        const lowerContext = context.toLowerCase();
        return video.tags.some(tag => tag.toLowerCase().includes(lowerContext)) || 
               video.title.toLowerCase().includes(lowerContext) ||
               video.description.toLowerCase().includes(lowerContext);
      });
      
      resolve(filtered.length ? filtered : mockVideos);
    }, 800);
  });
};
