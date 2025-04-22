export interface VideoMetrics {
  viewCount: number;
  likeCount: number;
  commentCount: number;
  publishedAt: Date;
}

export interface ShortsConfig {
  categories: string[];
  maxDuration: number;
  defaultTemplate?: string;
}

export interface MonitoringConfig {
  checkInterval: number;
  alertThresholds: {
    viewDrop: number;
    engagementRate: number;
  };
}

// Channel Types
export interface Channel {
  id: string;
  title: string;
  description: string;
  customUrl: string;
  statistics: ChannelStatistics;
}

export interface ChannelStatistics {
  viewCount: number;
  subscriberCount: number;
  videoCount: number;
}

// Video Types
export interface Video {
  id: string;
  title: string;
  description: string;
  publishedAt: Date;
  thumbnails: VideoThumbnails;
  statistics: VideoStatistics;
  status: VideoStatus;
}

export interface VideoThumbnails {
  default: ThumbnailDetails;
  medium: ThumbnailDetails;
  high: ThumbnailDetails;
}

export interface ThumbnailDetails {
  url: string;
  width: number;
  height: number;
}

export interface VideoStatistics {
  viewCount: number;
  likeCount: number;
  commentCount: number;
}

export interface VideoStatus {
  privacyStatus: 'private' | 'unlisted' | 'public';
  uploadStatus: 'processed' | 'processing' | 'failed';
  publishAt?: Date;
}

// Trending Types
export interface TrendingConfig {
  updateInterval: number;
  maxResults: number;
  categories: string[];
}

// Shorts Types
export interface ShortsConfig {
  maxDuration: number;
  aspectRatio: number;
  categories: string[];
}

// Social Integration Types
export interface SocialProfile {
  platform: 'facebook' | 'twitter' | 'instagram';
  accountId: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
}

// Analytics Types
export interface AnalyticsData {
  period: 'day' | 'week' | 'month';
  metrics: AnalyticsMetrics;
  demographics: AnalyticsDemographics;
}

export interface AnalyticsMetrics {
  views: number;
  watchTime: number;
  subscribers: number;
  engagement: number;
}

export interface AnalyticsDemographics {
  ageGroups: Record<string, number>;
  genders: Record<string, number>;
  countries: Record<string, number>;
}

// Error Types
export interface YouTubeError extends Error {
  code: string;
  status?: number;
  details?: unknown;
}