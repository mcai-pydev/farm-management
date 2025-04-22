import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Skeleton,
} from '@mui/material';
import { VideoListProps } from '../../types';
import { useVideos } from '../../hooks/useVideos';

export const VideoList: React.FC<VideoListProps> = ({
  category,
  searchTerm,
  onVideoSelect,
}) => {
  const { videos, isLoading, error } = useVideos({
    category,
    searchTerm,
  });

  if (error) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography color="error">
          Error loading videos. Please try again later.
        </Typography>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Grid container spacing={2}>
        {[...Array(6)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <Skeleton
                variant="rectangular"
                height={160}
                animation="wave"
              />
              <CardContent>
                <Skeleton height={24} width="80%" animation="wave" />
                <Skeleton height={20} width="60%" animation="wave" />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!videos.length) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography>No videos found.</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {videos.map((video) => (
        <Grid item xs={12} sm={6} md={4} key={video.id}>
          <Card
            sx={{
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
            onClick={() => onVideoSelect(video.id)}
          >
            <CardMedia
              component="img"
              height="160"
              image={video.thumbnailUrl}
              alt={video.title}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                noWrap
                title={video.title}
              >
                {video.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  mb: 1,
                }}
              >
                {video.description}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  {new Date(video.publishedAt).toLocaleDateString()}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {video.metrics.views.toLocaleString()} views
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}; 