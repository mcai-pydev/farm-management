import { ReactNode } from 'react';

// Component Props Types
export interface VideoWidgetProps {
  type: 'training' | 'onboarding' | 'field-demo';
  category?: string;
  limit?: number;
  onVideoSelect?: (videoId: string) => void;
}

export interface VideoPlayerProps {
  videoId: string;
  autoplay?: boolean;
  controls?: boolean;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
}

export interface VideoListProps {
  category?: string;
  searchTerm?: string;
  onVideoSelect: (videoId: string) => void;
}

export interface AnalyticsDashboardProps {
  timeRange: 'day' | 'week' | 'month';
  category?: string;
}

// Data Types
export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  duration: number;
  category: string;
  tags: string[];
  publishedAt: string;
  metrics: VideoMetrics;
}

export interface VideoMetrics {
  views: number;
  likes: number;
  comments: number;
  averageWatchTime: number;
  completionRate: number;
}

export interface AnalyticsData {
  totalViews: number;
  totalWatchTime: number;
  averageEngagement: number;
  topVideos: Video[];
  viewsByDay: Record<string, number>;
  completionRates: Record<string, number>;
}

// Service Types
export interface VideoUploadParams {
  title: string;
  description: string;
  category: string;
  tags: string[];
  visibility: 'public' | 'unlisted' | 'private';
  file: File;
}

export interface VideoUpdateParams {
  id: string;
  title?: string;
  description?: string;
  tags?: string[];
  visibility?: 'public' | 'unlisted' | 'private';
}

// Hook Types
export interface UseVideosOptions {
  category?: string;
  searchTerm?: string;
  limit?: number;
}

export interface UseAnalyticsOptions {
  timeRange: 'day' | 'week' | 'month';
  category?: string;
}

// Error Types
export interface YouTubeError extends Error {
  code: string;
  status?: number;
} 