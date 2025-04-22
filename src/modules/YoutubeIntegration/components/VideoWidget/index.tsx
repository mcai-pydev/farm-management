import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Collapse,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { VideoWidgetProps } from '../../types';
import { VideoPlayer } from '../VideoPlayer';
import { VideoList } from '../VideoList';

export const VideoWidget: React.FC<VideoWidgetProps> = ({
  type,
  category,
  limit = 5,
  onVideoSelect,
}) => {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleVideoSelect = (videoId: string) => {
    setSelectedVideoId(videoId);
    onVideoSelect?.(videoId);
  };

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const getWidgetTitle = () => {
    switch (type) {
      case 'training':
        return 'Training Videos';
      case 'onboarding':
        return 'Onboarding Materials';
      case 'field-demo':
        return 'Field Demonstrations';
      default:
        return 'Videos';
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6" component="h2">
          {getWidgetTitle()}
        </Typography>
        <IconButton onClick={handleExpandClick} size="small">
          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      {selectedVideoId && (
        <Box sx={{ mb: 2, aspectRatio: '16/9' }}>
          <VideoPlayer
            videoId={selectedVideoId}
            controls={true}
            autoplay={false}
          />
        </Box>
      )}

      <Collapse in={isExpanded} collapsedSize={320}>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search videos..."
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <VideoList
            category={category}
            searchTerm={searchTerm}
            onVideoSelect={handleVideoSelect}
          />
        </Box>
      </Collapse>
    </Paper>
  );
}; 