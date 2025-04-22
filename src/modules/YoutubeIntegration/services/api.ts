import axios from 'axios';
import { Video, VideoUploadParams, VideoUpdateParams, YouTubeError } from '../types';

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

class YouTubeApiService {
  private apiKey: string;
  private channelId: string;

  constructor() {
    this.apiKey = process.env.YOUTUBE_API_KEY || '';
    this.channelId = process.env.YOUTUBE_CHANNEL_ID || '';
    
    if (!this.apiKey || !this.channelId) {
      throw new Error('YouTube API configuration missing');
    }
  }

  private async request<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    try {
      const response = await axios.get(`${YOUTUBE_API_BASE}${endpoint}`, {
        params: {
          ...params,
          key: this.apiKey,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new YouTubeError(error.message, {
        cause: error,
        code: error.response?.data?.error?.code || 'UNKNOWN_ERROR',
        status: error.response?.status,
      });
    }
  }

  async getChannelVideos(category?: string, maxResults = 10): Promise<Video[]> {
    const response = await this.request('/search', {
      part: 'snippet',
      channelId: this.channelId,
      maxResults,
      order: 'date',
      type: 'video',
      q: category,
    });

    return response.items.map(this.mapVideoResponse);
  }

  async getVideoDetails(videoId: string): Promise<Video> {
    const response = await this.request('/videos', {
      part: 'snippet,statistics,contentDetails',
      id: videoId,
    });

    return this.mapVideoResponse(response.items[0]);
  }

  async searchVideos(query: string, maxResults = 10): Promise<Video[]> {
    const response = await this.request('/search', {
      part: 'snippet',
      channelId: this.channelId,
      maxResults,
      q: query,
      type: 'video',
    });

    return response.items.map(this.mapVideoResponse);
  }

  private mapVideoResponse(item: any): Video {
    return {
      id: item.id.videoId || item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails.high.url,
      duration: item.contentDetails?.duration || 0,
      category: item.snippet.categoryId,
      tags: item.snippet.tags || [],
      publishedAt: item.snippet.publishedAt,
      metrics: {
        views: parseInt(item.statistics?.viewCount || '0'),
        likes: parseInt(item.statistics?.likeCount || '0'),
        comments: parseInt(item.statistics?.commentCount || '0'),
        averageWatchTime: 0, // Requires additional API call
        completionRate: 0, // Requires additional API call
      },
    };
  }
}

export const youtubeApi = new YouTubeApiService(); 