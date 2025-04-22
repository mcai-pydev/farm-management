import React, { useEffect, useRef } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { VideoPlayerProps } from '../../types';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoId,
  autoplay = false,
  controls = true,
  onProgress,
  onComplete,
}) => {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId,
        height: '100%',
        width: '100%',
        playerVars: {
          autoplay: autoplay ? 1 : 0,
          controls: controls ? 1 : 0,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onStateChange: handleStateChange,
        },
      });
    };

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  const handleStateChange = (event: any) => {
    const playerState = event.data;

    // Handle video progress
    if (playerState === window.YT.PlayerState.PLAYING) {
      const progressInterval = setInterval(() => {
        if (playerRef.current) {
          const currentTime = playerRef.current.getCurrentTime();
          const duration = playerRef.current.getDuration();
          const progress = (currentTime / duration) * 100;
          onProgress?.(progress);

          if (currentTime >= duration) {
            clearInterval(progressInterval);
            onComplete?.();
          }
        }
      }, 1000);

      return () => clearInterval(progressInterval);
    }

    // Handle video completion
    if (playerState === window.YT.PlayerState.ENDED) {
      onComplete?.();
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        paddingTop: '56.25%', // 16:9 aspect ratio
        backgroundColor: 'black',
      }}
    >
      <Box
        ref={containerRef}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
      {!playerRef.current && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}; 