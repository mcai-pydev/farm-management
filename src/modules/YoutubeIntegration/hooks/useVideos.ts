import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { youtubeApi } from '../services/api';
import { Video, UseVideosOptions } from '../types';

export function useVideos(options: UseVideosOptions = {}) {
  const { category, searchTerm, limit = 10 } = options;
  const [videos, setVideos] = useState<Video[]>([]);

  const { data, isLoading, error } = useQuery(
    ['videos', category, searchTerm, limit],
    async () => {
      if (searchTerm) {
        return youtubeApi.searchVideos(searchTerm, limit);
      }
      return youtubeApi.getChannelVideos(category, limit);
    },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
    }
  );

  useEffect(() => {
    if (data) {
      setVideos(data);
    }
  }, [data]);

  const refreshVideos = async () => {
    if (searchTerm) {
      const results = await youtubeApi.searchVideos(searchTerm, limit);
      setVideos(results);
    } else {
      const results = await youtubeApi.getChannelVideos(category, limit);
      setVideos(results);
    }
  };

  return {
    videos,
    isLoading,
    error,
    refreshVideos,
  };
} 